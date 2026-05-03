import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, BookOpen } from "lucide-react";
import { AnimatedSection, AnimatedCard } from "@/components/animated";

async function getCollection(slug: string) {
  const collection = await prisma.collection.findUnique({ where: { slug } });
  if (!collection) return null;

  const studySlugs = JSON.parse(collection.studyIds) as string[];
  const studies = await prisma.study.findMany({
    where: { slug: { in: studySlugs } },
    include: { category: true, tags: { include: { tag: true } } },
    orderBy: { methodologyQuality: "desc" },
  });

  return { collection, studies };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = await prisma.collection.findUnique({
    where: { slug },
    select: { name: true, description: true },
  });
  if (!collection) return { title: "Collection Not Found" };
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://gymhub.vercel.app";
  return {
    title: `${collection.name} — GymHub Collections`,
    description: collection.description || "Curated fitness research collection.",
    alternates: {
      canonical: `${baseUrl}/collections/${slug}`,
    },
    openGraph: {
      title: `${collection.name} — GymHub Collections`,
      description: collection.description || "Curated fitness research collection.",
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `${collection.name} — GymHub Collections`,
      description: collection.description || "Curated fitness research collection.",
    },
  };
}

export default async function CollectionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getCollection(slug);
  if (!data) notFound();

  const { collection, studies } = data;

  return (
    <div className="container mx-auto px-4 md:px-6 py-10 md:py-16">
      <Link
        href="/collections"
        className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to collections
      </Link>

      {/* Header */}
      <AnimatedSection>
        <div
          className="rounded-2xl border border-border/60 p-6 md:p-8 mb-10"
          style={{ borderLeftWidth: "4px", borderLeftColor: collection.color }}
        >
          <h1 className="text-h1 mb-3">{collection.name}</h1>
          <p className="text-body text-muted-foreground max-w-2xl">
            {collection.description}
          </p>
          <div className="flex items-center gap-2 mt-4">
            <Badge variant="secondary" className="rounded-lg text-xs">
              <BookOpen className="h-3 w-3 mr-1" />
              {studies.length} studies
            </Badge>
          </div>
        </div>
      </AnimatedSection>

      {/* Studies */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {studies.map((study, i) => (
          <AnimatedCard key={study.id} delay={i * 0.05}>
            <Link href={`/studies/${study.slug}`}>
              <Card className="group h-full cursor-pointer border-border/60 bg-card/80 backdrop-blur-sm card-hover rounded-2xl">
                <CardContent className="p-5 flex flex-col h-full">
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
                </CardContent>
              </Card>
            </Link>
          </AnimatedCard>
        ))}
      </div>

      {studies.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground">No studies found in this collection.</p>
        </div>
      )}
    </div>
  );
}
