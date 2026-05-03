"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error boundary caught:", error);
  }, [error]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-destructive/10 mb-6">
          <AlertTriangle className="h-8 w-8 text-destructive" />
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-foreground mb-3">
          Something went wrong
        </h1>
        <p className="text-muted-foreground mb-2 leading-relaxed">
          We hit an unexpected error while loading this page. It&apos;s not you,
          it&apos;s us.
        </p>
        {error.digest && (
          <p className="text-xs text-muted-foreground/60 font-mono mb-8">
            Error ID: {error.digest}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={reset} variant="default" className="gap-2">
            <RotateCcw className="h-4 w-4" />
            Try again
          </Button>
          <Link href="/" className={`${buttonVariants({ variant: "outline" })} gap-2`}>
            <Home className="h-4 w-4" />
            Back home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
