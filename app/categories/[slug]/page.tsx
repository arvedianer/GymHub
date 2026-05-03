import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, FlaskConical } from "lucide-react";
import { BookmarkButton } from "@/components/bookmark-button";
import { AnimatedSection, AnimatedCard } from "@/components/animated";

async function getCategory(slug: string) {
  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      studies: {
        orderBy: { year: "desc" },
        include: { tags: { include: { tag: true } } },
      },
    },
  });
  if (!category) return null;
  return category;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = await prisma.category.findUnique({
    where: { slug },
    select: { name: true, description: true },
  });
  if (!category) return { title: "Category Not Found" };
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://gymhub.vercel.app";
  return {
    title: `${category.name} — GymHub`,
    description: category.description || `Studies on ${category.name}`,
    alternates: {
      canonical: `${baseUrl}/categories/${slug}`,
    },
    openGraph: {
      title: `${category.name} — GymHub`,
      description: category.description || `Studies on ${category.name}`,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `${category.name} — GymHub`,
      description: category.description || `Studies on ${category.name}`,
    },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = await getCategory(slug);
  if (!category) notFound();

  return (
    <div className="container mx-auto px-4 md:px-6 py-10 md:py-16">
      <AnimatedSection>
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-3">
            {category.name}
          </h1>
          <p className="text-muted-foreground max-w-2xl">{category.description}</p>
        </div>
      </AnimatedSection>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {category.studies.map((study, i) => (
          <AnimatedCard key={study.id} delay={i * 0.05}>
            <Card className="group h-full cursor-pointer border-border/60 bg-card/80 backdrop-blur-sm card-hover rounded-2xl">
              <CardContent className="p-5 flex flex-col h-full">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-xs rounded-lg font-medium">
                      {category.name}
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
                  <BookmarkButton
                    study={{
                      id: study.id,
                      slug: study.slug,
                      title: study.title,
                      authors: study.authors,
                      journal: study.journal,
                      year: study.year,
                      category: { name: category.name },
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

      {category.studies.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground">No studies in this category yet.</p>
        </div>
      )}
    </div>
  );
}
