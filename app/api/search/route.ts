import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";

  if (!q.trim()) {
    return NextResponse.json({ studies: [] });
  }

  const studies = await prisma.study.findMany({
    where: {
      OR: [
        { title: { contains: q } },
        { abstract: { contains: q } },
        { summaryBeginner: { contains: q } },
        { summaryIntermediate: { contains: q } },
        { summaryAdvanced: { contains: q } },
        { tags: { some: { tag: { name: { contains: q } } } } },
      ],
    },
    orderBy: { methodologyQuality: "desc" },
    take: 20,
    include: { category: true, tags: { include: { tag: true } } },
  });

  return NextResponse.json({ studies });
}
