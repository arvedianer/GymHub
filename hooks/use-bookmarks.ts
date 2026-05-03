"use client";

import { useState, useEffect, useCallback } from "react";

const STORAGE_KEY = "gymhub-bookmarks";

export interface BookmarkedStudy {
  id: string;
  slug: string;
  title: string;
  authors: string | null;
  journal: string | null;
  year: number | null;
  categoryName: string | null;
  methodologyQuality: number;
  bookmarkedAt: string;
}

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<BookmarkedStudy[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setBookmarks(JSON.parse(raw));
      }
    } catch {
      // ignore
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
    }
  }, [bookmarks, loaded]);

  const isBookmarked = useCallback(
    (slug: string) => bookmarks.some((b) => b.slug === slug),
    [bookmarks]
  );

  const addBookmark = useCallback(
    (study: Omit<BookmarkedStudy, "bookmarkedAt">) => {
      setBookmarks((prev) => {
        if (prev.some((b) => b.slug === study.slug)) return prev;
        return [
          ...prev,
          { ...study, bookmarkedAt: new Date().toISOString() },
        ];
      });
    },
    []
  );

  const removeBookmark = useCallback((slug: string) => {
    setBookmarks((prev) => prev.filter((b) => b.slug !== slug));
  }, []);

  const toggleBookmark = useCallback(
    (study: Omit<BookmarkedStudy, "bookmarkedAt">) => {
      if (isBookmarked(study.slug)) {
        removeBookmark(study.slug);
      } else {
        addBookmark(study);
      }
    },
    [isBookmarked, addBookmark, removeBookmark]
  );

  return {
    bookmarks,
    loaded,
    isBookmarked,
    addBookmark,
    removeBookmark,
    toggleBookmark,
  };
}
