import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Zap, ArrowRight, Star, FlaskConical } from "lucide-react";
import { AnimatedSection, AnimatedCard } from "@/components/animated";

export const metadata: Metadata = {
  title: "New Studies — GymHub",
  description: "Recently added peer-reviewed fitness research.",
};

async function getNewStudies() {
  const studies = await prisma.study.findMany({
    where: { isNew: true },
    orderBy: { year: "desc" },
    include: { category: true, tags: { include: { tag: true } } },
  });
  return studies;
}

export default async function NewStudiesPage() {
  const studies = await getNewStudies();

  return (
    <div className="container mx-auto px-4 md:px-6 py-10 md:py-16">
      <AnimatedSection>
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-3">
            <Badge className="rounded-lg text-xs bg-accent/10 text-accent border-accent/20">
              <Zap className="h-3 w-3 mr-1" />
              Fresh Research
            </Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-3">
            New Studies
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            The latest additions to our database. Cutting-edge research from 2024-2026.
          </p>
        </div>
      </AnimatedSection>

      <div className="space-y-4">
        {studies.map((study, i) => (
          <AnimatedCard key={study.id} delay={i * 0.06}>
            <Link href={`/studies/${study.slug}`}>
              <Card className="group cursor-pointer border-border/60 bg-card/80 backdrop-blur-sm card-hover rounded-2xl">
                <CardContent className="p-5 md:p-6">
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <Badge variant="secondary" className="text-xs rounded-lg font-medium">
                          {study.category?.name}
                        </Badge>
                        <Badge className="text-[10px] rounded-lg bg-accent/10 text-accent border-accent/20">
                          <Zap className="h-3 w-3 mr-1" />
                          NEW
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
                      <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors duration-300 mb-2">
                        {study.title}
                      </h3>
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
                      <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                        {study.abstract}
                      </p>
                    </div>
                    <div className="shrink-0 flex items-center md:pt-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-1 text-accent hover:text-accent/80"
                      >
                        Read <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </AnimatedCard>
        ))}
      </div>

      {studies.length === 0 && (
        <div className="text-center py-20">
          <p className="text-muted-foreground">No new studies at the moment. Check back soon!</p>
        </div>
      )}
    </div>
  );
}
