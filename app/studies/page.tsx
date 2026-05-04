import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { safeQuery } from "@/lib/build-safe";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, FlaskConical } from "lucide-react";
import { BookmarkButton } from "@/components/bookmark-button";
import { AnimatedSection, AnimatedCard } from "@/components/animated";
import { StudyFilters } from "@/components/study-filters";

export const metadata: Metadata = {
  title: "Browse Studies — GymHub",
  description:
    "Browse our curated collection of peer-reviewed fitness research. Each study is summarized at three knowledge levels.",
};

async function getStudies(searchParamsPromise: Promise<{ [key: string]: string | string[] | undefined }>) {
  return safeQuery(async () => {
    const searchParams = await searchParamsPromise;
    const category = typeof searchParams.category === "string" ? searchParams.category : undefined;
    const design = typeof searchParams.design === "string" ? searchParams.design : undefined;
    const level = typeof searchParams.level === "string" ? searchParams.level : undefined;
    const q = typeof searchParams.q === "string" ? searchParams.q : undefined;

    const where: any = {};
    if (category) {
      where.category = { slug: category };
    }
    if (design) {
      where.studyDesign = { contains: design };
    }
    if (level) {
      where.gymLevel = level;
    }
    if (q) {
      where.OR = [
        { title: { contains: q } },
        { abstract: { contains: q } },
        { oberkategorie: { contains: q } },
        { tags: { some: { tag: { name: { contains: q } } } } },
      ];
    }

    const studies = await prisma.study.findMany({
      where,
      orderBy: { year: "desc" },
      include: { category: true, tags: { include: { tag: true } } },
    });

    const categories = await prisma.category.findMany({ orderBy: { order: "asc" } });
    const designs = await prisma.study.groupBy({ by: ["studyDesign"] });
    const levels = await prisma.gymLevel.findMany({ orderBy: { order: "asc" } });

    return { studies, categories, designs, levels };
  }, { studies: [], categories: [], designs: [], levels: [] });
}

export default async function StudiesPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const { studies, categories, designs, levels } = await getStudies(searchParams);
  const q = typeof params.q === "string" ? params.q : "";
  const selectedCategory = typeof params.category === "string" ? params.category : "";
  const selectedDesign = typeof params.design === "string" ? params.design : "";
  const selectedLevel = typeof params.level === "string" ? params.level : "";

  const levelColors: Record<string, string> = {
    beginner: "#16a34a",
    intermediate: "#3b82f6",
    advanced: "#f59e0b",
    expert: "#dc2626",
  };

  return (
    <div className="container mx-auto px-4 md:px-6 py-10 md:py-16">
      <AnimatedSection>
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-3">
            All Studies
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Browse our curated collection of peer-reviewed research. Each study is summarized
            at three knowledge levels so everyone can understand the science.
          </p>
        </div>
      </AnimatedSection>

      {/* Filters */}
      <AnimatedSection delay={0.1}>
        <StudyFilters categories={categories} designs={designs} levels={levels} />
      </AnimatedSection>

      {/* Results count */}
      <p className="text-sm text-muted-foreground mb-6">
        Showing {studies.length} study{studies.length !== 1 ? "ies" : "y"}
      </p>

      {/* Studies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {studies.map((study, i) => (
          <AnimatedCard key={study.id} delay={i * 0.05}>
            <Card className="group h-full cursor-pointer border-border/60 bg-card/80 backdrop-blur-sm card-hover rounded-2xl">
              <CardContent className="p-5 flex flex-col h-full">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="secondary" className="text-xs rounded-lg font-medium">
                      {study.category?.name}
                    </Badge>
                    {study.gymLevel && (
                      <span
                        className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium uppercase tracking-wide"
                        style={{
                          backgroundColor: (levelColors[study.gymLevel] || "#78716c") + "15",
                          color: levelColors[study.gymLevel] || "#78716c",
                        }}
                      >
                        {study.gymLevel}
                      </span>
                    )}
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
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    showText={false}
                  />
                </div>
                <Link href={`/studies/${study.slug}`}>
                  <h3 className="font-semibold text-foreground leading-snug mb-2 group-hover:text-accent transition-colors duration-300 line-clamp-2">
                    {study.title}
                  </h3>
                </Link>
                <p className="text-xs text-muted-foreground mb-3">
                  {study.authors} • {study.journal} • {study.year}
                </p>
                <div className="flex items-center gap-2 mb-3">
                  <FlaskConical className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">{study.studyDesign}</span>
                  {study.sampleSize && (
                    <span className="text-xs text-muted-foreground">• n={study.sampleSize}</span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground line-clamp-3 leading-relaxed mt-auto">
                  {study.abstract}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {study.tags.map((t) => (
                    <Badge key={t.tag.id} variant="outline" className="text-[10px] rounded-lg">
                      {t.tag.name}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </AnimatedCard>
        ))}
      </div>

      {studies.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground">No studies found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
