import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { safeQuery } from "@/lib/build-safe";
import { OrganizationJsonLd } from "@/components/json-ld";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dumbbell,
  Apple,
  Pill,
  Moon,
  ShieldAlert,
  Heart,
  Activity,
  ArrowRight,
  Search,
  MessageCircle,
  BookOpen,
  Star,
  FlaskConical,
  Zap,
  TrendingUp,
  Layers,
  Sparkles,
  GraduationCap,
  Clock,
  Shield,
} from "lucide-react";
import { AnimatedSection, AnimatedCard, AnimatedText } from "@/components/animated";
import { guides } from "@/lib/guides-data";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "GymHub — Science-Based Fitness Research | Peer-Reviewed Studies",
  description:
    "Cut through bro-science with 334+ peer-reviewed fitness studies on training, nutrition, supplements, and recovery. Summarized at 3 knowledge levels — beginner to advanced.",
  keywords: [
    "fitness studies",
    "muscle hypertrophy research",
    "strength training science",
    "nutrition studies",
    "supplement research",
    "evidence-based fitness",
    "peer-reviewed fitness",
    "exercise science",
    "bodybuilding research",
    "workout studies",
  ],
  alternates: {
    canonical: "https://gymhub-bay.vercel.app/",
  },
  openGraph: {
    title: "GymHub — Science-Based Fitness Research",
    description:
      "334+ peer-reviewed fitness studies on training, nutrition, supplements, and recovery. Summarized at 3 knowledge levels.",
    url: "https://gymhub-bay.vercel.app/",
    siteName: "GymHub",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "GymHub — Science-Based Fitness Research",
    description:
      "334+ peer-reviewed fitness studies on training, nutrition, supplements, and recovery. Summarized at 3 knowledge levels.",
  },
};

const iconMap: Record<string, React.ElementType> = {
  Dumbbell,
  Apple,
  Pill,
  Moon,
  ShieldAlert,
  Heart,
  Activity,
};

async function getHomeData() {
  return safeQuery(async () => {
    const categories = await prisma.category.findMany({ orderBy: { order: "asc" } });
    const featuredStudies = await prisma.study.findMany({
      where: { isFeatured: true },
      orderBy: { methodologyQuality: "desc" },
      take: 6,
      include: { category: true, tags: { include: { tag: true } } },
    });
    const latestStudies = await prisma.study.findMany({
      where: { isNew: true },
      orderBy: { year: "desc" },
      take: 4,
      include: { category: true },
    });
    const studyCount = await prisma.study.count();
    const collectionCount = await prisma.collection.count();
    const categoryCount = await prisma.category.count();

    const levels = await prisma.gymLevel.findMany({ orderBy: { order: "asc" } });
    const collections = await prisma.collection.findMany({
      where: { isFeatured: true },
      take: 3,
    });

    return {
      categories,
      featuredStudies,
      latestStudies,
      studyCount,
      collectionCount,
      categoryCount,
      levels,
      collections,
    };
  }, {
    categories: [],
    featuredStudies: [],
    latestStudies: [],
    studyCount: 0,
    collectionCount: 0,
    categoryCount: 0,
    levels: [],
    collections: [],
  });
}

export default async function HomePage() {
  const {
    categories,
    featuredStudies,
    latestStudies,
    studyCount,
    collectionCount,
    categoryCount,
    levels,
    collections,
  } = await getHomeData();

  return (
    <>
      <OrganizationJsonLd />
      <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden py-24 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-accent/[0.03] via-transparent to-transparent" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-accent/[0.06] rounded-full blur-[120px] opacity-60" />

        <div className="content relative">
          <div className="mx-auto max-w-3xl text-center">
            <AnimatedText>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 backdrop-blur-sm px-4 py-1.5 text-xs font-medium text-muted-foreground mb-8">
                <FlaskConical className="h-3.5 w-3.5 text-accent" />
                <span>Peer-reviewed research, made accessible</span>
              </span>
            </AnimatedText>

            <AnimatedText delay={0.1}>
              <h1 className="text-display text-foreground mb-6">
                Science-Based{" "}
                <span className="text-gradient">Fitness</span>{" "}
                Knowledge
              </h1>
            </AnimatedText>

            <AnimatedText delay={0.2}>
              <p className="text-body-lg text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto">
                Cut through the bro-science. We summarize real studies on training, nutrition,
                supplements, and health — tailored to your knowledge level.
              </p>
            </AnimatedText>

            <AnimatedText delay={0.3}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href="/studies">
                  <Button size="lg" className="gap-2 rounded-full px-8 h-12 text-base bg-primary hover:bg-primary/90 shadow-lg shadow-primary/10 transition-all hover:shadow-xl hover:shadow-primary/15">
                    <BookOpen className="h-4 w-4" />
                    Browse Studies
                  </Button>
                </Link>
                <Link href="/chat">
                  <Button size="lg" variant="outline" className="gap-2 rounded-full px-8 h-12 text-base border-border hover:bg-secondary transition-all">
                    <MessageCircle className="h-4 w-4" />
                    Ask AI
                  </Button>
                </Link>
              </div>
            </AnimatedText>

            <AnimatedText delay={0.4}>
              <div className="mt-12 flex items-center justify-center gap-6 md:gap-10 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10">
                    <Star className="h-3.5 w-3.5 text-accent" />
                  </div>
                  {studyCount}+ studies
                </span>
                <span className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <Zap className="h-3.5 w-3.5 text-primary" />
                  </div>
                  AI-powered insights
                </span>
                <span className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <BookOpen className="h-3.5 w-3.5 text-primary" />
                  </div>
                  3 reading levels
                </span>
              </div>
            </AnimatedText>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-border bg-surface/50">
        <div className="content">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 text-center">
            {[
              { value: studyCount, label: "Studies" },
              { value: categoryCount, label: "Categories" },
              { value: 4, label: "Gym Levels" },
              { value: collectionCount, label: "Collections" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl md:text-3xl font-semibold text-foreground">{stat.value}</p>
                <p className="text-caption text-muted-foreground uppercase mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section">
        <div className="content">
          <AnimatedSection>
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-h2 text-foreground">Browse by Category</h2>
                <p className="text-body text-muted-foreground mt-1">
                  Explore research across {categoryCount} fitness domains
                </p>
              </div>
              <Link
                href="/studies"
                className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
              >
                View all <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {categories.map((cat, i) => {
              const Icon = iconMap[cat.icon || "Dumbbell"] || Dumbbell;
              return (
                <AnimatedCard key={cat.id} delay={i * 0.05}>
                  <Link href={`/categories/${cat.slug}`}>
                    <Card className="group h-full cursor-pointer border-border/60 bg-card/80 backdrop-blur-sm card-hover rounded-2xl">
                      <CardContent className="flex flex-col items-start p-6">
                        <div
                          className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl text-white transition-all duration-300"
                          style={{ backgroundColor: cat.color || "#0a0a0a" }}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <h3 className="font-semibold text-foreground mb-1.5">{cat.name}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {cat.description}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </AnimatedCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Learn Guides */}
      <section className="section bg-surface/50">
        <div className="content">
          <AnimatedSection>
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-h2 text-foreground">Start Learning</h2>
                <p className="text-body text-muted-foreground mt-1">
                  Evidence-based guides written from real research
                </p>
              </div>
              <Link
                href="/learn"
                className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
              >
                All guides <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {guides.slice(0, 3).map((guide, i) => {
              const guideIconMap: Record<string, React.ElementType> = {
                Dumbbell, Apple, Pill, ShieldAlert, Moon, Heart, Activity, Shield, BookOpen,
              };
              const GuideIcon = guideIconMap[guide.icon] || BookOpen;
              return (
                <AnimatedCard key={guide.slug} delay={i * 0.08}>
                  <Link href={`/learn/${guide.slug}`}>
                    <Card className="group h-full cursor-pointer border-border/60 bg-card/80 backdrop-blur-sm card-hover rounded-2xl">
                      <CardContent className="p-6 flex flex-col h-full">
                        <div className="flex items-start justify-between mb-4">
                          <div
                            className="flex h-10 w-10 items-center justify-center rounded-xl"
                            style={{ backgroundColor: guide.color + "12", color: guide.color }}
                          >
                            <GuideIcon className="h-5 w-5" />
                          </div>
                          <Badge variant="secondary" className="rounded-lg text-[10px] uppercase tracking-wide">
                            <Clock className="h-3 w-3 mr-1" />
                            {guide.readTime}
                          </Badge>
                        </div>
                        <h3 className="font-semibold text-foreground mb-2 group-hover:text-accent transition-colors">
                          {guide.title}
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                          {guide.subtitle}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </AnimatedCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Gym Levels */}
      <section className="section">
        <div className="content">
          <AnimatedSection>
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-h2 text-foreground">Your Gym Level</h2>
                <p className="text-body text-muted-foreground mt-1">
                  Studies matched to your experience
                </p>
              </div>
              <Link
                href="/levels"
                className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
              >
                All levels <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {levels.map((level, i) => (
              <AnimatedCard key={level.id} delay={i * 0.08}>
                <Link href={`/studies?level=${level.slug}`}>
                  <Card
                    className="group h-full cursor-pointer border-border/60 bg-card/80 backdrop-blur-sm card-hover rounded-2xl overflow-hidden"
                    style={{ borderTopWidth: "3px", borderTopColor: level.color }}
                  >
                    <CardContent className="p-5">
                      <h3 className="font-semibold text-foreground mb-1">{level.name}</h3>
                      <p className="text-caption text-muted-foreground mb-3">{level.months}</p>
                      <p className="text-body-sm text-muted-foreground line-clamp-2">
                        {level.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collections */}
      {collections.length > 0 && (
        <section className="section">
          <div className="content">
            <AnimatedSection>
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h2 className="text-h2 text-foreground">Featured Collections</h2>
                  <p className="text-body text-muted-foreground mt-1">
                    Deep dives into specific topics
                  </p>
                </div>
                <Link
                  href="/collections"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
                >
                  All collections <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {collections.map((col, i) => (
                <AnimatedCard key={col.id} delay={i * 0.08}>
                  <Link href={`/collections/${col.slug}`}>
                    <Card
                      className="group h-full cursor-pointer border-border/60 bg-card/80 backdrop-blur-sm card-hover rounded-2xl overflow-hidden"
                      style={{ borderLeftWidth: "3px", borderLeftColor: col.color }}
                    >
                      <CardContent className="p-5">
                        <h3 className="font-semibold text-foreground mb-1">{col.name}</h3>
                        <p className="text-body-sm text-muted-foreground line-clamp-2">
                          {col.description}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Studies */}
      <section className="section bg-surface/50">
        <div className="content">
          <AnimatedSection>
            <div className="flex items-center justify-between mb-10">
              <div>
                <h2 className="text-h2 text-foreground">Featured Studies</h2>
                <p className="text-body text-muted-foreground mt-1">
                  Highest-quality research, hand-picked
                </p>
              </div>
              <Link
                href="/studies"
                className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
              >
                All studies <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {featuredStudies.map((study, i) => (
              <AnimatedCard key={study.id} delay={i * 0.08}>
                <Link href={`/studies/${study.slug}`}>
                  <Card className="group h-full cursor-pointer border-border/60 bg-card/80 backdrop-blur-sm card-hover rounded-2xl">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant="secondary" className="text-xs rounded-lg font-medium">
                          {study.category?.name}
                        </Badge>
                        <div className="flex items-center gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < study.methodologyQuality
                                  ? "text-accent fill-accent"
                                  : "text-muted-foreground/20"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <h3 className="font-semibold text-foreground leading-snug mb-2 group-hover:text-accent transition-colors duration-300 line-clamp-2">
                        {study.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-3">
                        {study.authors} • {study.journal} • {study.year}
                      </p>
                      <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed mt-auto">
                        {study.abstract}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {study.tags.slice(0, 3).map((t) => (
                          <Badge key={t.tag.id} variant="outline" className="text-[10px] rounded-lg">
                            {t.tag.name}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* New Studies */}
      {latestStudies.length > 0 && (
        <section className="section">
          <div className="content">
            <AnimatedSection>
              <div className="flex items-center justify-between mb-10">
                <div>
                  <h2 className="text-h2 text-foreground">New Studies</h2>
                  <p className="text-body text-muted-foreground mt-1">
                    Recently added to the database
                  </p>
                </div>
                <Link
                  href="/new-studies"
                  className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
                >
                  <Zap className="h-3.5 w-3.5" />
                  All new
                </Link>
              </div>
            </AnimatedSection>

            <div className="space-y-3">
              {latestStudies.map((study, i) => (
                <AnimatedCard key={study.id} delay={i * 0.06}>
                  <Link href={`/studies/${study.slug}`}>
                    <Card className="group cursor-pointer border-border/60 bg-card/80 backdrop-blur-sm card-hover rounded-2xl">
                      <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center gap-3">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-foreground group-hover:text-accent transition-colors duration-300 truncate">
                            {study.title}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {study.authors} • {study.journal} • {study.year}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <Badge variant="secondary" className="text-xs rounded-lg font-medium">
                            {study.category?.name}
                          </Badge>
                          <Badge variant="outline" className="text-xs rounded-lg">
                            {study.studyDesign}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </AnimatedCard>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="section bg-surface/50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/[0.03] to-transparent" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-accent/[0.06] rounded-full blur-[100px] opacity-40" />

        <div className="content relative">
          <div className="mx-auto max-w-2xl text-center">
            <AnimatedSection>
              <h2 className="text-h1 mb-5">Have a fitness question?</h2>
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <p className="text-body-lg text-muted-foreground mb-10 leading-relaxed">
                Our AI searches across all {studyCount}+ studies to give you
                evidence-based answers with cited sources. No opinions, just science.
              </p>
            </AnimatedSection>
            <AnimatedSection delay={0.2}>
              <Link href="/chat">
                <Button size="lg" className="gap-2 rounded-full px-8 h-12 text-base bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg shadow-accent/15 transition-all hover:shadow-xl hover:shadow-accent/20">
                  <MessageCircle className="h-4 w-4" />
                  Ask the Evidence Bot
                </Button>
              </Link>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
