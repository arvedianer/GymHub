import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Fitness Studies — GymHub",
  description:
    "Search 334+ peer-reviewed fitness studies on training, nutrition, supplements, recovery, and health. Find evidence-based answers with cited sources.",
  keywords: [
    "fitness studies search",
    "nutrition research search",
    "supplement studies database",
    "training science search",
    "pubmed fitness",
    "exercise research",
  ],
  alternates: {
    canonical: "https://gymhub-bay.vercel.app/search",
  },
  openGraph: {
    title: "Search Fitness Studies — GymHub",
    description:
      "Search 334+ peer-reviewed fitness studies on training, nutrition, supplements, recovery, and health.",
    url: "https://gymhub-bay.vercel.app/search",
    siteName: "GymHub",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Search Fitness Studies — GymHub",
    description:
      "Search 334+ peer-reviewed fitness studies on training, nutrition, supplements, recovery, and health.",
  },
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
