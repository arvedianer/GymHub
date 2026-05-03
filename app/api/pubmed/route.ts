import { NextRequest, NextResponse } from "next/server";
import { searchAndFetchPubMed } from "@/lib/pubmed";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";
  const max = Math.min(parseInt(searchParams.get("max") || "10", 10), 20);

  if (!q.trim()) {
    return NextResponse.json({ studies: [] });
  }

  try {
    const studies = await searchAndFetchPubMed(q, max);
    return NextResponse.json({ studies });
  } catch (error) {
    console.error("PubMed API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch from PubMed" },
      { status: 500 }
    );
  }
}
