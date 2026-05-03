# GymHub – Implementation Plan

## Vision
GymHub is an open-source, science-based fitness knowledge platform that makes peer-reviewed research accessible to everyone—from beginners to advanced gymrats. It bridges the gap between academic papers and practical application through AI-powered summaries, semantic search, and an evidence-based chatbot.

---

## Core Concept Refinement

### What Makes GymHub Different
| Feature | Why It Matters |
|---------|---------------|
| **Study Summaries** | Complex PubMed papers distilled into 3 readability levels (Beginner / Intermediate / Advanced) |
| **Semantic AI Search** | Ask "What's the optimal protein intake for muscle gain?" and get cited answers from real studies—not opinions |
| **Evidence-Only Chatbot** | RAG-powered AI that ONLY uses the curated study database. No bro-science, no hallucinated claims |
| **Progressive Disclosure** | Users choose their knowledge level; content adapts complexity |
| **Open Source** | Community-driven curation, transparent methodology, forkable codebase |

---

## Content Categories

1. **Resistance Training** – hypertrophy, strength, periodization, volume, frequency, RPE
2. **Nutrition** – macros, meal timing, caloric surplus/deficit, micronutrients
3. **Supplements** – creatine, caffeine, protein powder, omega-3, vitamin D (evidence-graded)
4. **Recovery & Health** – sleep, stress, injury prevention, longevity
5. **PEDs & Harm Reduction** – steroids, SARMs, peptides (objective, cited, non-judgmental)
6. **Cardio & Conditioning** – LISS, HIIT, heart health, VO2 max
7. **Biomechanics** – form, range of motion, muscle activation

---

## Tech Stack

| Layer | Technology | Reasoning |
|-------|-----------|-----------|
| **Framework** | Next.js 14 (App Router) | SSR/SSG for SEO, API routes, React Server Components |
| **Language** | TypeScript | Type safety across full stack |
| **Styling** | Tailwind CSS + shadcn/ui | Rapid UI development, accessible components |
| **Database** | PostgreSQL + pgvector | Relational data + vector embeddings for semantic search |
| **ORM** | Prisma | Type-safe queries, migrations, great DX |
| **Auth** | NextAuth.js (OAuth + Email) | Optional accounts, secure sessions |
| **AI/LLM** | Vercel AI SDK + OpenAI API | Streaming responses, RAG pipeline, chat UI |
| **Search** | pgvector + OpenAI Embeddings | Semantic similarity search on study content |
| **Deployment** | Vercel | Edge network, serverless, zero-config |
| **Content** | MDX | Rich study summaries with components inside markdown |

---

## Database Schema (Simplified)

```
Study
├── id, pmid, title, authors, journal, year, doi
├── abstract, summary_beginner, summary_intermediate, summary_advanced
├── methodology_quality (1-5)
├── category (enum)
├── tags[]
├── embedding (vector)
└── createdAt, updatedAt

Category
├── id, slug, name, description, icon

Tag
├── id, slug, name

User (optional)
├── id, email, name, image
├── knowledge_level (BEGINNER|INTERMEDIATE|ADVANCED)
├── createdAt

Bookmark
├── id, userId, studyId, createdAt

ChatSession
├── id, userId (nullable), title, createdAt

ChatMessage
├── id, sessionId, role (user|assistant), content, sources[]
```

---

## Page Structure

| Route | Purpose |
|-------|---------|
| `/` | Hero, value proposition, featured studies, category grid |
| `/studies` | Browse & filter all studies (category, level, year, quality) |
| `/studies/[slug]` | Full study page with all 3 summary levels + raw abstract |
| `/categories/[slug]` | Category landing with curated studies |
| `/search` | AI semantic search interface |
| `/chat` | Evidence-based AI chatbot |
| `/about` | Mission, methodology, open-source info |
| `/login` | Optional auth (OAuth + email) |
| `/dashboard` | Bookmarks, history, preferences (logged-in only) |

---

## Key Features Deep-Dive

### 1. Study Summaries (3 Levels)
Each study gets 3 human-written or AI-assisted summaries:
- **Beginner**: Plain language, no jargon, analogies, "what does this mean for you?"
- **Intermediate**: Some technical terms explained, basic statistics mentioned
- **Advanced**: Full nuance, confidence intervals, limitations, conflicts with other studies

### 2. Semantic AI Search
- User query → OpenAI embedding → pgvector similarity search → top 10 relevant studies → AI synthesizes answer with inline citations
- Every claim links back to the original study page

### 3. Evidence-Only Chatbot (RAG)
- User asks a question
- System retrieves top-k relevant study chunks via vector search
- LLM generates answer STRICTLY from provided context
- Response includes: summary + "Sources" section with links to studies
- System prompt explicitly forbids outside knowledge

### 4. Quality Indicators
Each study shows:
- Sample size
- Study design (RCT, meta-analysis, observational, etc.)
- Quality score (1-5 stars)
- Conflict of interest disclosure
- Replication status

### 5. Progressive Knowledge Levels
- Default level choosable in settings
- Toggle on any study page to switch between Beginner/Intermediate/Advanced
- Content complexity adapts across the site

---

## Data Pipeline (MVP)

**Phase 1: Manual Curation**
- Seed database with 50-100 high-quality studies manually summarized
- Focus on foundational topics (protein, creatine, volume, sleep)

**Phase 2: Semi-Automated**
- PubMed API integration for study metadata
- AI-assisted summarization with human review
- Community submissions via GitHub PRs

**Phase 3: Automated**
- RSS feed monitoring for new publications
- Auto-ingestion + AI summary draft → human approval queue

---

## Design Direction

- **Aesthetic**: Clean, clinical but warm—like a premium health journal
- **Color palette**: Deep navy, crisp white, muted teal accents, warm amber for highlights
- **Typography**: Inter for UI, Merriweather for long-form reading
- **Vibe**: Trustworthy, scientific, approachable—not intimidating

---

## Open Source Strategy

- GitHub repo with MIT license
- Study summaries as MDX files in `/content/studies/` (community PRs)
- Contribution guidelines for adding new studies
- Public roadmap via GitHub Projects
- "Edit this page" link on every study

---

## MVP Scope (Week 1-2)
1. Next.js project setup with shadcn/ui
2. PostgreSQL + Prisma schema
3. Homepage + study listing + study detail pages
4. 20 seed studies with 3-level summaries
5. Basic category filtering
6. Responsive design

**Phase 2 (Week 3-4)**
7. AI semantic search
8. Evidence-only chatbot
9. Auth + bookmarks
10. Dashboard

**Phase 3 (Later)**
11. PubMed API integration
12. Newsletter / updates
13. Community contribution flow
14. Mobile app (PWA or React Native)

---

## Risks & Mitigations

| Risk | Mitigation |
|------|-----------|
| Medical liability | Clear disclaimers, "not medical advice", cite limitations |
| AI hallucinations | Strict RAG, system prompt constraints, source linking |
| Content volume | Start manual, automate gradually, community contributions |
| SEO competition | Niche focus on "study summaries", long-tail keywords |

---

*Ready to build?*
