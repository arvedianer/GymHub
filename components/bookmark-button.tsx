"use client";

import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import { useBookmarks } from "@/hooks/use-bookmarks";

interface BookmarkButtonProps {
  study: {
    id: string;
    slug: string;
    title: string;
    authors: string | null;
    journal: string | null;
    year: number | null;
    category?: { name: string } | null;
    methodologyQuality: number;
  };
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "icon";
  className?: string;
  showText?: boolean;
}

export function BookmarkButton({
  study,
  variant = "outline",
  size = "sm",
  className = "",
  showText = true,
}: BookmarkButtonProps) {
  const { isBookmarked, toggleBookmark, loaded } = useBookmarks();
  const bookmarked = isBookmarked(study.slug);

  // Prevent hydration mismatch by rendering neutral state until loaded
  if (!loaded) {
    return (
      <Button
        variant={variant}
        size={size}
        className={`gap-2 ${className}`}
        disabled
      >
        <Bookmark className="h-4 w-4" />
        {showText && "Bookmark"}
      </Button>
    );
  }

  return (
    <Button
      variant={bookmarked ? "default" : variant}
      size={size}
      className={`gap-2 ${className}`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleBookmark({
          id: study.id,
          slug: study.slug,
          title: study.title,
          authors: study.authors,
          journal: study.journal,
          year: study.year,
          categoryName: study.category?.name || null,
          methodologyQuality: study.methodologyQuality,
        });
      }}
    >
      <Bookmark className={`h-4 w-4 ${bookmarked ? "fill-current" : ""}`} />
      {showText && (bookmarked ? "Saved" : "Bookmark")}
    </Button>
  );
}
