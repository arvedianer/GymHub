import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Evidence Bot — GymHub",
  description: "Ask anything about fitness, health, or performance. Answers come from peer-reviewed studies only.",
};

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
