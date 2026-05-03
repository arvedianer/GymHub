# GymHub

> Peer-reviewed fitness research made accessible for everyone.

GymHub is an open-source, science-based fitness knowledge platform. It bridges the gap between academic papers and practical application through curated study summaries, semantic search, and an evidence-based chatbot.

## Features

- **Study Summaries** — Complex PubMed papers distilled into 3 readability levels (Beginner / Intermediate / Advanced)
- **Semantic Search** — Find studies by keyword, topic, or tag
- **Evidence Bot** — Ask questions and get answers based on real studies, not opinions
- **Quality Indicators** — Every study shows methodology quality, sample size, design, and conflicts of interest
- **Open Source** — Community-driven curation, transparent methodology

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Database | SQLite + Prisma |
| Fonts | Cormorant Garamond + Montserrat |

## Getting Started

```bash
# Install dependencies
npm install

# Set up the database
npx prisma db push
npx tsx prisma/seed.ts

# Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

## Database Schema

- **Study** — Research papers with 3-level summaries, quality ratings, and metadata
- **Category** — Resistance Training, Nutrition, Supplements, Recovery & Health, PEDs, Cardio, Biomechanics
- **Tag** — Flexible tagging for cross-cutting topics
- **User** — (optional) Accounts for bookmarks and preferences
- **Bookmark** — Saved studies per user

## Adding Studies

Studies are seeded via `prisma/seed.ts`. To add new studies:

1. Open `prisma/seed.ts`
2. Add a new object to the `studiesData` array
3. Run `npx tsx prisma/seed.ts`

Each study needs:
- `slug` — URL-friendly identifier
- `title`, `authors`, `journal`, `year`
- `abstract` — Original paper abstract
- `summaryBeginner`, `summaryIntermediate`, `summaryAdvanced` — Three knowledge levels
- `methodologyQuality` — 1–5 star rating
- `categorySlug` — Must match a category slug
- `tags` — Array of tag strings

## Deployment

Build for production:

```bash
npm run build
npm start
```

## Contributing

Contributions are welcome! Submit new studies, improve summaries, or contribute code on GitHub.

## License

MIT
