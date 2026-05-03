"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Dumbbell, ArrowLeft, Home, Search, BookOpen } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent-soft mb-6">
          <Dumbbell className="h-8 w-8 text-accent" />
        </div>

        <h1 className="text-7xl font-bold tracking-tight text-foreground mb-2">
          404
        </h1>
        <p className="text-xl font-medium text-foreground mb-3">
          Page not found
        </p>
        <p className="text-muted-foreground mb-10 leading-relaxed">
          Looks like this page dropped the weight. The page you&apos;re looking for
          doesn&apos;t exist or has been moved.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className={`${buttonVariants({ variant: "default" })} gap-2`}>
            <Home className="h-4 w-4" />
            Back home
          </Link>
          <Link href="/search" className={`${buttonVariants({ variant: "outline" })} gap-2`}>
            <Search className="h-4 w-4" />
            Search studies
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <p className="text-sm text-muted-foreground mb-4">
            Or explore popular sections
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            <Link
              href="/studies"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface text-sm text-text-secondary hover:bg-surface-hover hover:text-foreground transition-colors"
            >
              <BookOpen className="h-3.5 w-3.5" />
              Studies
            </Link>
            <Link
              href="/learn"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface text-sm text-text-secondary hover:bg-surface-hover hover:text-foreground transition-colors"
            >
              Guides
            </Link>
            <Link
              href="/collections"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface text-sm text-text-secondary hover:bg-surface-hover hover:text-foreground transition-colors"
            >
              Collections
            </Link>
            <Link
              href="/chat"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface text-sm text-text-secondary hover:bg-surface-hover hover:text-foreground transition-colors"
            >
              Ask AI
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
