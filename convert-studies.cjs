const fs = require('fs');
const path = require('path');

const SWARM_DIR = "./Kimi_Agent_GymHub Clean Design/research-swarm";

// Map category slugs
const categoryMap = {
  "hypertrophy": "resistance-training",
  "nutrition": "nutrition",
  "supplements": "supplements",
  "steroids": "peds",
  "sarms": "peds",
  "peptides": "peds",
  "recovery": "recovery-health",
  "cardio": "cardio",
  "hormones": "recovery-health",
  "injury": "biomechanics",
};

const fileToCategory = {
  "hypertrophy.json": "resistance-training",
  "nutrition.json": "nutrition",
  "supplements.json": "supplements",
  "steroids.json": "peds",
  "sarms.json": "peds",
  "peptides.json": "peds",
  "recovery.json": "recovery-health",
  "cardio.json": "cardio",
  "hormones.json": "recovery-health",
  "injury.json": "biomechanics",
};

function slugify(text) {
  return text.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .substring(0, 60)
    .replace(/-$/, '');
}

function extractPmid(url) {
  if (!url) return null;
  const m = url.match(/pubmed\.ncbi\.nlm\.nih\.gov\/(\d+)/);
  return m ? m[1] : null;
}

function escapeStr(s) {
  if (!s) return '';
  return s.replace(/`/g, '\\`').replace(/\${/g, '\\${');
}

function generateSummaryBeginner(study) {
  // Use practical takeaway as base, simplified
  let text = study.practicalTakeaway || '';
  // If very short, expand slightly
  if (text.length < 80) {
    text = `${text} This was found in a ${study.studyType?.toLowerCase() || 'study'} with ${study.nValue || 'multiple'} participants.`;
  }
  return text;
}

function generateSummaryIntermediate(study) {
  const findings = study.keyFindings || [];
  const firstFinding = findings[0] || '';
  const text = `${firstFinding} ${study.practicalTakeaway || ''}`.trim();
  return text || study.practicalTakeaway || '';
}

function generateSummaryAdvanced(study) {
  const findings = study.keyFindings || [];
  return findings.join(' ') + ' ' + (study.practicalTakeaway || '');
}

function generateAbstract(study) {
  const findings = study.keyFindings || [];
  return findings.slice(0, 2).join(' ') || study.practicalTakeaway || '';
}

function processStudy(study, categorySlug, fileName) {
  const slug = slugify(study.title);
  const pmid = extractPmid(study.url);
  const doi = null; // not in JSON
  const abstract = generateAbstract(study);
  const summaryBeginner = generateSummaryBeginner(study);
  const summaryIntermediate = generateSummaryIntermediate(study);
  const summaryAdvanced = generateSummaryAdvanced(study);
  const keyFindings = JSON.stringify(study.keyFindings || []);
  const tags = study.tags || [];
  const isNew = study.isNew === true;
  const isFeatured = study.studyType?.toLowerCase().includes('meta') && study.nValue > 100;
  const knowledgeLevel = (study.knowledgeLevel || 'INTERMEDIATE').toUpperCase();
  const gymLevel = study.gymLevel || 'intermediate';
  const oberkategorie = study.oberkategorie || '';
  const methodologyQuality = study.studyType?.toLowerCase().includes('meta') ? 5 :
    study.studyType?.toLowerCase().includes('rct') ? 4 : 3;

  return {
    slug,
    pmid,
    title: study.title,
    authors: study.authors,
    journal: study.journal,
    year: study.year,
    doi,
    abstract,
    summaryBeginner,
    summaryIntermediate,
    summaryAdvanced,
    keyFindings,
    practicalTakeaway: study.practicalTakeaway,
    methodologyQuality,
    studyDesign: study.studyType,
    sampleSize: study.nValue,
    duration: study.duration,
    knowledgeLevel,
    gymLevel,
    oberkategorie,
    isFeatured,
    isNew,
    categorySlug,
    tags,
  };
}

function studyToCode(study, index) {
  const tagsArray = study.tags.map(t => `"${t}"`).join(', ');
  return `    {
      slug: "${study.slug}-${index}", pmid: ${study.pmid ? `"${study.pmid}"` : 'null'},
      title: "${escapeStr(study.title)}",
      authors: "${escapeStr(study.authors)}", journal: "${escapeStr(study.journal)}", year: ${study.year}, doi: ${study.doi ? `"${study.doi}"` : 'null'},
      studyDesign: "${escapeStr(study.studyDesign)}", sampleSize: ${study.sampleSize || 'null'}, duration: "${escapeStr(study.duration)}",
      methodologyQuality: ${study.methodologyQuality}, knowledgeLevel: "${study.knowledgeLevel}", gymLevel: "${study.gymLevel}", oberkategorie: "${escapeStr(study.oberkategorie)}",
      isFeatured: ${study.isFeatured}, isNew: ${study.isNew},
      abstract: \`${escapeStr(study.abstract)}\`,
      summaryBeginner: \`${escapeStr(study.summaryBeginner)}\`,
      summaryIntermediate: \`${escapeStr(study.summaryIntermediate)}\`,
      summaryAdvanced: \`${escapeStr(study.summaryAdvanced)}\`,
      keyFindings: \`${study.keyFindings}\`,
      practicalTakeaway: "${escapeStr(study.practicalTakeaway)}",
      categorySlug: "${study.categorySlug}", tags: [${tagsArray}]
    }`;
}

const allStudies = [];

for (const [fileName, categorySlug] of Object.entries(fileToCategory)) {
  const filePath = path.join(SWARM_DIR, fileName);
  if (!fs.existsSync(filePath)) {
    console.log(`Skipping ${fileName} (not found)`);
    continue;
  }
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  console.log(`Processing ${fileName}: ${data.length} studies`);
  
  for (let i = 0; i < data.length; i++) {
    try {
      const processed = processStudy(data[i], categorySlug, fileName);
      allStudies.push(processed);
    } catch (e) {
      console.error(`Error processing ${fileName} study ${i}:`, e.message);
    }
  }
}

console.log(`\nTotal studies: ${allStudies.length}`);

// Deduplicate by title
const seen = new Set();
const unique = [];
for (const s of allStudies) {
  if (!seen.has(s.title)) {
    seen.add(s.title);
    unique.push(s);
  }
}
console.log(`Unique studies: ${unique.length}`);

// Generate seed.ts
const studiesCode = unique.map((s, i) => studyToCode(s, i)).join(',\n');

const seedContent = `import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.chatMessage.deleteMany();
  await prisma.chatSession.deleteMany();
  await prisma.bookmark.deleteMany();
  await prisma.studyTag.deleteMany();
  await prisma.study.deleteMany();
  await prisma.tag.deleteMany();
  await prisma.collection.deleteMany();
  await prisma.gymLevel.deleteMany();
  await prisma.category.deleteMany();

  const categories = await prisma.\$transaction([
    prisma.category.create({ data: { slug: "resistance-training", name: "Resistance Training", description: "Hypertrophy, strength, programming, and exercise science", icon: "Dumbbell", color: "#0a0a0a", order: 1 } }),
    prisma.category.create({ data: { slug: "nutrition", name: "Nutrition", description: "Macros, meal timing, calories, and dietary strategies", icon: "Apple", color: "#16a34a", order: 2 } }),
    prisma.category.create({ data: { slug: "supplements", name: "Supplements", description: "Evidence-graded supplement analysis", icon: "Pill", color: "#3b82f6", order: 3 } }),
    prisma.category.create({ data: { slug: "recovery-health", name: "Recovery & Health", description: "Sleep, stress management, injury prevention, longevity", icon: "Moon", color: "#8b5cf6", order: 4 } }),
    prisma.category.create({ data: { slug: "peds", name: "PEDs & Harm Reduction", description: "Objective analysis of performance-enhancing drugs", icon: "ShieldAlert", color: "#dc2626", order: 5 } }),
    prisma.category.create({ data: { slug: "cardio", name: "Cardio & Conditioning", description: "Heart health, VO2 max, endurance protocols", icon: "Heart", color: "#f59e0b", order: 6 } }),
    prisma.category.create({ data: { slug: "biomechanics", name: "Biomechanics", description: "Form, range of motion, muscle activation patterns", icon: "Activity", color: "#06b6d4", order: 7 } }),
  ]);

  const catMap = Object.fromEntries(categories.map(c => [c.slug, c.id]));

  await prisma.\$transaction([
    prisma.gymLevel.create({ data: { slug: "beginner", name: "Beginner", description: "Just starting out. Learn the fundamentals of training, nutrition, and recovery.", color: "#16a34a", months: "0-6 months", order: 1, topics: JSON.stringify(["Form & Technique", "Basic Nutrition", "Sleep Basics", "Protein Intake", "Volume Basics"]) } }),
    prisma.gymLevel.create({ data: { slug: "intermediate", name: "Intermediate", description: "Building on foundations. Understand periodization, macros, and evidence-based programming.", color: "#3b82f6", months: "6-36 months", order: 2, topics: JSON.stringify(["Periodization", "Macro Tracking", "Supplements", "Recovery Methods", "Progressive Overload"]) } }),
    prisma.gymLevel.create({ data: { slug: "advanced", name: "Advanced", description: "Optimizing every variable. Deep dives into mechanisms, advanced techniques, and individualization.", color: "#f59e0b", months: "36-72 months", order: 3, topics: JSON.stringify(["Advanced Periodization", "Hormones", "PEDs Knowledge", "Injury Prevention", "Metabolic Adaptation"]) } }),
    prisma.gymLevel.create({ data: { slug: "expert", name: "Expert", description: "Cutting-edge science. Meta-analyses, mechanisms, and research methodology.", color: "#dc2626", months: "72+ months", order: 4, topics: JSON.stringify(["Research Methods", "Mechanisms", "Pharmacology", "Longevity", "Biohacking"]) } }),
  ]);

  await prisma.\$transaction([
    prisma.collection.create({ data: { slug: "protein-science", name: "Protein Science", description: "Everything you need to know about protein for muscle growth and health.", color: "#16a34a", isFeatured: true, studyIds: JSON.stringify(["protein-intake-muscle-gain-0"]) } }),
    prisma.collection.create({ data: { slug: "creatine-deep-dive", name: "Creatine Deep Dive", description: "The most researched supplement in sports nutrition.", color: "#3b82f6", isFeatured: true, studyIds: JSON.stringify(["creatine-supplementation-performance-0"]) } }),
    prisma.collection.create({ data: { slug: "training-volume", name: "Training Volume", description: "How much should you train? The dose-response relationship.", color: "#0a0a0a", isFeatured: true, studyIds: JSON.stringify(["training-volume-hypertrophy-0"]) } }),
    prisma.collection.create({ data: { slug: "sleep-recovery", name: "Sleep & Recovery", description: "The underrated pillars of progress.", color: "#8b5cf6", isFeatured: true, studyIds: JSON.stringify(["sleep-muscle-recovery-0"]) } }),
    prisma.collection.create({ data: { slug: "peds-explained", name: "PEDs Explained", description: "Objective, evidence-based analysis of performance-enhancing drugs.", color: "#dc2626", isFeatured: false, studyIds: JSON.stringify(["anabolic-steroids-muscle-gain-0"]) } }),
    prisma.collection.create({ data: { slug: "supplement-stack", name: "Supplement Stack", description: "The evidence hierarchy — what works, what's hype.", color: "#f59e0b", isFeatured: false, studyIds: JSON.stringify(["creatine-supplementation-performance-0"]) } }),
  ]);

  const studiesData = [
${studiesCode}
  ];

  for (const s of studiesData) {
    const tagNames = s.tags;
    const tags = await Promise.all(
      tagNames.map(async (name) => {
        const slug = name.toLowerCase().replace(/\\s+/g, "-");
        return prisma.tag.upsert({
          where: { slug },
          update: {},
          create: { slug, name },
        });
      })
    );

    await prisma.study.create({
      data: {
        slug: s.slug,
        pmid: s.pmid,
        title: s.title,
        authors: s.authors,
        journal: s.journal,
        year: s.year,
        doi: s.doi,
        abstract: s.abstract,
        summaryBeginner: s.summaryBeginner,
        summaryIntermediate: s.summaryIntermediate,
        summaryAdvanced: s.summaryAdvanced,
        keyFindings: s.keyFindings,
        practicalTakeaway: s.practicalTakeaway,
        methodologyQuality: s.methodologyQuality,
        studyDesign: s.studyDesign,
        sampleSize: s.sampleSize,
        duration: s.duration,
        knowledgeLevel: s.knowledgeLevel,
        gymLevel: s.gymLevel,
        oberkategorie: s.oberkategorie,
        isFeatured: s.isFeatured,
        isNew: s.isNew,
        categoryId: catMap[s.categorySlug],
        tags: { create: tags.map((t) => ({ tagId: t.id })) },
      },
    });
  }

  console.log(\`Seeded \${studiesData.length} studies successfully.\`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.\$disconnect(); });
`;

fs.writeFileSync('./prisma/seed.ts', seedContent);
console.log('\n✅ Generated prisma/seed.ts with ' + unique.length + ' studies');
