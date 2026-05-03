import type { Metadata } from "next";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BookOpen,
  Clock,
  TrendingUp,
  Dumbbell,
  Zap,
  Target,
  Award,
} from "lucide-react";
import { AnimatedSection, AnimatedCard } from "@/components/animated";

export const metadata: Metadata = {
  title: "Gym Levels — GymHub",
  description: "Find studies matched to your fitness experience level.",
};

const levelIcons = [Dumbbell, TrendingUp, Zap, Award];

async function getLevelsData() {
  const levels = await prisma.gymLevel.findMany({ orderBy: { order: "asc" } });
  const studiesByLevel = await Promise.all(
    levels.map(async (level) => ({
      count: await prisma.study.count({ where: { gymLevel: level.slug } }),
      level,
    }))
  );
  return studiesByLevel;
}

export default async function LevelsPage() {
  const levelsData = await getLevelsData();

  return (
    <div className="container mx-auto px-4 md:px-6 py-10 md:py-16">
      {/* Header */}
      <AnimatedSection>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="secondary" className="mb-4 rounded-lg text-xs">
            Progressive Learning
          </Badge>
          <h1 className="text-h1 mb-4">Your Gym Level</h1>
          <p className="text-body text-muted-foreground">
            Choose your experience level. We filter and present studies that match
            your knowledge — from beginner-friendly summaries to advanced technical analysis.
          </p>
        </div>
      </AnimatedSection>

      {/* Levels Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
        {levelsData.map(({ level, count }, i) => {
          const Icon = levelIcons[i] || Dumbbell;
          return (
            <AnimatedCard key={level.id} delay={i * 0.1}>
              <Link href={`/studies?level=${level.slug}`}>
                <Card
                  className="group h-full cursor-pointer border-border/60 bg-card/80 backdrop-blur-sm card-hover rounded-2xl overflow-hidden"
                  style={{ borderTopWidth: "3px", borderTopColor: level.color }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
                        style={{ backgroundColor: level.color }}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{level.name}</h3>
                        <p className="text-caption text-muted-foreground">{level.months}</p>
                      </div>
                    </div>
                    <p className="text-body-sm text-muted-foreground mb-4 line-clamp-2">
                      {level.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-caption text-muted-foreground">
                        <BookOpen className="h-3.5 w-3.5" />
                        {count} studies
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 px-2 text-xs gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        Explore <ArrowRight className="h-3 w-3" />
                      </Button>
                    </div>
                    {level.topics && (
                      <div className="mt-4 pt-4 border-t border-border/60">
                        <div className="flex flex-wrap gap-1.5">
                          {JSON.parse(level.topics)
                            .slice(0, 4)
                            .map((topic: string) => (
                              <Badge
                                key={topic}
                                variant="outline"
                                className="text-[10px] rounded-md"
                              >
                                {topic}
                              </Badge>
                            ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            </AnimatedCard>
          );
        })}
      </div>

      {/* How it works */}
      <AnimatedSection delay={0.4}>
        <div className="max-w-3xl mx-auto mt-20">
          <h2 className="text-h2 text-center mb-10">How Levels Work</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "1. Assess",
                desc: "Each study is tagged with a recommended knowledge level based on technical complexity.",
              },
              {
                icon: Clock,
                title: "2. Choose",
                desc: "Pick your level to see only studies and summaries appropriate for your background.",
              },
              {
                icon: TrendingUp,
                title: "3. Progress",
                desc: "As you learn, move up levels. The same study offers deeper summaries at higher tiers.",
              },
            ].map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                  <step.icon className="h-5 w-5 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-body-sm text-muted-foreground">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
