import { Skeleton } from "@/components/ui/skeleton";

export default function GuideLoading() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-10">
        {/* Main content */}
        <div className="space-y-8">
          {/* Breadcrumb */}
          <Skeleton className="h-4 w-32" />

          {/* Title + subtitle */}
          <div className="space-y-3">
            <Skeleton className="h-10 w-full max-w-xl" />
            <Skeleton className="h-5 w-full max-w-lg" />
          </div>

          {/* Meta */}
          <div className="flex gap-3">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>

          {/* Summary box */}
          <div className="rounded-xl border border-border bg-card p-6 space-y-4">
            <Skeleton className="h-6 w-28" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </div>

          {/* Key takeaways */}
          <div className="space-y-4">
            <Skeleton className="h-6 w-36" />
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
            </div>
          </div>

          {/* Recommendations */}
          <div className="space-y-4">
            <Skeleton className="h-6 w-40" />
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>

        {/* Sidebar TOC */}
        <div className="hidden lg:block">
          <div className="sticky top-24 rounded-xl border border-border bg-card p-5 space-y-4">
            <Skeleton className="h-5 w-24" />
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-3/4" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
