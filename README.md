# Nigeria 2027 — Political Compass

> Evidence-based comparison platform for Nigeria's 2027 presidential election.

A production-ready Next.js application that compares presidential candidates (Tinubu, Peter Obi, Atiku) using verified, sourced claims — complete with a quiz system, comparison engine, and shareable result cards.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | TailwindCSS |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase RLS + service role |
| Deployment | Vercel |
| Fonts | Geist Sans + Geist Mono |

---

## Features

- **Candidate Profiles** — Strengths, weaknesses, controversies with credibility scores and proof links
- **Comparison Engine** — Side-by-side candidate comparison with category breakdowns and weighted final scores
- **Alignment Quiz** — 10 policy questions that compute % alignment with each candidate
- **Shareable Result Card** — Download as PNG, share to X (Twitter)
- **Admin Panel** — Protected route to add candidates, claims, and proof links
- **Dark Mode** — Default dark theme with clean, premium UI
- **Fully Responsive** — Mobile-first design

---

## Quick Start

### 1. Clone & Install

```bash
git clone https://github.com/yourname/nigeria2027.git
cd nigeria2027
npm install
```

### 2. Set Up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the contents of `supabase/schema.sql`
3. Copy your project URL and keys

### 3. Configure Environment Variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_ADMIN_PASSWORD=your-secure-password
```

### 4. Seed the Database

```bash
npm run seed
```

This populates Supabase with all three candidates, 25+ verified claims, and 60+ proof links.

### 5. Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

**Add environment variables in Vercel dashboard:**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_ADMIN_PASSWORD`

---

## Project Structure

```
nigeria2027/
├── app/
│   ├── layout.tsx              # Root layout (dark mode, fonts)
│   ├── page.tsx                # Homepage
│   ├── candidates/
│   │   ├── page.tsx            # Candidates listing
│   │   └── [slug]/
│   │       └── page.tsx        # Individual candidate profile
│   ├── compare/
│   │   └── page.tsx            # Comparison page
│   ├── quiz/
│   │   └── page.tsx            # Quiz page
│   ├── admin/
│   │   └── page.tsx            # Admin panel (password protected)
│   └── api/
│       ├── candidates/route.ts
│       ├── claims/route.ts
│       └── claims/links/route.ts
├── components/
│   ├── candidates/
│   │   ├── CandidateHeader.tsx # Profile header with scores
│   │   └── ClaimCard.tsx       # Expandable claim card
│   ├── comparison/
│   │   └── CompareClient.tsx   # Interactive comparison UI
│   ├── quiz/
│   │   ├── QuizClient.tsx      # Quiz navigation + question UI
│   │   └── QuizResultCard.tsx  # Result + share card
│   ├── shared/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   └── ui/
│       ├── ScoreBar.tsx        # Animated score bar
│       └── CategoryBadge.tsx   # Color-coded category tags
├── lib/
│   ├── supabase.ts             # Supabase client
│   ├── data.ts                 # Data fetching functions
│   ├── quiz.ts                 # Quiz questions + scoring logic
│   └── seed-data.ts            # Verified seed data
├── types/
│   └── index.ts                # All TypeScript types
├── utils/
│   └── scoring.ts              # Score computation formulas
├── scripts/
│   └── seed.ts                 # DB seed script
└── supabase/
    └── schema.sql              # Complete database schema
```

---

## Scoring Formula

```
final_score = (strength_score × 0.5) − (weakness_score × 0.3) − (controversy_score × 0.2)
```

Each dimension score is a credibility-weighted average:

```
score = Σ(credibility × weight) / Σ(weight)
```

Final score is normalized to 0–100 for display.

---

## Admin Panel

Visit `/admin` and enter your `NEXT_PUBLIC_ADMIN_PASSWORD`.

From there you can:
- Add new candidates
- Add claims (strength / weakness / controversy)
- Add proof links to existing claims

For bulk data, prefer running `npm run seed` with updated `lib/seed-data.ts`.

---

## Data Sources

All claims are sourced from:
- INEC official results
- US Senate Permanent Subcommittee on Investigations reports
- ICIJ Pandora Papers database
- Reuters, BBC, Premium Times, The Guardian Nigeria
- BudgIT, Stears, NOI Polls
- Official government documents and court records

---

## Contributing

This platform is non-partisan. Claims must be:
1. Sourced to a credible primary or secondary source
2. Given an honest credibility score (not inflated or deflated)
3. Neutral in framing — descriptive, not editorial

---

## License

MIT — free to use, fork, and adapt.
