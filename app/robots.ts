import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://gymhub-bay.vercel.app";

  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/studies",
          "/categories",
          "/collections",
          "/learn",
          "/search",
          "/about",
          "/chat",
          "/dashboard",
          "/levels",
          "/new-studies",
        ],
        disallow: [
          "/api/",
          "/_next/",
          "/static/",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
