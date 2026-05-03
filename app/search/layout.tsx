import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search Studies — GymHub",
  description: "Find evidence on any fitness topic. Search our curated database of peer-reviewed research.",
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
