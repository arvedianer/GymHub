import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { StudyJsonLd } from "@/components/json-ld";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Star,
  FlaskConical,
  Users,
  Calendar,
  BookOpen,
  ExternalLink,
  Lightbulb,
  ListChecks,
  GraduationCap,
} from "lucide-react";
import { ShareButton } from "@/components/share-button";
import { BookmarkButton } from "@/components/bookmark-button";
import { AnimatedSection, AnimatedCard } from "@/components/animated";
import { getGuidesByCategory } from "@/lib/guides-data";

async function getStudy(slug: string) {
  const study = await prisma.study.findUnique({
    where: { slug },
    include: { category: true, tags: { include: { tag: true } } },
  });
  if (!study) return null;

  const relatedStudies = await prisma.study.findMany({
    where: {
      categoryId: study.categoryId,
      id: { not: study.id },
    },
    take: 3,
    include: { category: true },
  });

  return { study, relatedStudies };
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const study = await prisma.study.findUnique({
    where: { slug },
    select: { title: true, abstract: true, oberkategorie: true },
  });
  if (!study) return { title: "Study Not Found" };
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://gymhub.vercel.app";
  return {
    title: `${study.oberkategorie || study.title.slice(0, 50)} — GymHub`,
    description: study.abstract?.slice(0, 160) || "Peer-reviewed fitness research summary.",
    alternates: {
      canonical: `${baseUrl}/studies/${slug}`,
    },
    openGraph: {
      title: study.oberkategorie || study.title.slice(0, 60),
      description: study.abstract?.slice(0, 160) || "Peer-reviewed fitness research summary.",
      type: "article",
    },
    twitter: {
      card: "summary",
      title: study.oberkategorie || study.title.slice(0, 60),
      description: study.abstract?.slice(0, 160) || "Peer-reviewed fitness research summary.",
    },
  };
}

export default async function StudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getStudy(slug);
  if (!data) notFound();
  const { study, relatedStudies } = data;

  const keyFindings = study.keyFindings ? JSON.parse(study.keyFindings) as string[] : [];

  const levelColors: Record<string, string> = {
    beginner: "#16a34a",
    intermediate: "#3b82f6",
    advanced: "#f59e0b",
    expert: "#dc2626",
  };

  return (
    <>
      <StudyJsonLd
        title={study.oberkategorie || study.title}
        authors={study.authors}
        year={study.year}
        journal={study.journal}
        abstract={study.abstract}
        slug={slug}
        studyDesign={study.studyDesign}
        sampleSize={study.sampleSize}
      />
      <div className="container mx-auto px-4 md:px-6 py-10 md:py-16">
      <Link
        href="/studies"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to studies
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <AnimatedSection>
            <div className="mb-6">
              {/* Meta row */}
              <div className="flex flex-wrap items-center gap-2 mb-4">
                {study.oberkategorie && (
                  <Badge variant="secondary" className="rounded-lg font-medium text-xs uppercase tracking-wide">
                    {study.oberkategorie}
                  </Badge>
                )}
                <Badge variant="outline" className="rounded-lg text-xs">
                  {study.studyDesign}
                </Badge>
                {study.gymLevel && (
                  <Badge
                    className="rounded-lg text-xs"
                    style={{
                      backgroundColor: (levelColors[study.gymLevel] || "#78716c") + "15",
                      color: levelColors[study.gymLevel] || "#78716c",
                      borderColor: (levelColors[study.gymLevel] || "#78716c") + "30",
                    }}
                    variant="outline"
                  >
                    {study.gymLevel}
                  </Badge>
                )}
                <div className="flex items-center gap-0.5 ml-auto">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3.5 w-3.5 ${
                        i < study.methodologyQuality
                          ? "text-accent fill-accent"
                          : "text-muted-foreground/20"
                      }`}
                    />
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">{study.methodologyQuality}/5</span>
                </div>
              </div>

              {/* Topic / Oberkategorie as main title */}
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-foreground leading-tight mb-2 tracking-tight">
                {study.oberkategorie || study.title}
              </h1>
              
              {/* Original academic title as subtitle */}
              <p className="text-sm text-muted-foreground mb-4 italic leading-relaxed">
                {study.title}
              </p>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <BookOpen className="h-3.5 w-3.5" />
                  {study.authors}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  {study.year}
                </span>
                <span className="flex items-center gap-1.5">
                  <FlaskConical className="h-3.5 w-3.5" />
                  {study.journal}
                </span>
                {study.sampleSize && (
                  <span className="flex items-center gap-1.5">
                    <Users className="h-3.5 w-3.5" />
                    n={study.sampleSize}
                  </span>
                )}
              </div>
            </div>
          </AnimatedSection>

          <Separator className="mb-6" />

          {/* Key Findings */}
          {keyFindings.length > 0 && (
            <AnimatedSection delay={0.05}>
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <ListChecks className="h-4 w-4 text-accent" />
                  <h2 className="text-lg font-semibold text-foreground">Key Findings</h2>
                </div>
                <div className="rounded-2xl border border-border/60 bg-accent-soft p-5 md:p-6">
                  <ul className="space-y-2.5">
                    {keyFindings.map((finding, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-foreground">
                        <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                        <span className="leading-relaxed">{finding}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </AnimatedSection>
          )}

          {/* Practical Takeaway */}
          {study.practicalTakeaway && (
            <AnimatedSection delay={0.1}>
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-4 w-4 text-accent" />
                  <h2 className="text-lg font-semibold text-foreground">Practical Takeaway</h2>
                </div>
                <div className="rounded-2xl border border-border/60 bg-surface p-5 md:p-6">
                  <p className="text-foreground leading-relaxed font-medium">
                    {study.practicalTakeaway}
                  </p>
                </div>
              </div>
            </AnimatedSection>
          )}

          {/* Knowledge Level Tabs */}
          <AnimatedSection delay={0.15}>
            <Tabs defaultValue="beginner" className="w-full">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground tracking-tight">
                  Study Summary
                </h2>
                <TabsList className="bg-muted/80 backdrop-blur-sm rounded-xl p-1">
                  <TabsTrigger value="beginner" className="text-xs rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm">
                    Beginner
                  </TabsTrigger>
                  <TabsTrigger value="intermediate" className="text-xs rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm">
                    Intermediate
                  </TabsTrigger>
                  <TabsTrigger value="advanced" className="text-xs rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm">
                    Advanced
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="beginner" className="mt-0">
                <div className="rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm p-5 md:p-6">
                  <p className="text-sm font-medium text-accent mb-2">Beginner-friendly explanation</p>
                  <p className="text-foreground leading-relaxed">
                    {study.summaryBeginner || "No beginner summary available yet."}
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="intermediate" className="mt-0">
                <div className="rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm p-5 md:p-6">
                  <p className="text-sm font-medium text-accent mb-2">Intermediate level</p>
                  <p className="text-foreground leading-relaxed">
                    {study.summaryIntermediate || "No intermediate summary available yet."}
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="advanced" className="mt-0">
                <div className="rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm p-5 md:p-6">
                  <p className="text-sm font-medium text-accent mb-2">Advanced / technical</p>
                  <p className="text-foreground leading-relaxed">
                    {study.summaryAdvanced || "No advanced summary available yet."}
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </AnimatedSection>

          {/* Original Abstract */}
          <AnimatedSection delay={0.2}>
            <div className="mt-8">
              <h2 className="text-lg font-semibold text-foreground tracking-tight mb-3">
                Original Abstract
              </h2>
              <div className="rounded-2xl border border-border/60 bg-muted/30 p-5 md:p-6">
                <p className="text-muted-foreground leading-relaxed text-sm">{study.abstract}</p>
              </div>
            </div>
          </AnimatedSection>

          {/* Tags */}
          <AnimatedSection delay={0.25}>
            <div className="mt-8">
              <h3 className="text-sm font-semibold text-foreground mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {study.tags.map((t) => (
                  <Badge key={t.tag.id} variant="outline" className="rounded-lg">
                    {t.tag.name}
                  </Badge>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Actions */}
          <AnimatedSection delay={0.1}>
            <div className="rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm p-5">
              <h3 className="text-sm font-semibold text-foreground mb-3">Actions</h3>
              <div className="flex flex-col gap-2">
                <BookmarkButton
                  study={{
                    id: study.id,
                    slug: study.slug,
                    title: study.title,
                    authors: study.authors,
                    journal: study.journal,
                    year: study.year,
                    category: study.category,
                    methodologyQuality: study.methodologyQuality,
                  }}
                  variant="outline"
                  size="sm"
                  className="w-full justify-start"
                />
                <ShareButton slug={study.slug} />
                {study.doi && (
                  <a href={`https://doi.org/${study.doi}`} target="_blank" rel="noopener noreferrer" className="w-full">
                    <Button variant="outline" className="w-full justify-start gap-2 rounded-xl" size="sm">
                      <ExternalLink className="h-4 w-4" />
                      View original paper
                    </Button>
                  </a>
                )}
                {study.pmid && (
                  <a
                    href={`https://pubmed.ncbi.nlm.nih.gov/${study.pmid}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full"
                  >
                    <Button variant="outline" className="w-full justify-start gap-2 rounded-xl" size="sm">
                      <ExternalLink className="h-4 w-4" />
                      View on PubMed
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </AnimatedSection>

          {/* Study Details */}
          <AnimatedSection delay={0.2}>
            <div className="rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm p-5">
              <h3 className="text-sm font-semibold text-foreground mb-3">Study Details</h3>
              <dl className="space-y-2.5 text-sm">
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Design</dt>
                  <dd className="font-medium text-foreground">{study.studyDesign}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Sample</dt>
                  <dd className="font-medium text-foreground">{study.sampleSize || "N/A"}</dd>
                </div>
                {study.duration && (
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Duration</dt>
                    <dd className="font-medium text-foreground">{study.duration}</dd>
                  </div>
                )}
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Year</dt>
                  <dd className="font-medium text-foreground">{study.year}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Journal</dt>
                  <dd className="font-medium text-foreground">{study.journal}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-muted-foreground">Quality</dt>
                  <dd className="font-medium text-foreground">{study.methodologyQuality}/5</dd>
                </div>
                {study.conflictsOfInterest && (
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">COI</dt>
                    <dd className="font-medium text-foreground">{study.conflictsOfInterest}</dd>
                  </div>
                )}
                {study.replicationStatus && (
                  <div className="flex justify-between">
                    <dt className="text-muted-foreground">Replication</dt>
                    <dd className="font-medium text-foreground">{study.replicationStatus}</dd>
                  </div>
                )}
              </dl>
            </div>
          </AnimatedSection>

          {/* Related Studies */}
          {relatedStudies.length > 0 && (
            <AnimatedSection delay={0.3}>
              <div className="rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm p-5">
                <h3 className="text-sm font-semibold text-foreground mb-3">Related Studies</h3>
                <div className="space-y-3">
                  {relatedStudies.map((s) => (
                    <Link key={s.id} href={`/studies/${s.slug}`} className="group block">
                      <p className="text-sm font-medium text-foreground group-hover:text-accent transition-colors duration-300 line-clamp-2">
                        {s.title}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {s.journal} • {s.year}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          )}

          {/* Related Guides */}
          {(() => {
            const relatedGuides = getGuidesByCategory(study.category?.name || "");
            if (relatedGuides.length === 0) return null;
            return (
              <AnimatedSection delay={0.35}>
                <div className="rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm p-5">
                  <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-1.5">
                    <GraduationCap className="h-4 w-4 text-accent" />
                    Related Guides
                  </h3>
                  <div className="space-y-3">
                    {relatedGuides.map((g) => (
                      <Link key={g.slug} href={`/learn/${g.slug}`} className="group block">
                        <p className="text-sm font-medium text-foreground group-hover:text-accent transition-colors duration-300 line-clamp-2">
                          {g.title}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {g.readTime} read
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            );
          })()}
        </div>
      </div>
    </div>
    </>
  );
}
