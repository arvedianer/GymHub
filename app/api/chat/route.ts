import { NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import OpenAI from "openai";

interface StudyResult {
  id: string;
  slug: string;
  title: string;
  authors: string | null;
  journal: string | null;
  year: number | null;
  abstract: string | null;
  summaryBeginner: string | null;
  summaryIntermediate: string | null;
  summaryAdvanced: string | null;
  methodologyQuality: number;
  studyDesign: string | null;
  sampleSize: number | null;
  category: { name: string } | null;
  tags: { tag: { name: string } }[];
}

const stopWords = new Set([
  "the", "a", "an", "is", "are", "was", "were", "be", "been", "being",
  "have", "has", "had", "do", "does", "did", "will", "would", "could",
  "should", "may", "might", "must", "shall", "can", "need", "dare",
  "ought", "used", "to", "of", "in", "for", "on", "with", "at", "by",
  "from", "as", "into", "through", "during", "before", "after", "above",
  "below", "between", "under", "again", "further", "then", "once", "here",
  "there", "when", "where", "why", "how", "all", "each", "few", "more",
  "most", "other", "some", "such", "no", "nor", "not", "only", "own",
  "same", "so", "than", "too", "very", "just", "about", "what",
  "which", "who", "whom", "this", "that", "these", "those", "am", "it",
  "its", "i", "me", "my", "we", "our", "you", "your", "he", "him", "his",
  "she", "her", "they", "them", "their", "tell", "explain", "give",
  "get", "know", "want", "think", "say", "help", "show", "find", "search",
]);

function extractKeywords(q: string): string[] {
  return q
    .toLowerCase()
    .split(/\s+/)
    .map((w) => w.replace(/[^a-z0-9]/g, ""))
    .filter((w) => w.length > 2 && !stopWords.has(w));
}

async function searchStudies(keywords: string[]): Promise<StudyResult[]> {
  if (keywords.length === 0) return [];
  return prisma.study.findMany({
    where: {
      OR: [
        ...keywords.map((k) => ({ title: { contains: k } })),
        ...keywords.map((k) => ({ abstract: { contains: k } })),
        ...keywords.map((k) => ({ summaryBeginner: { contains: k } })),
        ...keywords.map((k) => ({ summaryIntermediate: { contains: k } })),
        ...keywords.map((k) => ({ summaryAdvanced: { contains: k } })),
        ...keywords.map((k) => ({
          tags: { some: { tag: { name: { contains: k } } } },
        })),
      ],
    },
    orderBy: { methodologyQuality: "desc" },
    take: 8,
    include: { category: true, tags: { include: { tag: true } } },
  });
}

function buildContext(studies: StudyResult[]): string {
  if (studies.length === 0) return "No relevant studies found in the database.";
  return studies
    .map((s, i) => {
      const summary = s.summaryBeginner || s.abstract || "";
      return `[${i + 1}] ${s.authors?.split(",")[0] || "Researchers"} (${s.year}) — ${s.title}\nDesign: ${s.studyDesign || "N/A"}, Quality: ${s.methodologyQuality}/5, n=${s.sampleSize || "N/A"}\nSummary: ${summary.slice(0, 300)}${summary.length > 300 ? "..." : ""}`;
    })
    .join("\n\n");
}

function buildFallbackResponse(studies: StudyResult[], message: string): string {
  if (studies.length === 0) {
    return "I couldn't find any studies matching your question in our database. Try asking about specific topics like protein, creatine, sleep, training volume, or HIIT.";
  }

  const topStudy = studies[0];
  const summary = topStudy.summaryBeginner || topStudy.abstract || "";
  const keyFinding = summary.split(".")[0] + ".";
  const supporting = studies.slice(1, 3);

  let response = `I found ${studies.length} relevant study${studies.length > 1 ? "ies" : "y"} in our database.\n\n**Key Finding:** ${keyFinding}\n\n${summary.slice(keyFinding.length).trim()}\n\n`;

  if (supporting.length > 0) {
    response += `**Supporting research:**\n`;
    supporting.forEach((s) => {
      const sSummary = s.summaryBeginner || s.abstract || "";
      response += `• ${s.authors?.split(",")[0] || "Researchers"} (${s.year}): ${sSummary.split(".")[0]}.\n`;
    });
    response += `\n`;
  }

  response += `Study design: ${topStudy.studyDesign || "Not specified"}. `;
  if (topStudy.sampleSize && topStudy.sampleSize > 0) {
    response += `Sample size: n=${topStudy.sampleSize}. `;
  }
  response += `Methodology quality: ${topStudy.methodologyQuality}/5.`;

  return response.trim();
}

function createStream(text: string, delayMs = 8): ReadableStream {
  const encoder = new TextEncoder();
  const chunks = text.split("");
  let index = 0;

  return new ReadableStream({
    async pull(controller) {
      if (index >= chunks.length) {
        controller.close();
        return;
      }
      const char = chunks[index++];
      controller.enqueue(encoder.encode(char));
      await new Promise((r) => setTimeout(r, delayMs));
    },
  });
}

async function streamOpenAI(message: string, studies: StudyResult[]): Promise<ReadableStream> {
  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  const context = buildContext(studies);

  const systemPrompt = `You are the GymHub Evidence Bot — a knowledgeable, evidence-based fitness research assistant. You have access to a curated database of ${studies.length} peer-reviewed studies related to the user's question.

Use the provided study context to answer accurately. Cite studies by number [1], [2], etc. when referencing them. Be concise but thorough. If the studies don't fully answer the question, say so honestly. Never make up studies or findings.

Context:
${context}`;

  const stream = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: message },
    ],
    stream: true,
    max_tokens: 800,
    temperature: 0.4,
  });

  const encoder = new TextEncoder();
  return new ReadableStream({
    async pull(controller) {
      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content || "";
        if (content) {
          controller.enqueue(encoder.encode(content));
        }
      }
      controller.close();
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    if (!message || typeof message !== "string") {
      return new Response("Message required", { status: 400 });
    }

    const keywords = extractKeywords(message);
    const studies = await searchStudies(keywords);

    const sources = studies.map((s) => ({
      title: `${s.authors?.split(",")[0] || s.authors} (${s.year}) — ${s.title.slice(0, 60)}...`,
      slug: s.slug,
    }));

    // If OpenAI key is available, use real streaming
    if (process.env.OPENAI_API_KEY) {
      const stream = await streamOpenAI(message, studies);
      return new Response(stream, {
        headers: {
          "Content-Type": "text/plain; charset=utf-8",
          "X-Sources": JSON.stringify(sources),
          "X-Studies-Count": String(studies.length),
        },
      });
    }

    // Fallback: simulate streaming with local response
    const fallbackText = buildFallbackResponse(studies, message);
    const stream = createStream(fallbackText, 6);

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "X-Sources": JSON.stringify(sources),
        "X-Studies-Count": String(studies.length),
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(
          encoder.encode(
            "Sorry, I encountered an error processing your request. Please try again."
          )
        );
        controller.close();
      },
    });
    return new Response(stream, {
      status: 500,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}
