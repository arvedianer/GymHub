import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GuideJsonLd } from "@/components/json-ld";
import { guides, getGuideBySlug } from "@/lib/guides-data";
import { prisma } from "@/lib/prisma";
import { safeQuery } from "@/lib/build-safe";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { AnimatedSection } from "@/components/animated";
import {
  ArrowLeft,
  Clock,
  BookOpen,
  Lightbulb,
  CheckCircle2,
  ChevronRight,
  Dumbbell,
  Apple,
  Pill,
  ShieldAlert,
  Moon,
  Heart,
  Activity,
  Shield,
  Zap,
  Target,
} from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Dumbbell,
  Apple,
  Pill,
  ShieldAlert,
  Moon,
  Heart,
  Activity,
  Shield,
  BookOpen,
};

export async function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return { title: "Guide Not Found" };
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://gymhub.vercel.app";
  return {
    title: `${guide.title} — GymHub Learn`,
    description: guide.subtitle,
    alternates: {
      canonical: `${baseUrl}/learn/${slug}`,
    },
    openGraph: {
      title: `${guide.title} — GymHub Learn`,
      description: guide.subtitle,
      type: "article",
    },
    twitter: {
      card: "summary",
      title: `${guide.title} — GymHub Learn`,
      description: guide.subtitle,
    },
  };
}

async function getRelatedStudies(category: string) {
  return safeQuery(async () => {
    const categoryMap: Record<string, string> = {
      "Resistance Training": "resistance-training",
      "Nutrition": "nutrition",
      "Supplements": "supplements",
      "PEDs & Harm Reduction": "peds",
      "Recovery & Health": "recovery-health",
      "Cardio & Conditioning": "cardio",
    };
    const catSlug = categoryMap[category];
    if (!catSlug) return [];

    return prisma.study.findMany({
      where: { category: { slug: catSlug } },
      take: 6,
      orderBy: { year: "desc" },
      select: {
        slug: true,
        title: true,
        authors: true,
        year: true,
        studyDesign: true,
        oberkategorie: true,
        methodologyQuality: true,
      },
    });
  }, []);
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const Icon = iconMap[guide.icon] || BookOpen;
  const relatedStudies = await getRelatedStudies(guide.category);

  // Build TOC from sections
  const tocItems = [
    { id: "summary", label: "Summary" },
    ...guide.sections.map((s, i) => ({ id: `section-${i}`, label: s.title })),
    ...(guide.keyTakeaways.length > 0 ? [{ id: "takeaways", label: "Key Takeaways" }] : []),
    ...(guide.recommendations.length > 0 ? [{ id: "recommendations", label: "Recommendations" }] : []),
  ];

  return (
    <>
      <GuideJsonLd
        title={guide.title}
        subtitle={guide.subtitle}
        slug={slug}
        readTime={guide.readTime}
      />
      <div className="min-h-screen">
      {/* Header */}
      <section className="border-b border-border/40 bg-secondary/10">
        <div className="container mx-auto px-4 md:px-6 py-10 md:py-14">
          <AnimatedSection>
            <Link
              href="/learn"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to guides
            </Link>

            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge
                className="rounded-lg text-xs font-medium"
                style={{
                  backgroundColor: guide.color + "15",
                  color: guide.color,
                  borderColor: guide.color + "30",
                }}
                variant="outline"
              >
                {guide.category}
              </Badge>
              <Badge variant="secondary" className="rounded-lg text-xs">
                <Clock className="h-3 w-3 mr-1" />
                {guide.readTime}
              </Badge>
            </div>

            <div className="flex items-start gap-4">
              <div
                className="hidden md:flex h-12 w-12 items-center justify-center rounded-xl shrink-0"
                style={{ backgroundColor: guide.color + "12", color: guide.color }}
              >
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-3 leading-tight">
                  {guide.title}
                </h1>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                  {guide.subtitle}
                </p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-6 py-10 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 lg:gap-14">
          {/* Sidebar TOC */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-24">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                Contents
              </h4>
              <nav className="space-y-1">
                {tocItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg hover:bg-secondary transition-colors"
                  >
                    <ChevronRight className="h-3 w-3 opacity-50" />
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Content */}
          <article className="lg:col-span-3 max-w-3xl">
            <AnimatedSection>
              {/* TL;DR + Summary */}
              <div id="summary" className="mb-12 scroll-mt-24">
                {/* TL;DR Box */}
                {guide.keyTakeaways.length > 0 && (
                  <div className="rounded-2xl border border-accent/20 bg-accent/[0.03] p-6 mb-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Zap className="h-4 w-4 text-accent" />
                      <h2 className="text-sm font-semibold uppercase tracking-wider text-accent">TL;DR</h2>
                    </div>
                    <ul className="space-y-2.5">
                      {guide.keyTakeaways.slice(0, 3).map((tk, i) => (
                        <li key={i} className="flex gap-3 text-sm text-foreground leading-relaxed">
                          <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent text-[10px] font-bold mt-0.5">
                            {i + 1}
                          </span>
                          {tk}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Summary */}
                <div className="rounded-2xl border border-border/50 bg-card p-6 md:p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <BookOpen className="h-5 w-5 text-accent" />
                    <h2 className="text-lg font-semibold">Summary</h2>
                  </div>
                  <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed whitespace-pre-line">
                    {guide.summary}
                  </div>
                </div>
              </div>

              {/* Sections */}
              {guide.sections.map((section, index) => (
                <div
                  key={index}
                  id={`section-${index}`}
                  className="mb-12 scroll-mt-24"
                >
                  <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4 tracking-tight">
                    {section.title}
                  </h2>
                  <div className="prose prose-sm max-w-none text-muted-foreground leading-relaxed whitespace-pre-line">
                    {section.content}
                  </div>
                  <Separator className="mt-10" />
                </div>
              ))}

              {/* Key Takeaways */}
              {guide.keyTakeaways.length > 0 && (
                <div id="takeaways" className="mb-12 scroll-mt-24">
                  <div className="flex items-center gap-2 mb-5">
                    <Lightbulb className="h-5 w-5 text-accent" />
                    <h2 className="text-xl font-semibold">Key Takeaways</h2>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    {guide.keyTakeaways.map((takeaway, i) => (
                      <div
                        key={i}
                        className="flex gap-3 p-4 rounded-xl border border-border/40 bg-card hover:border-accent/20 transition-colors"
                      >
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-accent/10 mt-0.5">
                          <CheckCircle2 className="h-3.5 w-3.5 text-accent" />
                        </div>
                        <p className="text-sm text-foreground leading-relaxed">{takeaway}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommendations */}
              {guide.recommendations.length > 0 && (
                <div id="recommendations" className="mb-12 scroll-mt-24">
                  <div className="flex items-center gap-2 mb-5">
                    <Target className="h-5 w-5 text-accent" />
                    <h2 className="text-xl font-semibold">Practical Recommendations</h2>
                  </div>
                  <div className="grid grid-cols-1 gap-3">
                    {guide.recommendations.map((rec, i) => (
                      <div
                        key={i}
                        className="flex gap-3 p-4 rounded-xl border border-accent/20 bg-accent/[0.03]"
                      >
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 mt-0.5">
                          <span className="text-[10px] font-bold text-accent">{i + 1}</span>
                        </div>
                        <span className="text-sm text-foreground leading-relaxed">{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Dive Deeper — Related Studies */}
              {relatedStudies.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-xl font-semibold mb-5">Dive Deeper</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {relatedStudies.map((study) => (
                      <Link
                        key={study.slug}
                        href={`/studies/${study.slug}`}
                        className="group block rounded-xl border border-border/40 bg-card p-5 hover:border-accent/30 hover:shadow-md transition-all"
                      >
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <h3 className="text-sm font-medium text-foreground group-hover:text-accent transition-colors line-clamp-2 leading-snug">
                            {study.oberkategorie || study.title}
                          </h3>
                          <Badge variant="outline" className="rounded-lg text-[10px] shrink-0">
                            {study.studyDesign || "Study"}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-1">
                          {study.authors} · {study.year}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </AnimatedSection>
          </article>
        </div>
      </div>
    </div>
    </>
  );
}
