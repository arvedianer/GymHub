import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Fitness Assistant — GymHub",
  description:
    "Ask our AI Evidence Bot anything about fitness, nutrition, supplements, or training. Get answers backed by 334+ peer-reviewed scientific studies.",
  keywords: [
    "AI fitness assistant",
    "fitness chatbot",
    "evidence-based answers",
    "training advice AI",
    "nutrition questions",
    "supplement research bot",
  ],
  alternates: {
    canonical: "https://gymhub-bay.vercel.app/chat",
  },
  openGraph: {
    title: "AI Fitness Assistant — GymHub",
    description:
      "Ask our AI Evidence Bot anything about fitness, nutrition, supplements, or training. Get answers backed by 334+ peer-reviewed scientific studies.",
    url: "https://gymhub-bay.vercel.app/chat",
    siteName: "GymHub",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Fitness Assistant — GymHub",
    description:
      "Ask our AI Evidence Bot anything about fitness, nutrition, supplements, or training. Get answers backed by 334+ peer-reviewed scientific studies.",
  },
};

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
