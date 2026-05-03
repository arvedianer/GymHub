"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Share2, Check } from "lucide-react";

export function ShareButton({ slug }: { slug: string }) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = `${window.location.origin}/studies/${slug}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      window.open(url, "_blank");
    }
  }

  return (
    <Button
      variant="outline"
      className="w-full justify-start gap-2 rounded-xl"
      size="sm"
      onClick={handleShare}
    >
      {copied ? <Check className="h-4 w-4 text-green-500" /> : <Share2 className="h-4 w-4" />}
      {copied ? "Link copied!" : "Share study"}
    </Button>
  );
}
