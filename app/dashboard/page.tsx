"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Bookmark,
  BookOpen,
  Star,
  TrendingUp,
  Dumbbell,
  Layers,
  ArrowRight,
  User,
  Clock,
} from "lucide-react";

interface BookmarkedStudy {
  id: string;
  slug: string;
  title: string;
  authors: string | null;
  journal: string | null;
  year: number | null;
  category: string | null;
  methodologyQuality: number;
}

function getBookmarks(): BookmarkedStudy[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("gymhub-bookmarks") || "[]");
  } catch {
    return [];
  }
}

export default function DashboardPage() {
  const [bookmarks, setBookmarks] = useState<BookmarkedStudy[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setBookmarks(getBookmarks());
  }, []);

  if (!mounted) return null;

  const avgQuality = bookmarks.length > 0
    ? (bookmarks.reduce((sum, b) => sum + b.methodologyQuality, 0) / bookmarks.length).toFixed(1)
    : "0";

  return (
    <div className="container mx-auto px-4 md:px-6 py-10 md:py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-semibold text-foreground tracking-tight mb-3">
            Your Dashboard
          </h1>
          <p className="text-muted-foreground max-w-xl">
            Track your saved studies, reading progress, and knowledge level.
          </p>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        {[
          { label: "Bookmarks", value: bookmarks.length, icon: Bookmark },
          { label: "Avg Quality", value: avgQuality, icon: Star },
          { label: "Categories", value: new Set(bookmarks.map(b => b.category).filter(Boolean)).size, icon: Layers },
          { label: "Reading Streak", value: "—", icon: TrendingUp },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <Card className="border-border/60 bg-card/80 backdrop-blur-sm rounded-2xl">
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-2">
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                  <span className="text-caption text-muted-foreground uppercase">{stat.label}</span>
                </div>
                <p className="text-2xl font-semibold text-foreground">{stat.value}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Bookmarks */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="border-border/60 bg-card/80 backdrop-blur-sm rounded-2xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Bookmark className="h-4 w-4 text-accent" />
                  Saved Studies
                </CardTitle>
              </CardHeader>
              <CardContent>
                {bookmarks.length === 0 ? (
                  <div className="text-center py-10">
                    <Bookmark className="h-10 w-10 text-muted-foreground/30 mx-auto mb-3" />
                    <p className="text-muted-foreground mb-4">No bookmarks yet.</p>
                    <Link href="/studies">
                      <Button variant="outline" className="rounded-xl gap-2">
                        <BookOpen className="h-4 w-4" />
                        Browse Studies
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {bookmarks.map((study) => (
                      <Link
                        key={study.id}
                        href={`/studies/${study.slug}`}
                        className="group flex items-start gap-3 p-3 rounded-xl hover:bg-surface transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-foreground group-hover:text-accent transition-colors truncate">
                              {study.title}
                            </h4>
                          </div>
                          <p className="text-xs text-muted-foreground">
                            {study.authors} • {study.journal} • {study.year}
                          </p>
                          <div className="flex items-center gap-2 mt-1.5">
                            {study.category && (
                              <Badge variant="secondary" className="text-[10px] rounded-md">
                                {study.category}
                              </Badge>
                            )}
                            <div className="flex items-center gap-0.5">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-2.5 w-2.5 ${
                                    i < study.methodologyQuality
                                      ? "text-accent fill-accent"
                                      : "text-muted-foreground/20"
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0 mt-1" />
                      </Link>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="border-border/60 bg-card/80 backdrop-blur-sm rounded-2xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Dumbbell className="h-4 w-4 text-accent" />
                  Your Level
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-4">
                  <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-3">
                    <User className="h-7 w-7 text-accent" />
                  </div>
                  <p className="font-semibold text-foreground">Guest</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Sign in to track your progress and get personalized recommendations.
                  </p>
                  <Button className="mt-4 rounded-full w-full" variant="outline">
                    Coming Soon
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="border-border/60 bg-card/80 backdrop-blur-sm rounded-2xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="h-4 w-4 text-accent" />
                  Quick Links
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-1">
                  {[
                    { href: "/studies", label: "Browse All Studies", icon: BookOpen },
                    { href: "/levels", label: "Find Your Level", icon: Layers },
                    { href: "/chat", label: "Ask the AI", icon: TrendingUp },
                    { href: "/collections", label: "Collections", icon: Bookmark },
                  ].map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm text-muted-foreground hover:text-foreground hover:bg-surface transition-colors"
                    >
                      <link.icon className="h-4 w-4" />
                      {link.label}
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
