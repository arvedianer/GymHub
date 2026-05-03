# GymHub Deployment Guide

This guide walks you from local development to a live production site on **Vercel** with **PostgreSQL**.

---

## 1. Prerequisites

- [Vercel account](https://vercel.com/signup) (free tier is enough)
- [GitHub account](https://github.com) to push the repo
- PostgreSQL database (options below)

### PostgreSQL Options

| Provider | Free Tier | Best For |
|----------|-----------|----------|
| [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres) | ✅ 256 MB / 60-day trial | Easiest integration |
| [Neon](https://neon.tech) | ✅ 500 MB / unlimited | Best free tier |
| [Supabase](https://supabase.com) | ✅ 500 MB / unlimited | Extra features (auth, storage) |
| [Railway](https://railway.app) | ✅ $5 credit / month | Simple UI |

**Recommendation:** Start with **Neon** or **Vercel Postgres**.

---

## 2. Prepare for Production

### 2.1 Set Environment Variables

Create `.env.local` (never commit this):

```bash
# Database (PostgreSQL)
DATABASE_URL="postgresql://user:password@host:5432/gymhub?sslmode=require"

# Optional: Direct URL for Prisma migrations (some providers need this)
# DIRECT_URL="postgresql://user:password@host:5432/gymhub?sslmode=require"

# OpenAI (optional — enables real AI streaming instead of fallback)
# OPENAI_API_KEY="sk-..."

# Site URL (for sitemap, canonical URLs, OG images)
NEXT_PUBLIC_SITE_URL="https://your-domain.vercel.app"
```

### 2.2 Switch Prisma to PostgreSQL

```bash
# Backup current schema
cp prisma/schema.prisma prisma/schema.sqlite.prisma

# Use PostgreSQL schema
cp prisma/schema.postgresql.prisma prisma/schema.prisma
```

### 2.3 Install PostgreSQL Prisma dependencies

```bash
npm install @prisma/adapter-neon @neondatabase/serverless
# OR if using Vercel Postgres:
# npm install @vercel/postgres
```

---

## 3. Database Setup

### 3.1 Create Database

**Neon:**
1. Sign up → Create project → Copy connection string
2. Paste into `DATABASE_URL`

**Vercel Postgres:**
1. Vercel Dashboard → Storage → Create Database → Postgres
2. Connect to your project → Copy `.env.local` snippet

### 3.2 Push Schema & Seed

```bash
# Generate Prisma Client for PostgreSQL
npx prisma generate

# Push schema (no migrations needed for fresh DB)
npx prisma db push

# Seed with all 334 studies
npx tsx prisma/seed.ts
```

> If seeding fails, run: `npm run db:seed`

### 3.3 Verify Data

```bash
npx prisma studio
```

You should see 334 studies, 7 categories, 6 collections.

---

## 4. Deploy to Vercel

### 4.1 Push to GitHub

```bash
git add .
git commit -m "Production ready: SEO, streaming, analytics"
git push origin main
```

### 4.2 Import Project on Vercel

1. [vercel.com/new](https://vercel.com/new) → Import GitHub repo
2. Framework preset: **Next.js**
3. Environment variables → Add all from `.env.local`
4. Deploy

### 4.3 Post-Deploy Checklist

- [ ] Homepage loads (`/`)
- [ ] Studies page works (`/studies`)
- [ ] Search works (`/search`)
- [ ] Chat responds (`/chat`)
- [ ] Sitemap accessible (`/sitemap.xml`)
- [ ] Robots.txt OK (`/robots.txt`)
- [ ] 404 page styled (`/nonexistent`)
- [ ] Analytics dashboard shows data (wait ~1 hour)

---

## 5. SEO Verification

### Google Search Console

1. [search.google.com/search-console](https://search.google.com/search-console)
2. Add property → Domain or URL prefix
3. Submit sitemap: `https://your-domain.com/sitemap.xml`
4. Verify structured data:
   - Test any study URL with [Rich Results Test](https://search.google.com/test/rich-results)
   - Should show `ScholarlyArticle` schema

### Lighthouse Check

Run in Chrome DevTools → Lighthouse → Mobile:

- **Target scores:**
  - Performance: 90+
  - Accessibility: 95+
  - Best Practices: 95+
  - SEO: 100

---

## 6. Optional: Custom Domain

1. Vercel Dashboard → Project → Settings → Domains
2. Add your domain (e.g., `gymhub.io`)
3. Update DNS records at your registrar
4. Update `NEXT_PUBLIC_SITE_URL` in Vercel env vars
5. Redeploy

---

## 7. Troubleshooting

### Build fails: "prisma schema not found"

```bash
# Re-generate client
npx prisma generate
```

### Runtime error: "Can't reach database"

- Check `DATABASE_URL` has `?sslmode=require`
- Whitelist Vercel IPs in your database provider
- For Neon: Connection string should use pooled connection (`-pooler`)

### Chat returns fallback text, not AI

- Add `OPENAI_API_KEY` to Vercel environment variables
- Redeploy

### Studies not showing

- Check database has data: `npx prisma studio`
- Re-seed: `npx tsx prisma/seed.ts`

---

## 8. Keeping SQLite for Local Dev

To keep SQLite locally but use PostgreSQL in production:

```bash
# Local
DATABASE_URL="file:./dev.db"

# Create a separate env file for prod
# .env.production.local (gitignored)
DATABASE_URL="postgresql://..."
```

Vercel automatically uses `.env.production.local` values during build.

---

## 9. Maintenance

### Add New Studies

1. Add data to JSON/markdown files
2. Update seed script or insert via Prisma Studio
3. Redeploy (Vercel redeploys automatically on git push)

### Monitor Performance

- Vercel Analytics → Web Vitals
- Speed Insights → Core Web Vitals
- Search Console → Performance report

---

**Questions?** Check [Next.js Deployment Docs](https://nextjs.org/docs/deployment) or [Prisma PostgreSQL Guide](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgresql).
