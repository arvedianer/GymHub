// Auto-generated + hand-edited guides data
// These are editorial-style educational articles based on the research compendiums.

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

export const guides: Guide[] = [
  {
    slug: "resistance-training",
    title: "The Science of Resistance Training",
    subtitle: "Volume, frequency, intensity — what actually drives muscle growth.",
    category: "Resistance Training",
    color: "#0a0a0a",
    icon: "Dumbbell",
    readTime: "14 min",
    summary: `Resistance training is the single most effective way to build muscle and strength. But walk into any gym and you'll hear a dozen conflicting theories: train to failure or leave reps in reserve? Heavy weights or light? Once a week or every day?

The good news: we have answers. Over the past two decades, researchers have run hundreds of studies and dozens of meta-analyses to figure out what actually matters. The short version: total weekly volume (sets × reps) is the main driver of muscle growth. Frequency is surprisingly flexible — hitting a muscle twice a week works about as well as three times, as long as total volume is matched. And while heavy loads build more strength, you can grow muscle with anything from 30% to 90% of your one-rep max, provided you train hard enough.

This guide breaks down the evidence on every major training variable — volume, frequency, intensity, rest periods, proximity to failure, periodization, and advanced techniques like blood-flow restriction — so you can build a program that actually works.`,
    keyTakeaways: [
      "Weekly volume is the primary driver of hypertrophy. 10–20 hard sets per muscle per week is the sweet spot for most lifters.",
      "Training frequency matters less than total volume. Hitting a muscle 1–3x per week produces similar growth if weekly sets are equal.",
      "You can build muscle with light weights (30% 1RM) or heavy weights (>80% 1RM). Load choice should match your goal: heavy for strength, moderate for hypertrophy.",
      "Rest 2–3 minutes between sets for compounds. Shorter rests compromise total work capacity and reduce gains.",
      "Train 0–3 reps from failure for hypertrophy. Going to failure isn't necessary and may increase fatigue without extra benefit.",
    ],
    recommendations: [
      "Beginners: 10–15 sets per muscle/week, 2–3 full-body sessions, 60–75% 1RM, 2–4 reps in reserve.",
      "Intermediate: 12–20 sets per muscle/week, upper/lower or PPL split, mix of moderate and heavy loads.",
      "Advanced: 15–25+ sets per muscle/week, periodized blocks, auto-regulate based on recovery.",
      "Rest 2–3 minutes on compounds, 1–2 minutes on isolation work.",
      "Prioritize progressive overload — add weight, reps, or sets over time.",
    ],
    sections: [
      {
        title: "Volume: The Master Variable",
        content: `If you only track one thing, track volume. Multiple meta-analyses — including Schoenfeld's 2017 dose-response analysis of 34 studies — show that each additional weekly set per muscle group produces measurable extra growth, up to a point.

The relationship isn't linear forever. There's a clear dose-response curve: <5 sets per week produces modest growth, 5–9 sets is better, and 10+ sets is where trained individuals see the best results. For most lifters, 12–20 weekly sets per muscle is the practical ceiling before diminishing returns kick in.

A common mistake is counting every set equally. A set of bench press counts for chest, front delts, and triceps — but mostly chest. Be honest about which muscle is the primary target, and count direct work accordingly.`,
      },
      {
        title: "Frequency: Flexible, Not Magic",
        content: `The bro-science debate of "bro split vs. full body" has been settled by science: it barely matters for hypertrophy. Schoenfeld's 2019 meta-analysis found no significant difference between training a muscle once, twice, or three times per week when total weekly volume was equated.

What frequency does affect is practical factors: session length, fatigue management, and technique practice. Hitting each muscle twice per week tends to be the sweet spot for most people — sessions aren't marathon-long, fatigue is distributed, and you get more frequent practice on movements.

Higher frequencies (3–4x per week) can be useful for lagging body parts or when using lower per-session volumes. Lower frequencies (1x per week) work fine if you can handle high session volumes without technique breakdown.`,
      },
      {
        title: "Intensity: Heavy vs. Light",
        content: `For decades, the gym dogma was simple: heavy weights build muscle, light weights don't. Then researchers started testing it. Schoenfeld's 2017 meta-analysis and Lopez's 2021 network meta-analysis both found that muscle growth is similar across a wide loading spectrum — from 30% to 90% of one-rep max — as long as sets are taken near failure.

Where load does matter is strength. Heavy loads (>80% 1RM, <6 reps) produce greater strength gains and neural adaptations. Light loads (30–50% 1RM, 20–30 reps) can build muscle but are less efficient and more metabolically taxing.

The practical sweet spot for most people is moderate loading: 60–80% 1RM, which corresponds to roughly 8–15 reps. This range balances mechanical tension, metabolic stress, and total volume while being joint-friendly enough to sustain long-term.`,
      },
      {
        title: "Rest Periods & Proximity to Failure",
        content: `Rest longer than you think. Schoenfeld's 2016 RCT showed that 3-minute rests produced nearly double the quad growth of 1-minute rests (13.3% vs. 6.9% muscle thickness increase). The mechanism is simple: longer rest preserves volume load across sets. When you're still breathing hard, you can't lift as much on set two, three, and four.

For big compound lifts, 2–3 minutes is the minimum. For isolation work, 1.5–2 minutes is usually enough. Very short rest (<60 seconds) only makes sense in specific metabolic conditioning contexts, not for muscle building.

Proximity to failure matters in the opposite direction: closer is better for hypertrophy. Robinson's 2024 meta-regression — the first continuous analysis on this topic — found that muscle growth improves as sets get closer to failure, while strength gains stay flat across a wide range. The sweet spot is 0–3 reps in reserve (RIR): hard enough to stimulate growth, not so hard that fatigue destroys the rest of your workout.`,
      },
      {
        title: "Periodization & Advanced Techniques",
        content: `Periodization models — linear, undulating, block — all produce similar outcomes when volume and intensity are matched. The specific scheme matters far less than actually following a plan and progressively overloading over time.

That said, some structure helps. Beginners can simply add weight to the bar every session. Intermediates benefit from weekly undulation (heavy, moderate, light days). Advanced lifters often use block periodization: hypertrophy blocks (higher volume, moderate load) followed by strength blocks (lower volume, higher load) followed by peaking (low volume, very high load).

Blood-flow restriction (BFR) training at 20–40% 1RM produces comparable hypertrophy to traditional training and is valuable for rehab, deloads, or when joint stress needs to be minimized. Eccentric training and very slow tempos don't show meaningful hypertrophy advantages over normal controlled lifting — include eccentrics because they're part of normal reps, not because they're magic.`,
      },
    ],
  },
  {
    slug: "nutrition",
    title: "Nutrition for Muscle & Performance",
    subtitle: "Protein, calories, and the myths that refuse to die.",
    category: "Nutrition",
    color: "#16a34a",
    icon: "Apple",
    readTime: "12 min",
    summary: `You can't out-train a bad diet — but you also don't need to micromanage every gram. The nutrition research over the past decade has been surprisingly consistent: eat enough protein, distribute it across the day, and match your calories to your goal. Everything else is fine-tuning.

The evidence supports a protein intake of roughly 1.6 g per kg of bodyweight per day for muscle growth, with up to 2.4–3.1 g/kg during aggressive fat loss to preserve lean mass. Carbohydrates fuel performance and recovery, especially for high-volume training. Fats should stay above a minimum threshold (around 0.5 g/kg) for hormonal health, but beyond that, the carb-fat split is largely personal preference.

Meal timing matters less than total daily intake. The "anabolic window" isn't 30 minutes — it's closer to several hours. What does matter is getting protein in before and after training, ideally spaced across 3–5 meals for optimal muscle protein synthesis.`,
    keyTakeaways: [
      "Protein: 1.6 g/kg/day for muscle growth. Up to 2.4–3.1 g/kg during fat loss phases.",
      "Total daily intake matters more than precise meal timing. The 'anabolic window' is wider than bro-science claims.",
      "Distribute protein across 3–5 meals. Each meal should contain 20–40 g of high-quality protein.",
      "Carbohydrates fuel performance and recovery. Don't go unnecessarily low-carb if you're training hard.",
      "Hydration and vitamin D status are underrated. Even mild dehydration (>2% body mass loss) impairs performance.",
    ],
    recommendations: [
      "Eat 3–5 protein-containing meals per day, each with 20–40 g protein.",
      "For muscle gain: maintain a modest caloric surplus of 300–500 kcal/day.",
      "For fat loss: maintain a moderate deficit of 300–500 kcal/day with higher protein (2.0–2.4 g/kg).",
      "Time your pre- and post-workout meals within 3–4 hours of training.",
      "Stay hydrated. Weigh yourself before and after training; drink 1.5× the weight lost.",
    ],
    sections: [
      {
        title: "Protein: The Non-Negotiable",
        content: `Protein is the only macronutrient you can't really substitute for building muscle. Meta-analyses consistently show that higher protein intakes produce more muscle gain during resistance training, with the effect plateauing around 1.6 g/kg/day for most people in a caloric surplus.

During fat loss, protein needs go up. When calories are restricted, your body becomes more likely to break down muscle for energy. Multiple studies show that increasing protein to 2.4–3.1 g/kg during a deficit helps preserve lean mass while losing fat. This isn't bro-science — it's been demonstrated in controlled trials.

The type matters somewhat. Whey protein has the best amino acid profile and fastest digestion, making it ideal post-workout. But total daily intake matters far more than timing or source. Meat, fish, eggs, dairy, legumes, and soy all work. Vegetarians and vegans should pay extra attention to leucine content, as plant proteins are generally lower in this key amino acid.`,
      },
      {
        title: "Calories: Surplus, Deficit, Maintenance",
        content: `To build muscle, you need energy. The body's priority hierarchy doesn't include "get jacked" — it includes survival, then activity, then repair. If you're not eating enough, muscle growth gets deprioritized.

A modest surplus of 300–500 kcal above maintenance is the sweet spot for lean gains. Larger surpluses produce more fat gain without proportionally more muscle. Beginners and people returning from a layoff can get away with a larger surplus because their bodies are primed for growth. Advanced lifters should stay closer to 300 kcal to minimize fat accumulation.

For fat loss, a moderate deficit of 300–500 kcal preserves muscle while stripping fat. Aggressive deficits (>750 kcal) increase muscle loss risk and tank performance. The slower you lose weight, the more muscle you keep — aim for 0.5–1% of bodyweight per week.`,
      },
      {
        title: "Carbs, Fats & Meal Timing",
        content: `Carbohydrates aren't evil — they're fuel. High-volume resistance training depletes muscle glycogen, and replenishing it improves performance in subsequent sessions. Low-carb diets can work for fat loss, but they're suboptimal for muscle gain and high-intensity performance.

Fats are essential for hormonal health. Dropping below roughly 0.5 g/kg for extended periods can suppress testosterone and other hormones. Beyond that minimum, the carb-fat ratio is mostly about preference and adherence. Some people feel better on higher carbs, others on higher fats.

Meal timing has been oversold. The research is clear: total daily intake matters far more than precise timing. That said, distributing protein across 3–5 meals is beneficial because muscle protein synthesis responds to each protein-containing meal. One massive protein bomb at dinner isn't as effective as the same total spread across the day. A protein-rich meal within a few hours before and after training is sensible, but don't stress if your schedule isn't perfect.`,
      },
      {
        title: "Supplements That Actually Matter",
        content: `Most supplements are marketing. A few have solid evidence:

Creatine monohydrate is the most researched sports supplement and consistently improves strength, power, and lean mass. It's safe, cheap, and effective for the vast majority of people. Standard dosing is 3–5 g daily; loading protocols (20 g/day for a week) speed saturation but aren't necessary.

Caffeine improves performance across virtually every metric: strength, endurance, power, and even skill-based sports. Dose: 3–6 mg/kg bodyweight, taken 30–60 minutes pre-workout.

Whey protein is convenient, not magical. It helps hit protein targets when whole food isn't practical. Casein before bed may provide a slow-release amino acid stream during sleep, though the practical benefit is small.

Vitamin D matters if you're deficient — which many people are, especially in winter or at northern latitudes. Correcting a deficiency improves muscle function, testosterone, and recovery.`,
      },
    ],
  },
  {
    slug: "supplements",
    title: "The Evidence-Based Guide to Supplements",
    subtitle: "What works, what doesn't, and why — from creatine to caffeine.",
    category: "Supplements",
    color: "#3b82f6",
    icon: "Pill",
    readTime: "15 min",
    summary: `The supplement industry is a minefield of overpromising and underdelivering. For every product with solid research, there are twenty backed by nothing more than marketing budget and influencer endorsements.

This guide cuts through the noise. We'll cover the supplements with genuine evidence — creatine, caffeine, whey protein, beta-alanine — and the ones that are oversold or outright worthless. The criteria is simple: multiple peer-reviewed studies, ideally meta-analyses, showing consistent effects in humans.

The big three — creatine, caffeine, and protein — are genuinely effective. Beta-alanine helps for specific types of exercise. Most everything else falls into "maybe, but the evidence is thin" or "no evidence at all." We'll tell you which is which.`,
    keyTakeaways: [
      "Creatine monohydrate is the most effective sports supplement. 3–5 g/day, every day. Safe and well-researched.",
      "Caffeine is a reliable performance enhancer for strength, endurance, and power. 3–6 mg/kg, 30–60 min pre-workout.",
      "Whey protein is convenient but not magical. It helps hit protein targets when whole food isn't practical.",
      "Beta-alanine helps for high-intensity efforts lasting 0.5–10 minutes. Needs 2–4 weeks of daily use to saturate.",
      "Most 'advanced' forms of creatine (ethyl ester, HCL, buffered) show no advantage over standard monohydrate.",
    ],
    recommendations: [
      "Creatine: 3–5 g daily, any time of day. Loading optional.",
      "Caffeine: 3–6 mg/kg bodyweight, 30–60 minutes before training. Avoid late-day use.",
      "Protein powder: Use when whole food isn't convenient. Whey for speed, casein for sustained release.",
      "Beta-alanine: 4–6 g/day, divided doses to minimize tingling. Give it 2–4 weeks.",
      "Vitamin D: Test levels. Supplement only if deficient or during winter months.",
    ],
    sections: [
      {
        title: "Creatine: The Gold Standard",
        content: `Creatine monohydrate is the most researched sports supplement in existence, with hundreds of studies and multiple meta-analyses confirming its efficacy. It works by increasing phosphocreatine stores in muscle, which helps regenerate ATP during high-intensity efforts. The result: more reps, more weight, more muscle over time.

The evidence is overwhelming. Meta-analyses show consistent improvements in strength, power output, and lean body mass. A 2024 meta-analysis of 23 studies found that creatine + resistance training increased upper-body strength by 4.4 kg and lower-body strength by 11.4 kg compared to placebo.

Dosing is simple: 3–5 g per day, every day. Loading protocols (20 g/day for 5–7 days) saturate stores faster but aren't necessary — you'll reach full saturation in about a month at 3–5 g/day either way. Timing doesn't matter; take it whenever you'll remember.

Safety concerns are overblown. Decades of research show no kidney or liver damage in healthy individuals at recommended doses. The only common side effect is slight water weight gain (1–2 kg) as creatine pulls water into muscle cells — which is actually beneficial for muscle function.`,
      },
      {
        title: "Caffeine: The Most Reliable Ergogenic",
        content: `Caffeine is one of the few substances that improves performance across virtually every physical metric. The ISSN's 2021 position stand concluded that caffeine enhances muscular endurance, movement velocity, strength, sprinting, jumping, and both aerobic and anaerobic performance.

The sweet spot is 3–6 mg per kg of bodyweight, taken 30–60 minutes before exercise. For a 75 kg person, that's 225–450 mg — roughly 2–4 cups of coffee. Benefits are dose-dependent up to about 6 mg/kg; beyond that, side effects increase without additional performance gains.

Caffeine works through multiple mechanisms: blocking adenosine receptors (reducing perceived fatigue), increasing calcium release in muscle, and enhancing motor unit recruitment. Genetic variation in CYP1A2 metabolism means some people are "fast metabolizers" who get bigger benefits, while "slow metabolizers" may experience more side effects at lower doses.

Habitual users don't lose the benefits — you don't need to cycle off caffeine to maintain its effects. However, if you're a slow metabolizer or train in the evening, lower doses or earlier timing may be necessary to avoid sleep disruption.`,
      },
      {
        title: "Protein Powder: Convenience, Not Magic",
        content: `Whey protein is the most bioavailable and leucine-rich protein source available, which makes it ideal for post-workout consumption when you want rapid amino acid delivery. But it's not magic — it's just a convenient way to hit your protein targets.

The research on protein timing has shifted. Early studies suggested a narrow "anabolic window" post-workout; newer evidence shows the window is much wider — several hours before and after training. Total daily protein intake matters far more than timing.

Whey comes in three main forms: concentrate (cheapest, slightly more lactose and fat), isolate (more pure, lower lactose, better for sensitive stomachs), and hydrolysate (pre-digested, fastest absorption, most expensive). For most people, concentrate is fine. Isolate is worth the upgrade if you're lactose intolerant. Hydrolysate isn't worth the premium for most.

Casein protein digests slowly over 6–8 hours, making it popular before bed. The theory is that sustained amino acid release during sleep supports recovery. The evidence is mixed — some studies show small benefits, others show none. It's not necessary, but if you enjoy a protein shake before bed, it won't hurt.`,
      },
      {
        title: "Beta-Alanine, Citrulline & The Rest",
        content: `Beta-alanine increases muscle carnosine levels, which helps buffer acid during high-intensity exercise. Meta-analyses show a small but consistent benefit for exercise lasting 0.5–10 minutes — think interval training, rowing, or high-rep sets. The standard dose is 4–6 g per day, but the tingling sensation (paresthesia) can be unpleasant. Splitting into smaller doses or using a sustained-release formulation helps.

Citrulline malate is often marketed as a "pump" supplement. The evidence is weaker than for creatine or caffeine — some studies show small benefits for muscular endurance and reduced fatigue, but results are inconsistent. If you want to try it, dose 6–8 g about an hour pre-workout.

Pre-workout blends are mostly caffeine with marketing. They're not inherently bad, but you're often paying premium prices for ingredients with thin evidence. If you like the energy and focus from a pre-workout, just know that the active ingredient is almost certainly caffeine.

What doesn't work: testosterone boosters (D-aspartic acid, tribulus, fenugreek), BCAAs (redundant if you eat enough protein), glutamine (muscle levels are already saturated), and fat burners (minimal effect, often just caffeine and yohimbine). Save your money.`,
      },
    ],
  },
  {
    slug: "steroids",
    title: "Anabolic Steroids: The Real Evidence",
    subtitle: "Testosterone, health risks, TRT vs. abuse — what the research actually shows.",
    category: "PEDs & Harm Reduction",
    color: "#dc2626",
    icon: "ShieldAlert",
    readTime: "16 min",
    summary: `Anabolic-androgenic steroids (AAS) are the most effective muscle-building drugs ever discovered. They're also among the most misunderstood. The public conversation swings between two extremes: "steroids will kill you instantly" and "they're completely safe if you know what you're doing." The truth, as always, is in the middle — and it's dose-dependent.

The scientific literature reveals a sharp contrast between therapeutic testosterone replacement therapy (TRT) in hypogonadal men and supraphysiological AAS abuse. Major meta-analyses and large RCTs, including the landmark TRAVERSE study with 5,198 participants, show no increased cardiovascular risk from medically supervised TRT. Meanwhile, observational studies of AAS abusers show substantially elevated mortality, cardiovascular disease, liver damage, and persistent hypogonadism.

The difference is dose and context. This guide presents the evidence on both sides — the benefits, the risks, and the critical distinction between medical use and abuse.`,
    keyTakeaways: [
      "Testosterone's anabolic effects are dose-dependent. Even 'low' TRT doses (125 mg/week) produce significant muscle gains vs. placebo.",
      "Medically supervised TRT shows no increased cardiovascular risk in hypogonadal men (TRAVERSE study, n=5,198).",
      "Supraphysiological AAS abuse is associated with 2.8× higher mortality, cardiovascular disease, and liver/kidney damage.",
      "Hypogonadism can persist for years after AAS cessation. Some users never fully recover natural production.",
      "Oral steroids carry unique hepatotoxicity risks. Injectable routes bypass first-pass liver metabolism.",
    ],
    recommendations: [
      "If considering TRT, work with an endocrinologist. Get baseline labs (total T, free T, SHBG, estradiol, CBC, lipids, PSA).",
      "Monitor hematocrit — TRT can increase red blood cell count, raising clot risk.",
      "Avoid oral 17α-alkylated steroids unless medically necessary — they stress the liver.",
      "Never combine multiple hepatotoxic compounds. Never drink alcohol while on orals.",
      "If you've used AAS and have symptoms of hypogonadism, see a doctor. Recovery is possible but not guaranteed.",
    ],
    sections: [
      {
        title: "The Dose-Response Relationship",
        content: `Bhasin's landmark 2001 study randomized 61 healthy young men to 25, 50, 125, 300, or 600 mg of testosterone enanthate weekly for 20 weeks. The results were striking: fat-free mass increased dose-dependently from +3.4 kg (125 mg) to +5.2 kg (300 mg) to +7.9 kg (600 mg). Even the lowest dose, which sits at the upper end of typical TRT ranges, produced significant gains compared to placebo.

This study established two critical facts. First, testosterone's anabolic effects scale with dose — there is no threshold below which nothing happens. Second, even therapeutic-range doses produce measurable muscle growth in healthy men, though the effect is smaller than at supraphysiological levels.

What the study also showed: HDL cholesterol dropped and fat mass decreased with higher doses. The 600 mg group saw significant lipid deterioration. This trade-off — more muscle, worse health markers — is the central tension of AAS use.`,
      },
      {
        title: "TRT vs. Abuse: A Critical Distinction",
        content: `Testosterone replacement therapy and AAS abuse are not the same thing, and conflating them leads to bad policy and bad health decisions.

TRT restores testosterone to normal physiological ranges in men with hypogonadism. The TRAVERSE study — a randomized, placebo-controlled trial of 5,198 men — found that testosterone gel was non-inferior to placebo for major adverse cardiac events over a median 22 months. This is the highest-quality evidence we have, and it contradicts earlier observational studies that suggested cardiovascular harm.

AAS abuse involves supraphysiological doses, often stacked with multiple compounds, and frequently includes oral steroids that stress the liver. Observational studies of this population show a very different risk profile: 2.81× higher all-cause mortality, elevated rates of cardiovascular disease, liver damage, kidney injury, and persistent hypogonadism after cessation.

The dose makes the poison. TRT under medical supervision appears safe for cardiovascular outcomes in hypogonadal men. Supraphysiological abuse carries substantial, well-documented risks.`,
      },
      {
        title: "The Health Risks Nobody Talks About",
        content: `Beyond the commonly discussed risks — acne, gynecomastia, hair loss — AAS abuse carries serious but less visible dangers.

Cardiovascular disease is the big one. AAS use elevates LDL, lowers HDL, increases hematocrit, and causes left ventricular hypertrophy. Case-control studies show significantly higher rates of myocardial infarction and stroke in AAS users compared to age-matched controls, even after controlling for other risk factors.

Liver damage is primarily an oral steroid problem. The 17α-alkylation that allows oral steroids to survive first-pass liver metabolism also makes them hepatotoxic. Injectable routes bypass this, but orals — especially when stacked or combined with alcohol — can cause cholestasis, peliosis hepatis, and in rare cases, liver tumors.

Persistent hypogonadism is the risk that keeps on giving. The HPTA (hypothalamic-pituitary-testicular axis) can take months or years to recover after AAS cessation. Some users never fully recover, leaving them dependent on TRT for life. Post-cycle therapy (PCT) with drugs like clomiphene or hCG helps, but recovery is not guaranteed — especially after long or high-dose cycles.`,
      },
      {
        title: "Harm Reduction If You Use",
        content: `If you're going to use despite the risks — and many people will — harm reduction is better than ignorance.

Get comprehensive blood work before, during, and after: total testosterone, free testosterone, SHBG, estradiol, CBC (watch hematocrit), liver enzymes, lipids, and PSA. Know your baseline so you can spot problems early.

Avoid oral-only cycles. The hepatotoxicity of orals is real and cumulative. If you must use orals, keep cycles short (4–6 weeks) and avoid alcohol completely.

Don't stack multiple compounds unnecessarily. More drugs don't produce proportionally more muscle, but they do produce more side effects. One well-chosen compound at a moderate dose is safer and often just as effective as a complex stack.

Have a PCT plan before you start. Clomiphene, tamoxifen, and hCG are the standard options. Know how to use them, and have them on hand before you need them. Better yet, work with a doctor who understands AAS use — they exist, even if they're hard to find.`,
      },
    ],
  },
  {
    slug: "sarms",
    title: "SARMs: Hype vs. Evidence",
    subtitle: "Selective Androgen Receptor Modulators — what the clinical data actually shows.",
    category: "PEDs & Harm Reduction",
    color: "#dc2626",
    icon: "ShieldAlert",
    readTime: "13 min",
    summary: `Selective Androgen Receptor Modulators (SARMs) are often marketed as "steroids without the side effects." The reality is more nuanced — and less impressive.

SARMs do bind to androgen receptors and produce anabolic effects, but the selectivity is overstated. Early clinical trials showed dose-dependent muscle and strength gains, but also dose-dependent suppression of natural testosterone production, elevated liver enzymes, and lipid disturbances. The side effect profile is different from steroids, not absent.

The big problem: almost no SARMs have completed Phase III clinical trials. Most research stopped at Phase II or earlier. What exists in the grey market is unregulated, often mislabeled, and frequently contaminated. This guide covers the clinical data on Ostarine, LGD-4033, RAD-140, and S4 — what worked, what didn't, and what the research community learned from the trials that did run.`,
    keyTakeaways: [
      "SARMs produce dose-dependent muscle and strength gains in clinical trials, but effects are smaller than steroids.",
      "Testosterone suppression is real and dose-dependent. Even 'mild' SARMs like Ostarine suppress LH and FSH.",
      "Lipid disturbances (lower HDL, higher LDL) occur with most SARMs. Cardiovascular risk is not eliminated.",
      "Grey-market SARMs are unregulated, frequently misdosed, and sometimes contaminated with actual steroids or prohormones.",
      "No SARM has completed Phase III trials or received FDA approval for muscle-wasting conditions.",
    ],
    recommendations: [
      "If you use SARMs, get blood work: total T, free T, LH, FSH, lipids, liver enzymes.",
      "Plan for suppression. Have a PCT protocol ready before you start.",
      "Avoid stacking multiple SARMs — side effects compound without proportional benefit.",
      "Don't trust labels. Third-party testing (COAs) can be faked; buy from sources with independent lab verification.",
      "Understand that long-term safety data does not exist. You're participating in an uncontrolled experiment.",
    ],
    sections: [
      {
        title: "How SARMs Actually Work",
        content: `SARMs bind to androgen receptors in muscle and bone tissue, activating the same anabolic pathways as testosterone but with different tissue selectivity. The theory was that this selectivity would produce muscle growth without the androgenic side effects of steroids — prostate enlargement, hair loss, acne, and virilization in women.

In practice, the selectivity is partial, not absolute. SARMs do show preferential binding to muscle over prostate tissue in animal models, but in humans, they still affect the HPTA (hypothalamic-pituitary-testicular axis), liver enzymes, and lipid profiles. The side effects are different in character and magnitude, but they're not absent.

The mechanism is similar to testosterone in muscle: increased protein synthesis, satellite cell activation, and myonuclear addition. But SARMs are partial agonists — they activate the androgen receptor less fully than testosterone. This is why, dose-for-dose, SARMs produce less muscle growth than traditional AAS.`,
      },
      {
        title: "What the Clinical Trials Show",
        content: `Ostarine (MK-2866) is the most studied SARM. In a Phase II trial for cancer cachexia, 3 mg/day produced 1.3 kg of lean mass gain over 16 weeks — better than placebo, but modest. Higher doses (9 mg) produced more muscle but also more suppression.

LGD-4033 showed dose-dependent gains of 1.2–1.6 kg lean mass over 21 days at 0.1–1 mg/day. Notably, even the lowest dose suppressed total testosterone by 30–40%. HDL dropped by 20–30% at all doses.

RAD-140 produced 2.5–3 kg lean mass gains in a small Phase I trial, but also caused significant ALT elevation in one participant and lipid disturbances across the board.

S4 (Andarine) is barely studied in humans. Most data comes from animal studies. What little human data exists suggests vision side effects (yellow tint, night blindness) due to off-target binding in the retina — a reminder that "selective" is relative.

The overarching pattern: SARMs work for muscle growth, but the effect sizes are smaller than steroids, and the side effects — while different — are real and dose-dependent.`,
      },
      {
        title: "The Grey Market Problem",
        content: `Because no SARM has FDA approval, everything sold online is technically a "research chemical" — not for human consumption. This creates a regulatory vacuum with serious consequences for consumers.

A 2017 study by the Journal of the American Medical Association analyzed 44 products sold as SARMs online. Only 52% contained the labeled compound. 39% contained a different SARM than advertised. 9% contained no active SARM at all. 25% contained unlabeled substances including steroids and prohormones.

Even when the label is accurate, dosing is unreliable. One vial might contain 10 mg/mL, the next 25 mg/mL. Without pharmaceutical manufacturing standards, variance is inevitable. Some users accidentally take 2–3× their intended dose and wonder why their liver enzymes skyrocket.

Certificate of Analysis (COA) documents are often cited as proof of quality, but these can be faked or bought. Independent third-party testing by organizations like Labdoor or ConsumerLab is more reliable, but most SARM vendors don't submit to it.`,
      },
    ],
  },
  {
    slug: "peptides",
    title: "Peptides: Research Chemicals or Medicine?",
    subtitle: "GHRPs, BPC-157, TB-500 — the evidence, the hype, and the gaps.",
    category: "PEDs & Harm Reduction",
    color: "#dc2626",
    icon: "ShieldAlert",
    readTime: "12 min",
    summary: `Peptides occupy a strange space in fitness culture. They're sold as "research chemicals" alongside SARMs and nootropics, yet some were originally developed as legitimate pharmaceutical candidates. The evidence ranges from promising human trials to nothing but rat studies — and knowing which is which matters.

Growth hormone-releasing peptides (GHRPs) like Ipamorelin and CJC-1295 do increase GH and IGF-1 in humans, but long-term safety data is absent. BPC-157 shows remarkable healing effects in animal models but has never been tested in a human clinical trial. TB-500 is even less studied.

The FDA has placed most performance-enhancing peptides in "Category 2" — substances that should not be compounded by pharmacies due to insufficient safety data. WADA prohibits them in competition. This guide separates the limited human evidence from the animal hype.`,
    keyTakeaways: [
      "GHRPs (Ipamorelin, CJC-1295) increase GH and IGF-1 in human trials, but long-term safety data does not exist.",
      "BPC-157 shows remarkable healing in animal models but has zero human clinical trials.",
      "Most peptides are WADA-prohibited and FDA Category 2 (banned from compounding).",
      "The 'research chemical' market is unregulated. Purity, dosing, and sterility are not guaranteed.",
      "Peptides sold online are often mislabeled or contaminated, like the SARM market.",
    ],
    recommendations: [
      "If considering GHRPs, understand the long-term safety is unknown. Short-term human data is limited to Phase I/II trials.",
      "Don't rely on BPC-157 for injury healing — the evidence is exclusively from rodents and in-vitro studies.",
      "If competing, avoid all peptides. WADA testing can detect GHRPs and their metabolites.",
      "Injectable peptides carry infection risk if not prepared sterile. The grey market does not guarantee sterility.",
      "Work with a physician if you're interested in peptide therapies. Compounding pharmacies operating legally can provide oversight.",
    ],
    sections: [
      {
        title: "GHRPs: Real Effects, Unknown Long-Term Safety",
        content: `Growth hormone-releasing peptides stimulate the pituitary to release GH through a different mechanism than GHRH. Ipamorelin, the most studied GHRP, has human pharmacokinetic data showing dose-dependent GH release peaking at ~40 minutes post-injection, with a half-life of about 2 hours.

CJC-1295 is a modified GHRH analog with a much longer half-life (5–8 days). A Phase I trial showed that single injections increased mean plasma GH 2–10 fold for 6+ days and elevated IGF-1 for 9–11 days. Multiple doses produced cumulative effects.

What we don't know: long-term effects on pituitary function, cancer risk (IGF-1 is mitogenic), glucose metabolism, and cardiac remodeling. The FDA placed CJC-1295 in Category 2 due to insufficient safety data and theoretical immunogenicity concerns. All human studies were short-term and small.

The practical reality: GHRPs produce measurable acute hormonal changes, but whether those translate to meaningful body composition improvements over months or years is unknown. And the side effect profile over long-term use is a complete blank.`,
      },
      {
        title: "BPC-157 & TB-500: The Animal Data Trap",
        content: `BPC-157 is the most hyped peptide in the injury-recovery space. It shows remarkable effects in rat studies: accelerated tendon healing, gastric ulcer repair, bone fracture healing, and even spinal cord injury recovery. The mechanism appears to involve angiogenesis (new blood vessel formation) and upregulation of growth factors.

The problem: zero human clinical trials. Not a single RCT. Not even a case series. Every claim about BPC-157 in humans is extrapolated from rodents, and rodents metabolize peptides very differently from humans.

TB-500 (thymosin beta-4) is in a similar boat. It promotes cell migration and angiogenesis in vitro and in animal models, but human data for musculoskeletal injury is limited to anecdotal reports and a few poorly controlled studies.

This doesn't mean these peptides don't work in humans. It means we don't know. The absence of evidence is not evidence of absence — but it's also not a reason to inject yourself with an unregulated substance based on rat data.`,
      },
      {
        title: "Regulatory Status & Risks",
        content: `The FDA's Category 2 designation means compounding pharmacies are not supposed to prepare these peptides for human use. Some still do, operating in a legal grey area. But many peptides sold online are manufactured in unregulated facilities with no quality control.

WADA prohibits GHRPs, GHRH analogs, and most other performance-enhancing peptides in competition. Detection methods exist for many of them, and metabolites can linger for days to weeks depending on the compound.

Infection risk is real. Peptides are typically supplied as lyophilized powder that must be reconstituted with bacteriostatic water and injected subcutaneously or intramuscularly. Grey-market suppliers don't guarantee sterility, and users without medical training may compromise aseptic technique. Abscesses, infections, and sepsis have been reported.

The bottom line: peptides are not inherently evil, but the evidence base is thin and the regulatory environment is hostile. If you're tempted, understand that you're operating without a safety net.`,
      },
    ],
  },
  {
    slug: "recovery",
    title: "Recovery, Sleep & Overtraining",
    subtitle: "You don't get stronger in the gym. You get stronger while you sleep.",
    category: "Recovery & Health",
    color: "#8b5cf6",
    icon: "Moon",
    readTime: "11 min",
    summary: `Training is the stimulus. Recovery is where adaptation happens. Yet recovery is the most neglected variable in most training programs — partially because it's harder to measure than reps and sets, and partially because the fitness industry sells exertion, not rest.

The evidence on recovery is surprisingly consistent: sleep is the single most important recovery tool. Adults who sleep less than 7 hours show impaired muscle protein synthesis, reduced testosterone, elevated cortisol, and worse performance outcomes. Eight hours appears to be the threshold for optimal recovery in trained individuals.

Beyond sleep, the evidence for most recovery modalities is weaker than marketing suggests. Massage and foam rolling reduce perceived soreness but don't accelerate muscle repair. Cold water immersion reduces inflammation but may also blunt hypertrophy signals. Compression garments and electrical stimulation show minimal objective benefits. This guide separates what works from what feels good.`,
    keyTakeaways: [
      "Sleep is the most important recovery tool. Less than 7 hours impairs muscle protein synthesis and hormonal health.",
      "Overtraining syndrome (OTS) is a diagnosis of exclusion — no single biomarker can detect it reliably.",
      "Cold water immersion reduces soreness but may blunt hypertrophy when used immediately post-workout.",
      "Massage and foam rolling reduce perceived soreness (DOMS) but don't accelerate actual muscle repair.",
      "Active recovery (light movement) outperforms passive rest for reducing muscle soreness and restoring range of motion.",
    ],
    recommendations: [
      "Aim for 7–9 hours of sleep per night. Consistency matters more than exact duration.",
      "Keep your bedroom cool (18–20°C), dark, and quiet. Limit screens 1 hour before bed.",
      "Use cold therapy strategically — not immediately after hypertrophy-focused sessions if maximum growth is the goal.",
      "Schedule deload weeks every 4–8 weeks, or auto-regulate based on performance and subjective readiness.",
      "Track recovery markers: morning heart rate, HRV trends, sleep quality, and subjective energy levels.",
    ],
    sections: [
      {
        title: "Sleep: The Foundation of Everything",
        content: `Sleep isn't passive downtime — it's active repair. During deep sleep, growth hormone pulses peak, muscle protein synthesis is upregulated, and the glymphatic system clears metabolic waste from the brain. Shortchange sleep and you shortchange all of it.

Multiple studies show that sleep restriction (<6 hours) reduces muscle protein synthesis, increases cortisol, and impairs glucose tolerance. In one study, men who slept 5.5 hours per night lost 55% less fat and 60% more muscle during a caloric deficit compared to those sleeping 8.5 hours — despite eating the same calories.

For athletes and lifters, 8 hours appears to be the minimum for optimal recovery. Some individuals may need 9+, especially during high-volume blocks. The key is consistency: sleeping 6 hours during the week and 10 on weekends doesn't fully compensate for the deficit.

Practical sleep hygiene: keep a regular schedule, make the bedroom cool (18–20°C) and dark, avoid screens 60 minutes before bed, limit caffeine after 2 PM, and avoid heavy meals within 2 hours of sleep. Melatonin (0.3–1 mg) can help with sleep onset but doesn't improve sleep quality. Magnesium glycinate (200–400 mg) may help with sleep depth, especially in people with low dietary magnesium.`,
      },
      {
        title: "Overtraining: Real, But Rare",
        content: `Overtraining syndrome (OTS) is real, but it's not what most people think. Feeling tired after a hard week isn't OTS. OTS is a months-long state of persistent performance decline, chronic fatigue, mood disturbance, and hormonal dysregulation that doesn't resolve with a few days of rest.

The EROS study evaluated 117 potential biomarkers and found that none could individually diagnose OTS. HRV, cortisol, testosterone, inflammatory markers, and sleep quality all show abnormalities in overtrained athletes, but none are specific enough to distinguish OTS from normal fatigue, illness, or life stress.

What does work is monitoring trends over time. A single low HRV reading means nothing. But HRV trending down for 2+ weeks, combined with declining performance, poor sleep, and low motivation, is a warning signal. The solution is usually not more supplements or recovery modalities — it's simply less training volume and intensity for a period.

Functional overreaching (planned overreaching followed by recovery) is a legitimate training strategy used by elite athletes. Non-functional overreaching (too much, too long, without recovery) leads to OTS. The difference is intention and monitoring.`,
      },
      {
        title: "Recovery Modalities: What Actually Works",
        content: `Cold water immersion (ice baths) is the most studied recovery modality, and the results are mixed. It reliably reduces perceived muscle soreness and markers of inflammation — but that inflammation is part of the hypertrophy signaling cascade. Multiple studies show that regular cold immersion immediately post-workout may blunt muscle growth compared to active recovery or passive rest.

The practical takeaway: use cold therapy strategically. If you're in a strength/hypertrophy phase, skip the ice bath immediately after training. If you're in a peaking phase, dealing with acute soreness, or training twice daily, cold immersion can help you feel better and perform in the next session. Just don't make it a daily post-workout ritual during growth phases.

Massage and foam rolling reduce DOMS (delayed onset muscle soreness) and improve perceived recovery, but they don't accelerate actual muscle repair. The mechanism is likely neurological — stimulating pressure receptors reduces pain signaling — rather than mechanical breakdown of scar tissue.

Compression garments show minimal objective benefits in controlled trials. They may reduce perceived fatigue during long sessions, but they don't enhance recovery markers post-training. Electrical stimulation (NMES/EMS) similarly shows small, inconsistent effects.

Active recovery — light walking, cycling, or swimming — outperforms passive rest for reducing muscle soreness and restoring range of motion. Blood flow helps clear metabolic byproducts without adding significant training stress. A 20-minute walk on rest days is one of the simplest and most effective recovery tools.`,
      },
    ],
  },
  {
    slug: "cardio",
    title: "Cardio, Heart Health & VO₂ Max",
    subtitle: "Why even strength athletes should care about their cardiovascular fitness.",
    category: "Cardio & Conditioning",
    color: "#f59e0b",
    icon: "Heart",
    readTime: "11 min",
    summary: `Cardio has a marketing problem in the strength community. It's associated with skinny endurance runners and "cardio kills gains" memes. But the data tells a different story: cardiovascular fitness is one of the strongest predictors of longevity, and it doesn't have to come at the expense of muscle.

VO₂ max — the maximum rate at which your body can consume oxygen — is a better predictor of all-cause mortality than smoking, diabetes, or hypertension. Meta-analyses show that each 1 MET (metabolic equivalent) increase in cardiorespiratory fitness is associated with a 13–15% reduction in mortality risk. The difference between "elite" and "below average" fitness is staggering: a 5-fold difference in mortality risk in some studies.

The good news for lifters: you don't need to become a runner. Two to three sessions per week of moderate-intensity cardio (cycling, rowing, incline walking) is enough to see meaningful improvements in VO₂ max and heart health without interfering with strength gains.`,
    keyTakeaways: [
      "VO₂ max is one of the strongest predictors of longevity — stronger than smoking, diabetes, or blood pressure.",
      "Each 1 MET increase in fitness reduces mortality risk by 13–15%. Elite fitness = ~5× lower mortality vs. low fitness.",
      "Moderate cardio (2–3x/week) improves heart health without interfering with strength or hypertrophy.",
      "High-intensity interval training (HIIT) produces larger VO₂ max improvements per minute than steady-state cardio.",
      "Exercise reduces blood pressure by 5–7 mmHg on average — comparable to first-line medications.",
    ],
    recommendations: [
      "Do 2–3 cardio sessions per week, 20–40 minutes each. Cycling and rowing are joint-friendly options.",
      "Keep intensity moderate (RPE 5–6/10, conversational pace) to minimize interference with strength training.",
      "If time-constrained, use HIIT: 4–6 rounds of 4 minutes hard / 3 minutes easy produces excellent VO₂ max gains.",
      "Separate cardio and lifting by 6+ hours if possible. If not, do cardio after lifting, not before.",
      "Track your resting heart rate. A downward trend over months indicates improving cardiovascular fitness.",
    ],
    sections: [
      {
        title: "VO₂ Max: The Numbers That Matter",
        content: `VO₂ max is often described as "how big your engine is." It's the maximum volume of oxygen your body can use during exercise, measured in milliliters per kilogram per minute. And it's one of the most powerful health markers we have.

A landmark meta-analysis by Kodama et al. analyzed 33 studies and over 100,000 participants. The finding: every 1 MET (roughly 3.5 mL/kg/min) increase in cardiorespiratory fitness reduced all-cause mortality by 13%. The difference between the fittest and least fit quintiles was a 2.5× reduction in mortality risk.

Subsequent studies with larger cohorts have found even starker differences. In one analysis of over 122,000 patients, elite cardiorespiratory fitness was associated with a 5-fold lower mortality risk compared to below-average fitness. This association held across all age groups and was stronger than traditional risk factors like smoking, diabetes, and hypertension.

For reference, average VO₂ max for sedentary men in their 30s is around 35–40 mL/kg/min. Trained lifters who don't do cardio are often in the 40–45 range. Adding 2–3 cardio sessions per week can push this to 50+ within a few months. That's not elite endurance territory, but it's enough to move you into a significantly lower mortality risk category.`,
      },
      {
        title: "Cardio & Strength: The Interference Myth",
        content: `The "concurrent training interference effect" — the idea that cardio kills strength gains — is real but wildly overstated. Early studies showed that combining heavy endurance and strength training produced smaller strength gains than strength training alone. But those studies used high volumes of both, often in the same session.

More recent research paints a nuanced picture. Moderate cardio (2–3 sessions per week, 20–40 minutes, moderate intensity) does not significantly impair strength or hypertrophy when total training volume is managed. The interference effect primarily appears when:

1. Cardio volume is very high (>4–5 sessions per week, 45+ minutes)
2. Cardio intensity is very high (sprinting, high-intensity intervals done frequently)
3. Cardio and lifting are done in the same session, especially with cardio first
4. Recovery is inadequate (poor sleep, low calories, high life stress)

For most lifters, the solution is simple: do cardio after lifting or on separate days. Keep it moderate. Cycling, rowing, and incline walking are lower-impact than running and produce less muscle damage. If you must do both in the same session, lift first — the neural fatigue from heavy squats won't ruin a bike ride, but a hard run will compromise your squat session.`,
      },
      {
        title: "Blood Pressure & Heart Structure",
        content: `Resistance training alone doesn't improve cardiovascular health markers as much as people assume. While lifting does produce some blood pressure reduction and modest improvements in lipid profiles, the effects are smaller than with aerobic exercise.

A 2024 network meta-analysis of exercise and blood pressure found that all forms of exercise reduce blood pressure, but isometric exercise (wall sits, planks) and aerobic exercise produced the largest reductions — around 5–7 mmHg systolic on average. That's comparable to first-line antihypertensive medications.

For heart structure, the type of training matters. Endurance athletes develop "eccentric hypertrophy" — larger ventricular cavities with normal wall thickness. Strength athletes develop "concentric hypertrophy" — thicker ventricular walls with normal cavity size. Both are generally benign adaptations, though extreme strength training can occasionally produce borderline pathological wall thickening.

The key takeaway: don't rely on lifting alone for heart health. Two to three cardio sessions per week provides cardiovascular benefits that lifting can't match, and the "interference" at that volume is negligible for anyone not competing at an elite level in either discipline.`,
      },
    ],
  },
  {
    slug: "hormones",
    title: "Hormones, Metabolism & Longevity",
    subtitle: "How exercise reshapes your hormones — and why it matters.",
    category: "PEDs & Harm Reduction",
    color: "#06b6d4",
    icon: "Activity",
    readTime: "10 min",
    summary: `Exercise doesn't just build muscle — it reshapes your entire hormonal landscape. Acute resistance training spikes testosterone, growth hormone, and cortisol. Chronic training improves insulin sensitivity, reduces chronic inflammation, and may even slow biological aging at the epigenetic level.

But the hormonal response to exercise is widely misunderstood. The post-workout testosterone spike is transient and doesn't directly correlate with muscle growth. What matters more is the chronic adaptation: resistance-trained individuals have better insulin sensitivity, healthier cortisol patterns, and more favorable testosterone-to-cortisol ratios than sedentary people.

Perhaps most intriguingly, exercise appears to reverse biological aging. Studies using DNA methylation clocks ("epigenetic clocks") show that regular physical activity is associated with epigenetic ages 5–8 years younger than chronological age. High-intensity exercise produces larger effects than moderate activity. The mechanism isn't fully understood, but the correlation is robust across multiple cohorts.`,
    keyTakeaways: [
      "Acute exercise spikes testosterone and GH, but these transient rises don't directly drive muscle growth.",
      "Chronic resistance training improves insulin sensitivity independent of weight loss — a powerful metabolic benefit.",
      "Exercise is associated with epigenetic ages 5–8 years younger than chronological age.",
      "The testosterone:cortisol ratio is a better marker of recovery status than either hormone alone.",
      "Overtraining manifests as blunted HPA axis responses — lower cortisol, lower ACTH, despite high stress.",
    ],
    recommendations: [
      "Don't chase post-workout hormone spikes. Focus on long-term consistency, not acute hormonal responses.",
      "Include both resistance training and cardio for optimal metabolic health.",
      "Monitor recovery with subjective readiness scales and, if available, HRV trends.",
      "Sleep 7–9 hours — sleep deprivation blunts the anabolic hormonal response to training.",
      "Stay lean. Excess body fat increases aromatase activity, converting testosterone to estradiol.",
    ],
    sections: [
      {
        title: "The Acute Hormonal Response",
        content: `A hard leg day can spike testosterone by 20–30% and growth hormone by 300–500%. These numbers sound impressive, and they've been cited endlessly in fitness marketing. But the reality is more nuanced.

Meta-analyses show that the acute post-exercise hormone response does not correlate with long-term muscle growth. Studies that manipulated hormone levels directly (e.g., by blocking the testosterone response) found no reduction in muscle protein synthesis. Conversely, interventions that dramatically increased post-workout hormones didn't produce extra growth either.

What actually drives adaptation is the cumulative effect of repeated training sessions on muscle protein synthesis, satellite cell activation, and motor learning — not the transient hormonal spike 30 minutes after your last set.

That said, the acute response isn't meaningless. It reflects the overall stress and stimulus of the session. Large compound movements (squats, deadlifts) produce bigger hormonal responses than isolation work. But chasing bigger spikes through training techniques is probably a waste of effort. Just train hard, consistently, and let the chronic adaptations accumulate.`,
      },
      {
        title: "Insulin, Metabolism & Body Composition",
        content: `Resistance training is one of the most powerful tools for improving insulin sensitivity — independent of weight loss. A single session can increase glucose uptake into muscle for 24–48 hours via AMPK and GLUT4 translocation. Over months and years, this translates to lower fasting insulin, better glucose control, and reduced risk of type 2 diabetes.

A 2023 meta-analysis found that resistance training reduced HbA1c by 0.5% on average in people with type 2 diabetes — comparable to some oral medications. The effect is larger when combined with aerobic exercise, but resistance training alone is still effective.

The connection to body composition is bidirectional. Excess body fat increases aromatase activity in adipose tissue, converting testosterone to estradiol. This partly explains why obese men often have lower testosterone levels. Losing fat improves this ratio, but building muscle helps too — muscle tissue is metabolically active and improves glucose disposal even without weight loss.

For metabolic health, the best program includes both resistance training (for muscle mass and insulin sensitivity) and aerobic exercise (for cardiovascular capacity and fat oxidation). Neither alone is optimal.`,
      },
      {
        title: "Exercise & Biological Aging",
        content: `Biological aging can be measured through DNA methylation patterns — chemical markers on DNA that change predictably with age. "Epigenetic clocks" use these patterns to estimate biological age, and the results are striking: regular exercisers have biological ages 5–8 years younger than their chronological age.

A 2023 study found that high-intensity interval training reversed age-related transcriptomic changes in older adults, shifting gene expression profiles toward a more youthful state. Another study showed that athletes had significantly lower epigenetic ages than sedentary controls, with the effect size larger for those who had trained consistently for decades.

The mechanisms are still being unraveled, but several pathways are implicated: reduced systemic inflammation, improved mitochondrial function, enhanced DNA repair, and better telomere maintenance. Exercise appears to activate longevity pathways (AMPK, sirtuins) while suppressing pro-aging signals (mTOR overactivation, chronic NF-κB signaling).

The dose-response is encouraging: even modest activity produces measurable benefits, and higher volumes produce larger effects up to a point. You don't need to be an elite athlete to meaningfully slow biological aging — you just need to move regularly, with intensity, over years.`,
      },
    ],
  },
  {
    slug: "injury-prevention",
    title: "Injury Prevention & Prehab",
    subtitle: "Evidence-based strategies to stay healthy and lift for decades.",
    category: "Recovery & Health",
    color: "#8b5cf6",
    icon: "Shield",
    readTime: "12 min",
    summary: `The best injury is the one that never happens. And while some injuries are unavoidable — accidents happen — the majority of lifting-related injuries are preventable with smart programming and targeted prehab work.

The evidence consistently shows that most non-traumatic injuries result from one of three factors: excessive volume relative to tissue capacity, poor load management (too much, too soon), or muscle imbalances that alter movement mechanics. Address these and you dramatically reduce injury risk.

Specific prehab strategies with solid evidence include: eccentric training for tendon health, Nordic hamstring curls for reducing hamstring strain risk, and rotator cuff strengthening for shoulder health. What's less supported: static stretching before lifting (doesn't prevent injury), general "mobility work" without specificity, and most commercial prehab programs that throw everything at the wall.`,
    keyTakeaways: [
      "Most non-traumatic injuries result from excessive volume, poor load progression, or muscle imbalances.",
      "Eccentric training is the most effective tool for tendon health — it stimulates collagen synthesis and remodeling.",
      "Nordic hamstring curls reduce hamstring strain risk by 50%+ in athletes. Simple, brutal, effective.",
      "Static stretching before lifting doesn't prevent injury. Dynamic warm-ups and gradual loading are more effective.",
      "Rotator cuff strengthening reduces shoulder injury risk, especially for bench press-dominant programs.",
    ],
    recommendations: [
      "Increase volume by no more than 10–15% per week. Tendons and ligaments adapt slower than muscle.",
      "Include 2–3 sets of eccentric work for problem tendons (patellar, Achilles, elbow) twice weekly.",
      "Do Nordic hamstring curls 2× per week, 3 sets to near-failure. Progress slowly — they're humbling.",
      "Warm up with movement-specific ramp sets, not static stretching. Save stretching for after training.",
      "Address muscle imbalances: train posterior chain (rows, pull-ups, hip hinges) as much as pressing.",
    ],
    sections: [
      {
        title: "The Volume-Load Relationship",
        content: `Tendons, ligaments, and bone adapt to mechanical loading, but they do so more slowly than muscle. This creates a dangerous window where muscles are strong enough to handle loads that connective tissue isn't ready for. The result: tendonitis, stress reactions, and overuse injuries.

The 10% rule — increasing weekly volume by no more than 10% — is a conservative but effective guideline. For experienced lifters with good recovery, 15% may be sustainable. For beginners or people returning from injury, 5–10% is safer. The key is tracking not just weight on the bar, but total volume load (sets × reps × weight) across all exercises.

Acute-to-chronic workload ratio (ACWR) is a more sophisticated approach used in sports science. It compares your current week's load to the average of the past 4 weeks. Ratios between 0.8 and 1.3 are generally safe. Ratios above 1.5 dramatically increase injury risk. You don't need to calculate this precisely, but the principle is useful: sudden spikes in volume are dangerous, even if the absolute load seems manageable.`,
      },
      {
        title: "Tendon Health & Eccentric Training",
        content: `Tendons don't have great blood supply, which makes them slow to adapt and slow to heal. But eccentric training — emphasizing the lowering phase of a movement — stimulates collagen synthesis and tendon remodeling more effectively than concentric work alone.

For patellar tendon issues (jumper's knee), slow eccentric squats on a decline board are the gold standard. For Achilles tendon problems, heavy eccentric calf raises (3×15 daily, adding weight as tolerated) produce resolution in 70–80% of cases within 12 weeks. For elbow tendinopathy (tennis or golfer's elbow), slow eccentric wrist extensions and flexions with progressive loading work better than rest, ice, or NSAIDs.

The protocol is remarkably consistent across tendons: 3 sets of 15 slow eccentrics, daily or near-daily, with progressive loading. The weight should be heavy enough that the last few reps are genuinely hard. Pain during the exercise is acceptable (up to a 5/10); pain that lingers or worsens the next day means you went too heavy.

This isn't glamorous work. It's boring, sometimes painful, and progress is measured in weeks, not days. But it's the most effective tool we have for tendon health, and it beats the alternative of chronic tendonitis or surgical intervention.`,
      },
      {
        title: "The Nordic Hamstring Curl & Shoulder Prehab",
        content: `Hamstring strains are among the most common injuries in sports that involve sprinting, jumping, or rapid acceleration. The Nordic hamstring curl — an eccentric-only exercise where you kneel and slowly lower your torso forward — is the most effective prevention tool we have.

A 2019 meta-analysis of over 8,000 athletes found that Nordic hamstring curl programs reduced hamstring strain incidence by 51%. The effect was larger in athletes with a history of hamstring injury. The protocol is simple: 2–3 sessions per week, 3 sets of 6–10 reps, progressing from assisted to unassisted to weighted over time.

For shoulder health, the evidence points to rotator cuff strengthening and scapular stabilization. Most lifters do plenty of pressing (which internally rotates and protracts the shoulder) but insufficient pulling and external rotation work. The result: anterior shoulder pain, impingement, and eventually tendon damage.

A balanced prehab routine includes face pulls, external rotations with a band or cable, prone Y-T-Ws, and scapular pull-ups. These aren't "finishers" — they're essential maintenance work. Program them like any other exercise: 2–3 sets, progressive loading, 2–3× per week. Your shoulders will thank you in five years.`,
      },
    ],
  },
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find((g) => g.slug === slug);
}

export function getGuidesByCategory(category: string): Guide[] {
  return guides.filter((g) => g.category === category);
}
