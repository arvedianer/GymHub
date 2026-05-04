import Link from "next/link";
import { notFound } from "next/navigation";
import { guides } from "@/lib/guides-data";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection, AnimatedCard } from "@/components/animated";
import {
  Dumbbell,
  Apple,
  Pill,
  ShieldAlert,
  Moon,
  Heart,
  Activity,
  Shield,
  BookOpen,
  Clock,
  ArrowRight,
  GraduationCap,
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

export const metadata = {
  title: "Fitness Guides & Knowledge — GymHub | Evidence-Based Articles",
  description:
    "Evidence-based fitness guides on training, nutrition, supplements, recovery, and health. Written from 334+ peer-reviewed studies — no bro-science, only science.",
  keywords: [
    "fitness guides",
    "training guides",
    "nutrition articles",
    "supplement guides",
    "evidence-based fitness",
    "workout knowledge",
    "muscle building guide",
    "strength training articles",
  ],
  alternates: {
    canonical: "https://gymhub-bay.vercel.app/learn",
  },
  openGraph: {
    title: "Fitness Guides & Knowledge — GymHub",
    description:
      "Evidence-based fitness guides on training, nutrition, supplements, recovery, and health. Written from 334+ peer-reviewed studies.",
    url: "https://gymhub-bay.vercel.app/learn",
    siteName: "GymHub",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fitness Guides & Knowledge — GymHub",
    description:
      "Evidence-based fitness guides on training, nutrition, supplements, recovery, and health. Written from 334+ peer-reviewed studies.",
  },
};

export default function LearnPage() {
  if (!guides || guides.length === 0) notFound();

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative border-b border-border/40 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent" />
        <div className="container mx-auto px-4 md:px-6 py-16 md:py-24 relative">
          <AnimatedSection>
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-medium uppercase tracking-wider mb-6">
                <GraduationCap className="h-3.5 w-3.5" />
                Knowledge Base
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-4 leading-tight">
                Learn from
                <span className="text-accent"> Science</span>
              </h1>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
                No bro-science. No fluff. Just well-written guides based on real peer-reviewed 
                research — covering everything from hypertrophy to hormones.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-b border-border/40 bg-secondary/20">
        <div className="container mx-auto px-4 md:px-6 py-6">
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-accent" />
              <span className="font-medium text-foreground">{guides.length}</span> guides
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-accent" />
              <span className="font-medium text-foreground">
                {guides.reduce((acc, g) => acc + parseInt(g.readTime), 0)}
              </span> min of reading
            </div>
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-accent" />
              <span className="font-medium text-foreground">334</span> studies referenced
            </div>
          </div>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {guides.map((guide, index) => {
            const Icon = iconMap[guide.icon] || BookOpen;
            return (
              <AnimatedCard key={guide.slug} delay={index * 0.05}>
                <Link
                  href={`/learn/${guide.slug}`}
                  className="group block h-full rounded-2xl border border-border/50 bg-card p-6 transition-all duration-300 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 hover:-translate-y-0.5"
                >
                  {/* Top row */}
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="flex h-10 w-10 items-center justify-center rounded-xl"
                      style={{ backgroundColor: guide.color + "12", color: guide.color }}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <Badge variant="secondary" className="rounded-lg text-[10px] uppercase tracking-wide font-medium">
                      {guide.readTime}
                    </Badge>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-foreground mb-2 leading-snug group-hover:text-accent transition-colors">
                    {guide.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-2">
                    {guide.subtitle}
                  </p>

                  {/* Category + Arrow */}
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/30">
                    <span className="text-xs text-muted-foreground font-medium">
                      {guide.category}
                    </span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-0.5 transition-all" />
                  </div>
                </Link>
              </AnimatedCard>
            );
          })}
        </div>
      </section>
    </div>
  );
}
