/**
 * Generate guide data from markdown compendiums.
 * Extracts editorial content (summaries, key insights, recommendations)
 * and produces lib/guides-data.ts
 */

const fs = require("fs");
const path = require("path");

const RESEARCH_DIR = path.join(__dirname, "../Kimi_Agent_GymHub Clean Design/research");
const OUT_FILE = path.join(__dirname, "../lib/guides-data.ts");

const GUIDE_META = [
  {
    file: "dim01_training.md",
    slug: "resistance-training",
    title: "The Science of Resistance Training",
    subtitle: "Volume, frequency, intensity, and what actually drives muscle growth.",
    category: "Resistance Training",
    color: "#0a0a0a",
    icon: "Dumbbell",
  },
  {
    file: "dim02_nutrition.md",
    slug: "nutrition",
    title: "Nutrition for Muscle & Performance",
    subtitle: "Protein, calories, meal timing, and the evidence behind dietary strategies.",
    category: "Nutrition",
    color: "#16a34a",
    icon: "Apple",
  },
  {
    file: "dim03_supplements.md",
    slug: "supplements",
    title: "The Evidence-Based Guide to Supplements",
    subtitle: "What works, what doesn't, and why — from creatine to caffeine.",
    category: "Supplements",
    color: "#3b82f6",
    icon: "Pill",
  },
  {
    file: "dim04_steroids.md",
    slug: "steroids",
    title: "Anabolic Steroids: Health Effects & Science",
    subtitle: "The real evidence on testosterone, risks, therapeutic use, and harm reduction.",
    category: "PEDs & Harm Reduction",
    color: "#dc2626",
    icon: "ShieldAlert",
  },
  {
    file: "dim05_sarms.md",
    slug: "sarms",
    title: "SARMs: Selective Androgen Receptor Modulators",
    subtitle: "Mechanisms, clinical data, risks, and the gap between hype and evidence.",
    category: "PEDs & Harm Reduction",
    color: "#dc2626",
    icon: "ShieldAlert",
  },
  {
    file: "dim06_peptides.md",
    slug: "peptides",
    title: "Peptides in Fitness & Bodybuilding",
    subtitle: "GHRPs, BPC-157, TB-500 — what the science actually says.",
    category: "PEDs & Harm Reduction",
    color: "#dc2626",
    icon: "ShieldAlert",
  },
  {
    file: "dim07_recovery.md",
    slug: "recovery",
    title: "Recovery, Sleep & Overtraining Science",
    subtitle: "How to recover smarter, sleep deeper, and avoid burnout.",
    category: "Recovery & Health",
    color: "#8b5cf6",
    icon: "Moon",
  },
  {
    file: "dim08_cardio_health.md",
    slug: "cardio",
    title: "Cardio, Heart Health & VO₂ Max",
    subtitle: "Why cardio matters for everyone — even strength athletes.",
    category: "Cardio & Conditioning",
    color: "#f59e0b",
    icon: "Heart",
  },
  {
    file: "dim09_hormones.md",
    slug: "hormones",
    title: "Hormones, Metabolism & Longevity",
    subtitle: "Testosterone, cortisol, insulin, and the hormonal response to exercise.",
    category: "PEDs & Harm Reduction",
    color: "#06b6d4",
    icon: "Activity",
  },
  {
    file: "dim10_injury_prevention.md",
    slug: "injury-prevention",
    title: "Injury Prevention & Prehab Science",
    subtitle: "Evidence-based strategies to stay healthy and lift for decades.",
    category: "Recovery & Health",
    color: "#8b5cf6",
    icon: "Shield",
  },
];

function parseMarkdown(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split("\n");

  // Extract title from first H1
  const titleMatch = content.match(/^#\s+(.+)$/m);
  const mdTitle = titleMatch ? titleMatch[1].replace(/—.*/, "").trim() : "";

  // Extract executive summary / summary paragraph
  let summary = "";
  const summaryPatterns = [
    /##\s+(?:1\.\s+)?Summary Paragraph\s*\n\n?([\s\S]+?)(?=\n##\s)/,
    /##\s+Executive Summary\s*\n\n?([\s\S]+?)(?=\n##\s)/,
    /##\s+Summary\s*\n\n?([\s\S]+?)(?=\n##\s)/,
  ];
  for (const pattern of summaryPatterns) {
    const match = content.match(pattern);
    if (match) {
      summary = match[1].trim();
      break;
    }
  }

  // Extract key insights
  let keyInsights = [];
  const insightsMatch = content.match(/##\s+(?:\d+\.\s+)?Key Insights[:\s]*\n\n?([\s\S]+?)(?=\n##\s+(?:\d+\.\s+)?Practical|##\s+(?:\d+\.\s+)?Research Gaps|##\s+(?:\d+\.\s+)?References|##\s+References|$)/);
  if (insightsMatch) {
    const section = insightsMatch[1];
    // Try to find numbered or bulleted insights
    const bullets = section.match(/^(?:\d+\.\s+|[\-\*]\s+)(.+)$/gm);
    if (bullets) {
      keyInsights = bullets.map((b) => b.replace(/^(?:\d+\.\s+|[\-\*]\s+)/, "").trim());
    } else {
      // Fallback: split by paragraphs
      keyInsights = section.split("\n\n").map((p) => p.trim()).filter((p) => p.length > 20);
    }
  }

  // Extract practical recommendations
  let recommendations = [];
  const recMatch = content.match(/##\s+(?:\d+\.\s+)?Practical Recommendations[:\s]*\n\n?([\s\S]+?)(?=\n##\s+(?:\d+\.\s+)?Research Gaps|##\s+(?:\d+\.\s+)?References|##\s+References|$)/);
  if (recMatch) {
    const section = recMatch[1];
    const bullets = section.match(/^(?:\d+\.\s+|[\-\*]\s+)(.+)$/gm);
    if (bullets) {
      recommendations = bullets.map((b) => b.replace(/^(?:\d+\.\s+|[\-\*]\s+)/, "").trim());
    } else {
      recommendations = section.split("\n\n").map((p) => p.trim()).filter((p) => p.length > 20);
    }
  }

  // Extract numbered topic sections (e.g. ## 1. Creatine Monohydrate)
  // These are sections before the "Key Insights" or "Research Studies" section
  const sections = [];
  const topicRegex = /##\s+(\d+)\.\s+(.+?)\n\n?([\s\S]+?)(?=\n##\s+\d+\.\s+|\n##\s+(?:Key Insights|Practical|Research|References|Studies)\b)/g;
  let m;
  while ((m = topicRegex.exec(content)) !== null) {
    const sectionTitle = m[2].trim();
    const sectionContent = m[3].trim();
    // Skip if it's the Summary or Executive Summary
    if (/summary|executive/i.test(sectionTitle)) continue;
    // Clean up content - remove study blocks, keep overview text
    const cleanedContent = sectionContent
      .replace(/\*\*Title:\*\*.+/gm, "")
      .replace(/\*\*Authors:\*\*.+/gm, "")
      .replace(/\*\*Year:\*\*.+/gm, "")
      .replace(/\*\*Journal:\*\*.+/gm, "")
      .replace(/\*\*URL:\*\*.+/gm, "")
      .replace(/\*\*Study Type:\*\*.+/gm, "")
      .replace(/\*\*Key Findings:\*\*/gm, "")
      .replace(/\*\*Practical Takeaway:\*\*.+/gm, "")
      .replace(/\*\*Knowledge Level:\*\*.+/gm, "")
      .replace(/\*\*Category:\*\*.+/gm, "")
      .replace(/\*\*Tags:\*\*.+/gm, "")
      .replace(/^\s*[-\*]\s*$/gm, "")
      .replace(/\n{3,}/g, "\n\n")
      .trim();

    if (cleanedContent.length > 50) {
      sections.push({
        title: sectionTitle,
        content: cleanedContent,
      });
    }
  }

  return { mdTitle, summary, keyInsights, recommendations, sections };
}

function generateGuidesData() {
  const guides = [];

  for (const meta of GUIDE_META) {
    const filePath = path.join(RESEARCH_DIR, meta.file);
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  File not found: ${meta.file}`);
      continue;
    }

    const parsed = parseMarkdown(filePath);
    const wordCount = parsed.summary.length + parsed.sections.reduce((acc, s) => acc + s.content.length, 0);
    const readTime = Math.max(5, Math.ceil(wordCount / 1200)); // ~200 words per minute, adjusted for dense content

    guides.push({
      slug: meta.slug,
      title: meta.title,
      subtitle: meta.subtitle,
      category: meta.category,
      color: meta.color,
      icon: meta.icon,
      readTime: `${readTime} min`,
      summary: parsed.summary,
      keyTakeaways: parsed.keyInsights.slice(0, 6),
      recommendations: parsed.recommendations.slice(0, 6),
      sections: parsed.sections.slice(0, 8), // Limit to 8 sections max
    });

    console.log(`✅ ${meta.file}: ${parsed.sections.length} sections, ${parsed.keyInsights.length} insights`);
  }

  // Generate TypeScript file
  const tsContent = `// Auto-generated by scripts/generate-guides.cjs
// Do not edit manually — re-run the script instead.

export interface GuideSection {
  title: string;
  content: string;
}

export interface Guide {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  color: string;
  icon: string;
  readTime: string;
  summary: string;
  keyTakeaways: string[];
  recommendations: string[];
  sections: GuideSection[];
}

export const guides: Guide[] = ${JSON.stringify(guides, null, 2)};

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export function getGuidesByCategory(category: string): Guide[] {
  return guides.filter((g) => g.category === category);
}
`;

  fs.writeFileSync(OUT_FILE, tsContent, "utf-8");
  console.log(`\n✅ Generated ${OUT_FILE} with ${guides.length} guides`);
}

generateGuidesData();
