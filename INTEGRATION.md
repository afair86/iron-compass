# Iron Compass — marketing site ↔ product app

**Last updated:** 2026-08-14  
**Purpose:** Single handoff doc so Cursor (and humans) in either repo know what the other owns.

---

## Repos

| Role | Local path |
|------|------------|
| **Product app** | `C:\Users\adamf\Projects\iron-compass-ai` |
| **Marketing website** (this repo) | `C:\Users\adamf\Projects\iron-compass` |

Old path `C:\Users\adamf\APP` is gone after the PC swap. Same product repo, new folder name.

---

## Production URLs

**Canonical host:** bare `https://ironcompassai.com` (`SITE_URL` in `lib/site.ts`). `www.ironcompassai.com` **308-redirects** to bare (`vercel.json`).

| Surface | URL | Built in |
|---------|-----|----------|
| Marketing / SEO site | `https://ironcompassai.com` | **This repo** |
| Web app (mobile shell, tabs) | `https://ironcompassai.com/app` or `https://app.ironcompass.app` | **APP repo** |
| API | `https://api.ironcompassai.com` | **APP repo** |

---

## Who owns what

### This repo ONLY
- Homepage, domain guides, blog, SEO, legal/marketing pages
- Hero CTAs that link out to the app
- No NestJS, Prisma, `ic:session`, or `/dashboard`

### APP repo ONLY
- `/app/*` web app, auth, onboarding, dashboard, habits, journal, API, Stripe, Capacitor

### Keep in sync manually
- Eight domain names (canonical: `shared/domains/ironCompassDomains.ts` in APP repo)
- Brand voice, pricing, CTA labels
- **CTA taxonomy (do not mix):**

  | Intent | Label examples | Target |
  |--------|----------------|--------|
  | Open product / join as member | Open the App, Start Your Rise, Start Inside the App, Start in the App, Become a Member | `productAppHref()` → `/app` |
  | Education funnel | Start Program, Start the Program, Start Your Compass, footer Start | `/start` |
  | Install / waitlist | Download the App, Download Iron Compass AI | `/download` |

Do not link production users to `?native=1` (dev only).

### `/app` on the marketing domain

Set **`PRODUCT_APP_UPSTREAM_URL`** in Vercel to the APP frontend deployment (see `next.config.ts` rewrites). Without it, `/app` on `ironcompassai.com` does not proxy to the product and will appear blank or 404.

---

## Web app on the marketing domain (`/app`)

**Status (verified 2026-07-12):** `https://ironcompassai.com/app` returns **200** and serves the product app shell (`#root`, title “Iron Compass AI”). `/app/dashboard` also returns 200. Upstream frontend deployment is reachable.

**Canonical host (S1, 2026-08-03):** Prefer bare `ironcompassai.com`. `www` → bare is permanent (308).

### Marketing site (this repo)

- **Links:** `productAppHref()` in `lib/site.ts` → `/app` by default; `ProductAppLink` in nav, hero, footer, contact, download.
- **Proxy:** `PRODUCT_APP_UPSTREAM_URL` in Vercel env → Next.js rewrites `/app` and `/app/*` to the APP Vercel deployment (see `next.config.ts`). Keep this env set; without it, `/app` breaks again.

### Product app (APP repo)

- **Routes:** `frontend/src/App.tsx` — web app shell at `/app/*` (PWA manifest `start_url: /app`).
- **Deploy:** APP root `vercel.json` + `frontend/scripts/deploy-vercel.mjs` — then confirm marketing `PRODUCT_APP_UPSTREAM_URL` still points at that deployment.

### Two hosting options

| Mode | Marketing env | User opens |
|------|---------------|------------|
| **Same domain (recommended)** | `PRODUCT_APP_UPSTREAM_URL` = APP Vercel URL | `https://ironcompassai.com/app` |
| **Subdomain** | `NEXT_PUBLIC_PRODUCT_APP_URL` = `https://app.ironcompass.app` | Subdomain (no proxy) |

---

## Founder Dashboard (internal BI)

Lives in the **APP repo** only. See `C:\Users\adamf\Projects\iron-compass-ai\FOUNDER_DASHBOARD_ROADMAP.md` (`founder-dashboard/` + `apps/api/src/founder/`).

- Target: `https://founder.ironcompassai.com`
- Do **not** build it in this marketing repo
- Not the same as product `/app/dashboard`
- Stage rule: finish and approve one phase before starting the next

---
