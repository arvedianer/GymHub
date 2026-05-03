import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  FlaskConical,
  Shield,
  Users,
  BookOpen,
  Star,
  Heart,
  Target,
  Zap,
} from "lucide-react";
import { AnimatedSection, AnimatedCard } from "@/components/animated";

export const metadata: Metadata = {
  title: "About — GymHub",
  description: "Our mission, methodology, and commitment to evidence-based fitness knowledge.",
};

async function getStats() {
  const studyCount = await prisma.study.count();
  const categoryCount = await prisma.category.count();
  const collectionCount = await prisma.collection.count();
  const avgQuality = await prisma.study.aggregate({ _avg: { methodologyQuality: true } });
  return { studyCount, categoryCount, collectionCount, avgQuality: avgQuality._avg.methodologyQuality || 0 };
}

export default async function AboutPage() {
  const { studyCount, categoryCount, collectionCount, avgQuality } = await getStats();

  return (
    <div className="container mx-auto px-4 md:px-6 py-10 md:py-16 max-w-4xl">
      {/* Header */}
      <AnimatedSection>
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 rounded-lg text-xs">
            <FlaskConical className="h-3 w-3 mr-1" />
            Our Mission
          </Badge>
          <h1 className="text-h1 mb-4">About GymHub</h1>
          <p className="text-body-lg text-muted-foreground max-w-2xl mx-auto">
            Peer-reviewed fitness research made accessible for everyone. 
            No bro-science, only evidence.
          </p>
        </div>
      </AnimatedSection>

      {/* Stats */}
      <AnimatedSection delay={0.1}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {[
            { value: studyCount, label: "Studies", icon: BookOpen },
            { value: categoryCount, label: "Categories", icon: Target },
            { value: collectionCount, label: "Collections", icon: Star },
            { value: avgQuality.toFixed(1), label: "Avg Quality", icon: Shield },
          ].map((stat, i) => (
            <Card key={i} className="border-border/60 bg-card/80 backdrop-blur-sm rounded-2xl">
              <CardContent className="p-5 text-center">
                <stat.icon className="h-5 w-5 text-accent mx-auto mb-2" />
                <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
                <p className="text-caption text-muted-foreground uppercase mt-1">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </AnimatedSection>

      {/* Values */}
      <AnimatedSection delay={0.2}>
        <h2 className="text-h2 text-center mb-10">What We Believe</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            {
              icon: Shield,
              title: "Evidence First",
              desc: "Every claim is backed by peer-reviewed research. We cite sources, show methodology quality, and never exaggerate findings.",
            },
            {
              icon: Users,
              title: "Accessible to All",
              desc: "Complex science distilled into three knowledge levels. Whether you're a beginner or researcher, you'll find value here.",
            },
            {
              icon: Heart,
              title: "Open Source",
              desc: "Our code and data are open. Community contributions drive the database. Transparency is non-negotiable.",
            },
          ].map((value, i) => (
            <AnimatedCard key={i} delay={i * 0.1}>
              <Card className="h-full border-border/60 bg-card/80 backdrop-blur-sm rounded-2xl">
                <CardContent className="p-6">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                    <value.icon className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                  <p className="text-body-sm text-muted-foreground">{value.desc}</p>
                </CardContent>
              </Card>
            </AnimatedCard>
          ))}
        </div>
      </AnimatedSection>

      {/* Methodology */}
      <AnimatedSection delay={0.3}>
        <div className="rounded-2xl border border-border/60 bg-surface/50 p-6 md:p-8 mb-16">
          <h2 className="text-h2 mb-6">Our Methodology</h2>
          <div className="space-y-4">
            {[
              { step: "1", title: "Source Selection", desc: "We prioritize meta-analyses, systematic reviews, and RCTs from PubMed-indexed journals." },
              { step: "2", title: "Quality Assessment", desc: "Each study receives a 1-5 star rating based on design, sample size, and methodological rigor." },
              { step: "3", title: "Multi-Level Summaries", desc: "Three summaries per study: beginner (no jargon), intermediate (some technical terms), advanced (full nuance)." },
              { step: "4", title: "Community Review", desc: "Open to corrections and additions via our open-source repository." },
            ].map((item, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                  <span className="text-xs font-semibold text-accent">{item.step}</span>
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Disclaimer */}
      <AnimatedSection delay={0.4}>
        <div className="rounded-2xl border border-border/60 bg-card/80 backdrop-blur-sm p-6 md:p-8">
          <div className="flex items-center gap-2 mb-3">
            <Zap className="h-4 w-4 text-accent" />
            <h3 className="font-semibold text-foreground">Medical Disclaimer</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            GymHub provides educational content based on peer-reviewed research. It is not a substitute 
            for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare 
            provider before making significant changes to your diet, supplement regimen, or training program. 
            Individual responses to exercise and nutrition vary widely.
          </p>
        </div>
      </AnimatedSection>
    </div>
  );
}
