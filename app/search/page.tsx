"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Star, FlaskConical, ArrowRight, BookOpen, ExternalLink } from "lucide-react";
import { BookmarkButton } from "@/components/bookmark-button";

interface StudyResult {
  id: string;
  slug: string;
  title: string;
  authors: string | null;
  journal: string | null;
  year: number | null;
  abstract: string | null;
  studyDesign: string | null;
  sampleSize: number | null;
  methodologyQuality: number;
  category: { name: string } | null;
  tags: { tag: { name: string } }[];
}

interface PubMedResult {
  pmid: string;
  title: string;
  authors: string;
  journal: string;
  year: number;
  abstract: string;
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<StudyResult[]>([]);
  const [pubMedResults, setPubMedResults] = useState<PubMedResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [pubMedLoading, setPubMedLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setPubMedLoading(true);
    setSearched(true);
    setResults([]);
    setPubMedResults([]);

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data.studies || []);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }

    try {
      const res = await fetch(`/api/pubmed?q=${encodeURIComponent(query)}&max=5`);
      const data = await res.json();
      setPubMedResults(data.studies || []);
    } catch {
      setPubMedResults([]);
    } finally {
      setPubMedLoading(false);
    }
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-10 md:py-16 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-10"
      >
        <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-3">
          Search Studies
        </h1>
        <p className="text-muted-foreground">
          Find evidence on any fitness topic. Search our database + PubMed.
        </p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        onSubmit={handleSearch}
        className="relative mb-10"
      >
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. protein intake, creatine, sleep, steroids..."
          className="pl-12 pr-28 h-14 text-lg rounded-2xl bg-card border-border/60 focus-visible:ring-accent"
        />
        <Button
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-xl"
          disabled={loading}
        >
          {loading ? "Searching..." : "Search"}
        </Button>
      </motion.form>

      <AnimatePresence>
        {searched && !loading && results.length === 0 && pubMedResults.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-12"
          >
            <p className="text-muted-foreground">No studies found for &quot;{query}&quot;.</p>
            <p className="text-sm text-muted-foreground mt-1">
              Try broader terms like &quot;protein&quot;, &quot;training&quot;, or &quot;supplements&quot;.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {results.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-4 mb-10"
        >
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              Found {results.length} result{results.length !== 1 ? "s" : ""} in our database
            </p>
          </div>
          {results.map((study, i) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="group border-border/60 bg-card/80 backdrop-blur-sm card-hover rounded-2xl">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="secondary" className="text-xs rounded-lg font-medium">
                          {study.category?.name}
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
                      <Link href={`/studies/${study.slug}`}>
                        <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors duration-300 mb-1">
                          {study.title}
                        </h3>
                      </Link>
                      <p className="text-xs text-muted-foreground mb-2">
                        {study.authors} • {study.journal} • {study.year}
                      </p>
                      <div className="flex items-center gap-2 mb-2">
                        <FlaskConical className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">{study.studyDesign}</span>
                        {study.sampleSize && (
                          <span className="text-xs text-muted-foreground">• n={study.sampleSize}</span>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">{study.abstract}</p>
                      <div className="mt-3 flex items-center gap-1 text-sm font-medium text-accent">
                        <Link href={`/studies/${study.slug}`} className="flex items-center gap-1 hover:underline">
                          Read summary <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                    <div className="shrink-0 pt-1">
                      <BookmarkButton
                        study={{
                          id: study.id,
                          slug: study.slug,
                          title: study.title,
                          authors: study.authors,
                          journal: study.journal,
                          year: study.year,
                          category: study.category,
                          methodologyQuality: study.methodologyQuality,
                        }}
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full"
                        showText={false}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}

      {pubMedResults.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-4"
        >
          <div className="flex items-center gap-2 mb-4">
            <ExternalLink className="h-4 w-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              {pubMedResults.length} result{pubMedResults.length !== 1 ? "s" : ""} from PubMed
            </p>
          </div>
          {pubMedResults.map((study, i) => (
            <motion.div
              key={study.pmid}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="border-border/60 bg-card/80 backdrop-blur-sm rounded-2xl">
                <CardContent className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs rounded-lg">PubMed</Badge>
                  </div>
                  <a
                    href={`https://pubmed.ncbi.nlm.nih.gov/${study.pmid}/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-foreground hover:text-accent transition-colors duration-300"
                  >
                    {study.title}
                  </a>
                  <p className="text-xs text-muted-foreground mt-1">
                    {study.authors} • {study.journal} • {study.year}
                  </p>
                  <p className="text-sm text-muted-foreground line-clamp-3 mt-2">{study.abstract}</p>
                  <div className="mt-3 flex items-center gap-1 text-sm font-medium text-accent">
                    <a
                      href={`https://pubmed.ncbi.nlm.nih.gov/${study.pmid}/`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 hover:underline"
                    >
                      View on PubMed <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}

      {pubMedLoading && (
        <div className="flex items-center gap-2 py-4 text-sm text-muted-foreground">
          <div className="h-4 w-4 rounded-full border-2 border-muted-foreground/30 border-t-accent animate-spin" />
          Searching PubMed...
        </div>
      )}

      {!searched && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3"
        >
          {["protein", "creatine", "sleep", "cardio", "steroids", "sarms", "volume", "hypertrophy"].map(
            (term) => (
              <button
                key={term}
                onClick={() => {
                  setQuery(term);
                  setSearched(false);
                }}
                className="rounded-xl border border-border/60 bg-card/80 backdrop-blur-sm px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:border-accent/30 transition-all text-left capitalize card-hover"
              >
                {term}
              </button>
            )
          )}
        </motion.div>
      )}
    </div>
  );
}
