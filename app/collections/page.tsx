import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, BookOpen } from "lucide-react";
import { AnimatedSection, AnimatedCard } from "@/components/animated";

export const metadata: Metadata = {
  title: "Collections — GymHub",
  description: "Curated study collections on specific fitness topics.",
};

async function getCollections() {
  const collections = await prisma.collection.findMany({
    orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
  });
  return collections.map((c) => ({
    ...c,
    studySlugs: JSON.parse(c.studyIds) as string[],
  }));
}

async function getCollectionsWithCounts() {
  const collections = await prisma.collection.findMany({
    orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
  });
  
  return Promise.all(
    collections.map(async (c) => {
      const slugs = JSON.parse(c.studyIds) as string[];
      const count = await prisma.study.count({
        where: { slug: { in: slugs } },
      });
      return { ...c, studySlugs: slugs, count };
    })
  );
}

export default async function CollectionsPage() {
  const collections = await getCollectionsWithCounts();

  return (
    <div className="container mx-auto px-4 md:px-6 py-10 md:py-16">
      {/* Header */}
      <AnimatedSection>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="secondary" className="mb-4 rounded-lg text-xs">
            <Sparkles className="h-3 w-3 mr-1" />
            Curated Topics
          </Badge>
          <h1 className="text-h1 mb-4">Study Collections</h1>
          <p className="text-body text-muted-foreground">
            Deep dives into specific topics. Each collection bundles the most important
            studies so you can build expertise without the noise.
          </p>
        </div>
      </AnimatedSection>

      {/* Collections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
        {collections.map((collection, i) => (
          <AnimatedCard key={collection.id} delay={i * 0.08}>
            <Link href={`/collections/${collection.slug}`}>
              <Card
                className="group h-full cursor-pointer border-border/60 bg-card/80 backdrop-blur-sm card-hover rounded-2xl overflow-hidden"
                style={{ borderLeftWidth: "3px", borderLeftColor: collection.color }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-foreground text-lg mb-1">
                        {collection.name}
                      </h3>
                      <p className="text-body-sm text-muted-foreground line-clamp-2">
                        {collection.description}
                      </p>
                    </div>
                    {collection.isFeatured && (
                      <Badge
                        className="shrink-0 ml-2 rounded-lg text-[10px]"
                        style={{
                          backgroundColor: collection.color + "15",
                          color: collection.color,
                          borderColor: collection.color + "30",
                        }}
                        variant="outline"
                      >
                        Featured
                      </Badge>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                      <BookOpen className="h-3.5 w-3.5" />
                      <span>{collection.count}</span>
                      <span>studies</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-xs gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Read <ArrowRight className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </AnimatedCard>
        ))}
      </div>
    </div>
  );
}
