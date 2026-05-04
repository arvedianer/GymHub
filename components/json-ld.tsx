export function StudyJsonLd({
  title,
  authors,
  year,
  journal,
  abstract,
  slug,
  studyDesign,
  sampleSize,
}: {
  title: string;
  authors: string | null;
  year: number | null;
  journal: string | null;
  abstract: string | null;
  slug: string;
  studyDesign: string | null;
  sampleSize: number | null;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://gymhub-bay.vercel.app";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: title,
    author: authors
      ? authors.split(",").map((name) => ({
          "@type": "Person",
          name: name.trim(),
        }))
      : undefined,
    datePublished: year ? `${year}` : undefined,
    publisher: journal
      ? {
          "@type": "Organization",
          name: journal,
        }
      : undefined,
    description: abstract?.slice(0, 500) || undefined,
    url: `${baseUrl}/studies/${slug}`,
    about: studyDesign || undefined,
    ...(sampleSize
      ? {
          "@type": "MedicalTrial",
          studySubject: {
            "@type": "QuantitativeValue",
            value: sampleSize,
            unitText: "participants",
          },
        }
      : {}),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function GuideJsonLd({
  title,
  subtitle,
  slug,
  readTime,
}: {
  title: string;
  subtitle: string;
  slug: string;
  readTime: string;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://gymhub-bay.vercel.app";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: subtitle,
    url: `${baseUrl}/learn/${slug}`,
    timeRequired: readTime,
    author: {
      "@type": "Organization",
      name: "GymHub",
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "GymHub",
      url: baseUrl,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function OrganizationJsonLd() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://gymhub-bay.vercel.app";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "GymHub",
    url: baseUrl,
    logo: `${baseUrl}/favicon.ico`,
    description:
      "Science-based fitness knowledge. 334+ peer-reviewed studies on training, nutrition, supplements, recovery, and health.",
    sameAs: ["https://github.com/arvedianer/gymhub"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
