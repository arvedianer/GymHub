"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface StudyFiltersProps {
  categories: { id: string; slug: string; name: string }[];
  designs: { studyDesign: string | null }[];
  levels: { id: string; slug: string; name: string }[];
}

export function StudyFilters({ categories, designs, levels }: StudyFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const q = searchParams.get("q") || "";
  const selectedCategory = searchParams.get("category") || "";
  const selectedDesign = searchParams.get("design") || "";
  const selectedLevel = searchParams.get("level") || "";

  function updateFilter(key: string, value: string | undefined | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/studies?${params.toString()}`);
  }

  return (
    <div className="flex flex-col md:flex-row gap-3 mb-8">
      {/* Search */}
      <form
        className="relative flex-1"
        onSubmit={(e) => {
          e.preventDefault();
          const form = e.currentTarget;
          const input = form.elements.namedItem("q") as HTMLInputElement;
          updateFilter("q", input.value);
        }}
      >
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          name="q"
          placeholder="Search studies, topics, tags..."
          defaultValue={q}
          className="pl-9 rounded-xl bg-card border-border/60"
        />
      </form>

      {/* Filters */}
      <div className="flex gap-3 flex-wrap">
        <Select value={selectedCategory} onValueChange={(v) => updateFilter("category", v)}>
          <SelectTrigger className="w-[180px] rounded-xl bg-card border-border/60">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat.id} value={cat.slug}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedLevel} onValueChange={(v) => updateFilter("level", v)}>
          <SelectTrigger className="w-[160px] rounded-xl bg-card border-border/60">
            <SelectValue placeholder="All Levels" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Levels</SelectItem>
            {levels.map((lvl) => (
              <SelectItem key={lvl.id} value={lvl.slug}>
                {lvl.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedDesign} onValueChange={(v) => updateFilter("design", v)}>
          <SelectTrigger className="w-[200px] rounded-xl bg-card border-border/60">
            <SelectValue placeholder="Study Design" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Designs</SelectItem>
            {designs
              .filter((d): d is { studyDesign: string } => !!d.studyDesign)
              .map((d) => (
                <SelectItem key={d.studyDesign} value={d.studyDesign}>
                  {d.studyDesign}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
