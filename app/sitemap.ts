import { prisma } from "@/lib/prisma";
import { safeQuery } from "@/lib/build-safe";
import { guides } from "@/lib/guides-data";

export default async function sitemap() {
  const studies = await safeQuery(
    () => prisma.study.findMany({ select: { slug: true, updatedAt: true } }),
    [] as { slug: string; updatedAt: Date }[]
  );

  const categories = await safeQuery(
    () => prisma.category.findMany({ select: { slug: true, updatedAt: true } }),
    [] as { slug: string; updatedAt: Date }[]
  );

  const collections = await safeQuery(
    () => prisma.collection.findMany({ select: { slug: true, updatedAt: true } }),
    [] as { slug: string; updatedAt: Date }[]
  );

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://gymhub-bay.vercel.app";

  const staticRoutes = [
    { path: "/", priority: 1.0, freq: "weekly" as const },
    { path: "/studies", priority: 0.9, freq: "daily" as const },
    { path: "/search", priority: 0.8, freq: "weekly" as const },
    { path: "/chat", priority: 0.8, freq: "weekly" as const },
    { path: "/about", priority: 0.7, freq: "monthly" as const },
    { path: "/dashboard", priority: 0.6, freq: "weekly" as const },
    { path: "/collections", priority: 0.8, freq: "weekly" as const },
    { path: "/learn", priority: 0.9, freq: "weekly" as const },
    { path: "/levels", priority: 0.7, freq: "monthly" as const },
    { path: "/new-studies", priority: 0.8, freq: "daily" as const },
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route.path}`,
      lastModified: new Date(),
      changeFrequency: route.freq,
      priority: route.priority,
    })),
    ...studies.map((study) => ({
      url: `${baseUrl}/studies/${study.slug}`,
      lastModified: study.updatedAt,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...categories.map((category) => ({
      url: `${baseUrl}/categories/${category.slug}`,
      lastModified: category.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...collections.map((collection) => ({
      url: `${baseUrl}/collections/${collection.slug}`,
      lastModified: collection.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...guides.map((guide) => ({
      url: `${baseUrl}/learn/${guide.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
