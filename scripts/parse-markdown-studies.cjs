/**
 * Parse markdown compendiums (dim01-dim10) and insert studies into the database.
 * Skips duplicates based on title slug or PubMed URL.
 */

const fs = require("fs");
const path = require("path");

// We need to import the Prisma client. Since this is a CommonJS script,
// we'll use the compiled client directly.
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const RESEARCH_DIR = path.join(__dirname, "../Kimi_Agent_GymHub Clean Design/research");

const FILE_MAP = [
  { file: "dim01_training.md", categorySlug: "resistance-training", categoryName: "Resistance Training" },
  { file: "dim02_nutrition.md", categorySlug: "nutrition", categoryName: "Nutrition" },
  { file: "dim03_supplements.md", categorySlug: "supplements", categoryName: "Supplements" },
  { file: "dim04_steroids.md", categorySlug: "peds", categoryName: "PEDs & Harm Reduction" },
  { file: "dim05_sarms.md", categorySlug: "peds", categoryName: "PEDs & Harm Reduction" },
  { file: "dim06_peptides.md", categorySlug: "peds", categoryName: "PEDs & Harm Reduction" },
  { file: "dim07_recovery.md", categorySlug: "recovery-health", categoryName: "Recovery & Health" },
  { file: "dim08_cardio_health.md", categorySlug: "cardio", categoryName: "Cardio & Conditioning" },
  { file: "dim09_hormones.md", categorySlug: "peds", categoryName: "PEDs & Harm Reduction" },
  { file: "dim10_injury_prevention.md", categorySlug: "recovery-health", categoryName: "Recovery & Health" },
];

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .substring(0, 60)
    .replace(/-$/, "");
}

function generateSummaryBeginner(title, keyFindings, practicalTakeaway) {
  const joined = keyFindings.join(" ");
  return `This study found that ${joined.split(".").slice(0, 2).join(". ")}. In simple terms: ${practicalTakeaway || "The research supports the main finding."}`;
}

function generateSummaryIntermediate(title, keyFindings, practicalTakeaway) {
  return keyFindings.slice(0, 3).join(" ") + (practicalTakeaway ? ` ${practicalTakeaway}` : "");
}

function generateSummaryAdvanced(title, keyFindings, practicalTakeaway) {
  return keyFindings.join(" ") + (practicalTakeaway ? ` Practical application: ${practicalTakeaway}` : "");
}

function parseStudyBlock(block, categorySlug, categoryName) {
  const lines = block.split("\n").map((l) => l.trim());

  function extractField(pattern) {
    for (const line of lines) {
      const match = line.match(pattern);
      if (match) return match[1].trim();
    }
    return null;
  }

  // Also try format without leading dash: "**Title:** ..."
  function extractFieldAlt(pattern) {
    for (const line of lines) {
      const match = line.match(pattern);
      if (match) return match[1].trim();
    }
    return null;
  }

  function extractList(startPattern) {
    let capturing = false;
    const items = [];
    for (const line of lines) {
      if (line.match(startPattern)) {
        capturing = true;
        continue;
      }
      if (capturing) {
        if (line.startsWith("- **")) {
          // Next field started
          break;
        }
        if (line.startsWith("- ") || line.startsWith("  - ")) {
          items.push(line.replace(/^\s*[-\*]\s*/, "").trim());
        } else if (line === "") {
          continue;
        } else if (!line.startsWith("  ") && line.length > 0) {
          break;
        }
      }
    }
    return items;
  }

  function extractListAlt(startPattern) {
    let capturing = false;
    const items = [];
    for (const line of lines) {
      if (line.match(startPattern)) {
        capturing = true;
        continue;
      }
      if (capturing) {
        if (line.startsWith("**")) {
          // Next field started
          break;
        }
        if (line.startsWith("- ") || line.startsWith("  - ")) {
          items.push(line.replace(/^\s*[-\*]\s*/, "").trim());
        } else if (line === "") {
          continue;
        } else if (line.length > 0 && !line.startsWith("  ")) {
          break;
        }
      }
    }
    return items;
  }

  const title = extractField(/^[-\*]\s*\*\*Title:\*\*\s*(.+)$/) || extractFieldAlt(/^\*\*Title:\*\*\s*(.+)$/);
  const authors = extractField(/^[-\*]\s*\*\*Authors:\*\*\s*(.+)$/) || extractFieldAlt(/^\*\*Authors:\*\*\s*(.+)$/);
  const yearStr = extractField(/^[-\*]\s*\*\*Year:\*\*\s*(\d{4}).*$/) || extractFieldAlt(/^\*\*Year:\*\*\s*(\d{4}).*$/);
  const journal = extractField(/^[-\*]\s*\*\*Journal:\*\*\s*(.+)$/) || extractFieldAlt(/^\*\*Journal:\*\*\s*(.+)$/);
  const url = extractField(/^[-\*]\s*\*\*URL:\*\*\s*(.+)$/) || extractFieldAlt(/^\*\*URL:\*\*\s*(.+)$/);
  const studyType = extractField(/^[-\*]\s*\*\*Study Type:\*\*\s*(.+)$/) || extractFieldAlt(/^\*\*Study Type:\*\*\s*(.+)$/);
  const practicalTakeaway = extractField(/^[-\*]\s*\*\*Practical Takeaway:\*\*\s*(.+)$/) || extractFieldAlt(/^\*\*Practical Takeaway:\*\*\s*(.+)$/);
  const knowledgeLevelRaw = extractField(/^[-\*]\s*\*\*Knowledge Level:\*\*\s*(.+)$/) || extractFieldAlt(/^\*\*Knowledge Level:\*\*\s*(.+)$/);
  const categoryRaw = extractField(/^[-\*]\s*\*\*Category:\*\*\s*(.+)$/) || extractFieldAlt(/^\*\*Category:\*\*\s*(.+)$/);
  const tagsRaw = extractField(/^[-\*]\s*\*\*Tags:\*\*\s*(.+)$/) || extractFieldAlt(/^\*\*Tags:\*\*\s*(.+)$/);

  const keyFindings = extractList(/^[-\*]?\s*\*\*Key Findings:\*\*$/) || extractListAlt(/^\*\*Key Findings:\*\*$/);

  if (!title) return null;

  const year = yearStr ? parseInt(yearStr, 10) : null;
  const slugBase = slugify(title);
  const slug = slugBase;

  // Parse tags
  let tags = [];
  if (tagsRaw) {
    try {
      tags = JSON.parse(tagsRaw.replace(/'/g, '"'));
    } catch {
      // Try to extract from bracket format
      const match = tagsRaw.match(/\[(.*)\]/);
      if (match) {
        tags = match[1].split(",").map((t) => t.trim().replace(/['"]/g, ""));
      }
    }
  }

  // Parse knowledge level
  let knowledgeLevel = "INTERMEDIATE";
  let gymLevel = "intermediate";
  if (knowledgeLevelRaw) {
    const lower = knowledgeLevelRaw.toLowerCase();
    if (lower.includes("beginner")) {
      knowledgeLevel = "BEGINNER";
      gymLevel = "beginner";
    } else if (lower.includes("advanced") || lower.includes("expert")) {
      knowledgeLevel = "ADVANCED";
      gymLevel = "advanced";
    }
  }

  // Parse sample size from study type if present
  let sampleSize = null;
  const nMatch = studyType?.match(/\(n\s*=\s*(\d+(?:,\d+)*)\)/i) || studyType?.match(/(\d+)\s+participants/i);
  if (nMatch) {
    sampleSize = parseInt(nMatch[1].replace(/,/g, ""), 10);
  }

  // Extract duration from title or study type if mentioned
  let duration = null;
  const durationMatch = block.match(/(\d+\s*(?:weeks?|months?|years?|days?))/i);
  if (durationMatch) duration = durationMatch[1];

  const summaryBeginner = generateSummaryBeginner(title, keyFindings, practicalTakeaway || "");
  const summaryIntermediate = generateSummaryIntermediate(title, keyFindings, practicalTakeaway || "");
  const summaryAdvanced = generateSummaryAdvanced(title, keyFindings, practicalTakeaway || "");

  return {
    slug,
    pmid: null,
    title,
    authors,
    journal,
    year,
    doi: null,
    abstract: null,
    summaryBeginner,
    summaryIntermediate,
    summaryAdvanced,
    keyFindings: JSON.stringify(keyFindings),
    practicalTakeaway: practicalTakeaway || null,
    methodologyQuality: 4,
    studyDesign: studyType || "Research Review",
    sampleSize,
    duration,
    conflictsOfInterest: null,
    replicationStatus: null,
    knowledgeLevel,
    gymLevel,
    oberkategorie: categoryName,
    isFeatured: false,
    isNew: false,
    categorySlug,
    tags,
    url,
  };
}

function parseFile(filePath, categorySlug, categoryName) {
  const content = fs.readFileSync(filePath, "utf-8");

  // Try both formats: "### Study N:" and "## Study N:"
  // Split by study headers
  const studyRegex = /^(?:#{2,3})\s+Study\s+\d+[:\s]/m;
  const parts = content.split(studyRegex);

  // If no matches, try alternative formats
  if (parts.length <= 1) {
    // Some files use "## Study 01" (no colon)
    const altRegex = /^##\s+Study\s+\d+/m;
    const altParts = content.split(altRegex);
    if (altParts.length > 1) {
      // Skip the preamble (first part)
      return altParts.slice(1).map((part) => parseStudyBlock(part, categorySlug, categoryName)).filter(Boolean);
    }
    return [];
  }

  // Skip the preamble (first part before first study)
  return parts.slice(1).map((part) => parseStudyBlock(part, categorySlug, categoryName)).filter(Boolean);
}

async function main() {
  console.log("Parsing markdown studies...\n");

  // Load existing studies for deduplication
  const existingStudies = await prisma.study.findMany({
    select: { slug: true, title: true },
  });
  const existingSlugs = new Set(existingStudies.map((s) => s.slug));
  const existingTitles = new Set(existingStudies.map((s) => s.title.toLowerCase().trim()));

  let totalParsed = 0;
  let totalInserted = 0;
  let totalSkipped = 0;

  for (const { file, categorySlug, categoryName } of FILE_MAP) {
    const filePath = path.join(RESEARCH_DIR, file);
    if (!fs.existsSync(filePath)) {
      console.log(`⚠️  File not found: ${file}`);
      continue;
    }

    const studies = parseFile(filePath, categorySlug, categoryName);
    console.log(`📄 ${file}: ${studies.length} studies parsed`);

    // Get category ID
    const category = await prisma.category.findUnique({
      where: { slug: categorySlug },
    });

    if (!category) {
      console.log(`   ⚠️  Category ${categorySlug} not found, skipping`);
      continue;
    }

    for (const study of studies) {
      totalParsed++;

      // Deduplication
      if (existingSlugs.has(study.slug) || existingTitles.has(study.title.toLowerCase().trim())) {
        totalSkipped++;
        continue;
      }

      // Make slug unique if needed
      let uniqueSlug = study.slug;
      let suffix = 1;
      while (existingSlugs.has(uniqueSlug)) {
        uniqueSlug = `${study.slug}-${suffix}`;
        suffix++;
      }
      existingSlugs.add(uniqueSlug);

      try {
        await prisma.study.create({
          data: {
            slug: uniqueSlug,
            pmid: study.pmid,
            title: study.title,
            authors: study.authors,
            journal: study.journal,
            year: study.year,
            doi: study.doi,
            abstract: study.abstract,
            summaryBeginner: study.summaryBeginner,
            summaryIntermediate: study.summaryIntermediate,
            summaryAdvanced: study.summaryAdvanced,
            keyFindings: study.keyFindings,
            practicalTakeaway: study.practicalTakeaway,
            methodologyQuality: study.methodologyQuality,
            studyDesign: study.studyDesign,
            sampleSize: study.sampleSize,
            duration: study.duration,
            conflictsOfInterest: study.conflictsOfInterest,
            replicationStatus: study.replicationStatus,
            knowledgeLevel: study.knowledgeLevel,
            gymLevel: study.gymLevel,
            oberkategorie: study.oberkategorie,
            isFeatured: study.isFeatured,
            isNew: study.isNew,
            categoryId: category.id,
          },
        });
        totalInserted++;
      } catch (err) {
        console.log(`   ❌ Error inserting "${study.title}": ${err.message}`);
      }
    }
  }

  console.log(`\n✅ Done! Parsed: ${totalParsed}, Inserted: ${totalInserted}, Skipped (duplicates): ${totalSkipped}`);

  // Show total count
  const count = await prisma.study.count();
  console.log(`📊 Total studies in database: ${count}`);

  await prisma.$disconnect();
}

main().catch((err) => {
  console.error(err);
  prisma.$disconnect();
  process.exit(1);
});
