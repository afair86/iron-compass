# Iron Compass marketing website — architecture audit

**Repository:** `iron-compass` (this repo)  
**Live site:** `https://ironcompassai.com`  
**Date of audit:** 25 September 2026  
**Mode:** Read-only. No application code was changed. This file was added and was not committed.

Facts below come from files in this repository and the installed `node_modules` versions of Next and React. Anything that lives only in the Vercel dashboard, DNS, or the separate app repo is marked unknown.

---

## 1. Executive summary

This repository is a **Next.js 16 App Router marketing site**. It serves a homepage, ten life-domain pages, a journal (`/blog`), a few topic article hubs, legal pages, and static tools embedded inside some journal articles. AI notes stay at `/domains/ai-mastery` and are not a life domain.

It does **not** contain user accounts, a database, Stripe, checkout, webhooks, or paid-file delivery.

The separate product app (`iron-compass-ai`) owns authentication, the journal product, and Stripe. This website can optionally **proxy** `/app` to that app, or link to it with an environment URL. Current public navigation does **not** send visitors into `/app`. There is **no shared user identity** implemented in this repo.

`No unified website/app identity is currently implemented.`

Standalone paid products would be new work. The only nearby surface is `/products`, which is a noindex placeholder with no catalogue, prices, or checkout.

---

## 2. Technology stack

| Item | Fact |
|---|---|
| Framework | Next.js App Router |
| Next.js declared | `^16.0.7` in `package.json` |
| Next.js installed | `16.1.6` (`node_modules/next/package.json`) |
| React declared | `^19.0.0` |
| React installed | `19.2.4` |
| React DOM | `^19.0.0` |
| Node engines field | **None.** `package.json` does not set `engines`. `@types/node` is `^20`. |
| Package manager | **npm.** `package-lock.json` is present. No `pnpm-lock.yaml` or `yarn.lock`. |
| TypeScript | Yes. `strict: true` in `tsconfig.json`. Some pages are `.jsx` is not used; pages are `.tsx`. One config file is JS (`tailwind.config.js`, `postcss.config.js`). |
| Styling | Tailwind CSS 3.4 plus hand-written CSS (`app/globals.css`, `styles/iron-compass.css`, `styles/stoic-dispatch.css`, CSS modules). |
| Content | MDX files on disk (`content/blog`), read with `gray-matter` and rendered with `next-mdx-remote`. |
| Deployment | Vercel. Script `npm run deploy` runs `next build` then `npx vercel --prod`. |
| Production domain in code | `https://ironcompassai.com` (`lib/site.ts`). `www` 308-redirects to the bare host (`vercel.json`). |

### Major dependencies

Runtime: `next`, `react`, `react-dom`, `@next/mdx`, `@mdx-js/loader`, `@mdx-js/react`, `next-mdx-remote`, `gray-matter`.

Dev: `typescript`, `eslint`, `eslint-config-next`, `tailwindcss`, `postcss`, `autoprefixer`, `prettier`, `next-seo` (declared; not imported by app pages found in this audit), `@heroicons/react`, `node-edge-tts` (article audio scripts).

### Scripts (`package.json`)

| Script | Command |
|---|---|
| `dev` | `next dev` |
| `build` | `next build` |
| `start` | `next start` |
| `lint` | `eslint` |
| `deploy:check` | `node scripts/deploy.mjs --check` |
| `deploy` | `node scripts/deploy.mjs` |

There is **no** `test` script.

---

## 3. Directory architecture

| Path | Purpose |
|---|---|
| `app/` | App Router pages, layout, one API route, shared UI components. |
| `lib/` | Site URL, blog loader, domain list, subscribe helper, article hubs, photo paths. |
| `content/blog/` | Journal MDX. `_standards/` is editorial process, not a public route. `_reviews/` is draft material. |
| `public/` | Images, audio, logos, favicon. All of this is publicly fetchable. |
| `styles/` | Global visual CSS for the marketing chrome and journal. |
| `brand/` | Compass mark source files and a short brand note. |
| `scripts/` | Deploy, Vercel helpers, audio generation, logo crop. Not part of the Next runtime. |
| `.vercel/` | Local link to Vercel project `iron-compass` (`project.json`). |

There is **no** `pages/` directory. There is **no** `prisma/`, `drizzle/`, `supabase/`, or `middleware.ts`.

---

## 4. Routing

**App Router only.** No Pages Router.

### Public pages

| Route | Source |
|---|---|
| `/` | `app/page.tsx` → `app/components/ApprovedHome.tsx` |
| `/domains` | `app/domains/page.tsx` |
| `/domains/health` | `app/domains/health/page.tsx` |
| `/domains/discipline-mindset` | `app/domains/discipline-mindset/page.tsx` |
| `/domains/purpose-direction` | `app/domains/purpose-direction/page.tsx` |
| `/domains/leadership-character` | `app/domains/leadership-character/page.tsx` |
| `/domains/financial-power` | `app/domains/financial-power/page.tsx` |
| `/domains/ai-mastery` | `app/domains/ai-mastery/page.tsx` |
| `/domains/grief-honour` | `app/domains/grief-honour/page.tsx` |
| `/domains/identity-legacy` | `app/domains/identity-legacy/page.tsx` |
| `/blog` | `app/blog/page.tsx` (this is the journal index) |
| `/blog/[slug]` | `app/blog/[slug]/page.tsx` |
| `/articles` | `app/articles/page.tsx` |
| `/articles/grief-for-men` | `app/articles/grief-for-men/page.tsx` |
| `/articles/how-men-grieve-differently` | `app/articles/how-men-grieve-differently/page.tsx` |
| `/articles/rebuilding-after-divorce-for-men` | `app/articles/rebuilding-after-divorce-for-men/page.tsx` |
| `/articles/rebuilding-identity-after-loss` | `app/articles/rebuilding-identity-after-loss/page.tsx` |
| `/articles/stoic-grief-strength-through-loss` | `app/articles/stoic-grief-strength-through-loss/page.tsx` |
| `/articles/financial-power` | `app/articles/financial-power/page.tsx` |
| `/articles/ai-mastery` | `app/articles/ai-mastery/page.tsx` |
| `/about` | `app/about/page.tsx` |
| `/contact` | `app/contact/page.tsx` |
| `/start` | `app/start/page.tsx` (education steps, not checkout) |
| `/download` | `app/download/page.tsx` |
| `/privacy` | `app/privacy/page.tsx` |
| `/terms` | `app/terms/page.tsx` |
| `/products` | `app/products/page.tsx` (noindex placeholder) |
| `/daily` | `app/daily/page.tsx` (noindex archived placeholder) |

There is **no** `/journal` route. The journal is `/blog`.  
There is **no** `/tools` route. Interactive tools are components inside specific blog articles (`app/components/blog-tools/`).  
There is **no** `/auth`, `/account`, `/login`, `/checkout`, `/success`, or `/cancel` route in this repo.

### Hidden / internal

| Route | Source | Notes |
|---|---|---|
| `/review/5am-audio` | `app/review/5am-audio/page.tsx` | `robots: noindex, nofollow`. Not in the sitemap. |
| `/review/5am-routine` | `app/review/5am-routine/page.tsx` | Same. |
| `/app` and `/app/:path*` | Not a page in this repo | Optional rewrite to `PRODUCT_APP_UPSTREAM_URL` in `next.config.ts`. If that env var is empty, the rewrite list is empty. |

### API

| Route | Source |
|---|---|
| `POST /api/subscribe` | `app/api/subscribe/route.ts` |

No other `app/api/**/route.ts` files exist. No Stripe webhook route. No server actions were found (`"use server"` search was not needed beyond the single API route; none are referenced in subscribe or checkout because checkout does not exist).

### Redirects (`next.config.ts`)

Permanent redirects from legacy domain slugs (`/domains/discipline`, `/domains/wealth`, and others) to the eight canonical slugs (`lib/site.ts` `DOMAIN_ALIAS_REDIRECTS`).  
Permanent redirects from near-duplicate blog slugs to a canonical slug (`lib/blog.ts` `BLOG_CANONICAL_REDIRECTS`).

`www.ironcompassai.com` → `https://ironcompassai.com` with status 308 (`vercel.json`).

---

## 5. Authentication

**There is no authentication system in this website repository.**

| Topic | Status |
|---|---|
| Auth library | None (no NextAuth, Clerk, Auth.js, Supabase Auth, or custom login). |
| Login / signup | None. |
| Session, JWT, cookies | None in this repo. |
| Server or client auth helpers | None. |
| Protected routes | None. No `middleware.ts`. |
| Logout, password reset, email verification, social login | None. |
| User IDs | None. |

`INTEGRATION.md` states that `ic:session`, dashboard, and auth belong to the **app** repo, not this one. That matches the code here.

---

## 6. User / account model

**No persistent user, account, customer, profile, membership, subscription, entitlement, or purchase model exists in this repo.**

There is no schema file. Email collected by `/api/subscribe` is forwarded to Resend or a webhook. It is not stored in a database owned by this site. There is no account dashboard.

---

## 7. Database

**No database and no ORM.**

No PostgreSQL, Supabase, Neon, PlanetScale, SQLite, Prisma, or Drizzle configuration. No migrations. No database environment variables.

---

## 8. Stripe

**Stripe is not implemented in this repository.**

| Topic | Status |
|---|---|
| Stripe SDK | Not a dependency. |
| Server or client Stripe client | None. |
| Stripe env vars | None in `.env.example` or application code. |
| Subscriptions | Not in this repo. |
| One-time purchases | Not in this repo. |
| Checkout route | None. |
| Price IDs | None. |
| Success / cancel URLs | None. |
| Customer create/reuse | None. |
| Checkout metadata | None. |
| Webhook route | None. |
| Signature verification | None. |
| Webhook events handled | None. |
| Idempotency | None. |
| Customer Portal | None. |
| Entitlements | None. Payment status does not grant access inside this site, because there are no payments. |

`INTEGRATION.md` says Stripe belongs to the app repo. This audit did not open that repo.

---

## 9. Subscription architecture

**No tiers, prices, Stripe Price IDs, trials, credits, feature gates, or cancellation handling exist in this website repo.**

`/start` is a static explanation of how to begin reading the domains. It does not start a subscription. `/products` says the page is queued for rebuild and is `noindex`.

---

## 10. Website / app relationship

From **this repo only**:

| Connection | Evidence |
|---|---|
| Shared authentication | **No.** |
| Shared database | **No.** |
| Shared Stripe customer | **No.** |
| Shared user ID | **No.** |
| SSO / OAuth / API tokens between the two | **No.** |
| App webhooks into this site | **No.** |
| Optional HTTP rewrite | `PRODUCT_APP_UPSTREAM_URL` makes Next rewrite `/app` and `/app/:path*` to that upstream (`next.config.ts`). Server-only. Not `NEXT_PUBLIC_`. |
| Optional public link target | `NEXT_PUBLIC_PRODUCT_APP_URL`. If unset, `productAppHref()` returns `/app` (`lib/site.ts`). |
| Components that would link into the app | `app/components/Hero.tsx`, `app/components/ProductAppLink.tsx`, `app/domains/components/DomainCta.tsx`. **No page currently imports them.** |
| Current public nav | About, Domains, Blog, Contact (`app/components/Navbar.tsx`). |
| Docs | `INTEGRATION.md` describes the intended split and is partly older than the current nav (it still describes app CTAs in the nav). The code is the source of truth: those CTAs are not mounted. |

`No unified website/app identity is currently implemented.`

Whether production Vercel currently has `PRODUCT_APP_UPSTREAM_URL` set **cannot be proven from the repo**. The rewrite only exists when that variable is present at build/runtime.

---

## 11. APIs

### `POST /api/subscribe`

- **File:** `app/api/subscribe/route.ts` → `lib/subscribe.ts`
- **Purpose:** Accept `{ email, source }`, validate a simple email shape, forward the address.
- **Auth:** None. Anyone can POST.
- **If `SUBSCRIBE_WEBHOOK_URL` is set:** POST JSON `{ email, source, subscribedAt }` to that URL. This wins over Resend.
- **Else if `RESEND_API_KEY` and `RESEND_AUDIENCE_ID` are set:** POST the contact to Resend Audiences. HTTP 409 is treated as success.
- **Else:** HTTP 503, “Email signup is not configured yet.”
- **Database:** None.
- **Rate limit / CSRF token:** None in code.
- **Used by:** `app/components/EmailCaptureForm.tsx`, mounted from `app/download/page.tsx`.

No other backend routes. Blog tools (money worksheet, check-ins, prompt builder) run in the browser and do not call this API. Contact is `mailto:` links, not an API.

---

## 12. Content architecture

| Surface | How it is stored |
|---|---|
| Homepage | Hard-coded in `app/components/ApprovedHome.tsx` and `approved-home.module.css`. |
| Domain pages | One route file per domain. Copy in `app/domains/narratives/*.ts`. Shared layout `app/domains/components/DomainPageView.tsx`. |
| Journal | MDX in `content/blog/*.mdx`. Loader `lib/blog.ts` (filesystem at build time). Render `app/blog/[slug]/page.tsx` with `next-mdx-remote`. |
| Topic hubs | Hard-coded TSX under `app/articles/` plus data in `lib/articleHubs.ts`. |
| Legal | Hard-coded TSX: `app/privacy/page.tsx`, `app/terms/page.tsx`. |
| Images | Files in `public/images/`. Paths in frontmatter or `lib/sitePhotos.ts`. |
| Audio | MP3 files in `public/audio/`. A post shows Listen only when `listenAudio` is not false and the file exists at build time (`app/blog/[slug]/page.tsx`). |
| Products | No content model. Placeholder page only. |

Blog frontmatter (`lib/blog.ts` `PostMeta`) includes slug, title, dates, category, description, image, `listenAudio`, `imageAlt`, `imageCredit`, and `practicalTool`. That is an article model, not a product model. It could be copied as a pattern later. It does not include price, SKU, file keys, or access rules.

Excluded from the public journal index and sitemap: `_template`, `sample-post`, `hello-world`, plus slugs listed in `BLOG_CANONICAL_REDIRECTS`.

---

## 13. Storage and assets

Assets are files in `public/` and are served as static URLs by Next/Vercel.

- Images: `public/images/` (home, domains, blog, pages, brand).
- Audio: `public/audio/`.
- Logos: `public/iron-compass-logo*.png`, `public/images/brand/compass-mark.png`.
- No Vercel Blob, S3, Supabase Storage, or other private bucket in code.
- No PDF delivery system was found.
- No signed URLs.

**Anything under `public/` is publicly accessible.** It is not suitable for protected paid-product files. A buyer and a non-buyer would fetch the same URL.

---

## 14. Email

| Item | Fact |
|---|---|
| Provider in code | Resend Audiences HTTP API, or a generic webhook. |
| Package | None. `fetch` to `https://api.resend.com/audiences/{id}/contacts`. |
| Templates | None. |
| Transactional mail (receipts, login, download links) | None. |
| Contact | `mailto:support@ironcompass.ai`, `legal@ironcompass.ai`, `privacy@ironcompass.ai`. |
| Stripe receipts | Not applicable. No Stripe. |

Env names: `RESEND_API_KEY`, `RESEND_AUDIENCE_ID`, `SUBSCRIBE_WEBHOOK_URL`.

Whether those are set in production **is not visible in the repo**.

---

## 15. Analytics and Meta

**No analytics or Meta tracking code was found.**

Searched application TS/TSX for gtag, analytics SDKs, `fbq`, Meta Pixel, PostHog, Sentry, and Plausible. The only hits are prose in the privacy page and comments in blog tools saying worksheet answers are **not** sent to analytics.

| System | Present |
|---|---|
| Vercel Analytics package | No |
| Google Analytics / gtag | No |
| Meta Pixel | No |
| Meta Conversions API | No |
| PostHog / Sentry | No |
| Checkout or purchase events | No |
| Page-view events in code | No |
| Cookie consent banner | No |

Vercel’s own platform logs may still exist in the dashboard. That is outside this repo.

---

## 16. SEO

| Piece | Where |
|---|---|
| Default metadata | `app/layout.tsx` (`metadataBase` = `https://ironcompassai.com`) |
| Per-page helper | `buildPageMetadata()` in `lib/site.ts` — title, description, canonical, Open Graph, Twitter `summary_large_image` |
| Sitemap | `app/sitemap.ts` → `/sitemap.xml`. Static pages, the ten life domains, the AI resource page, article hubs, public blog posts. Omits `/products`, `/daily`, `/review/*`. |
| Robots | `app/robots.ts`. Allow `/`. Sitemap URL included. Does not disallow `/review` or `/products` at robots level; those pages set `noindex` themselves. |
| JSON-LD | Site-wide WebSite + Organization in `app/layout.tsx`. Article/FAQ/breadcrumb scripts on blog posts (`app/blog/[slug]/page.tsx`). ItemList on the blog index. |
| Blog SEO | Frontmatter `metaTitle` / `metaDescription`, canonical `/blog/{slug}`, OG image from the post or the default logo. |

`next-seo` is in devDependencies and is not the metadata path used by `app/layout.tsx`.

---

## 17. Design system

Two layers exist.

**Current approved marketing look**

- `app/globals.css` — base headings.
- `styles/iron-compass.css` — nav, footer, buttons, panels (`.ic-btn-primary`, `.ic-page-title`, `.ic-section-title`, footer pills).
- `app/components/approved-home.module.css` — homepage only.
- `styles/stoic-dispatch.css` — journal article layout and Listen.
- `app/components/brand/photo-frame.module.css` — photo frame and small corner compass.
- Fonts: Oswald (headings) and Inter (body) via `next/font/google` in `app/layout.tsx` (`--font-heading`, `--font-body`).
- Chrome: `app/components/Navbar.tsx`, `app/components/Footer.tsx`, `app/components/PageShell.tsx`.
- Domain template: `app/domains/components/DomainPageView.tsx`.

**Tailwind theme (older / parallel)**

- `tailwind.config.js` — `iron.*` colours (matte `#0A0A0B`, accent `#B01015`, neon blue `#2EC4F1`, bone `#F1F1F1`).
- Breakpoints are Tailwind defaults (sm 640, md 768, lg 1024, xl 1280). Homepage CSS also uses custom cutoffs at 700px and 900px.
- `app/components/LayoutPrimitives.tsx` and some inner pages use Tailwind utility classes.

Source of truth for the live homepage is `ApprovedHome.tsx` plus `approved-home.module.css` and `styles/iron-compass.css`, not the Tailwind palette alone.

---

## 18. Environment variables

Names only. No values.

### App / hosting

| Name | Where used |
|---|---|
| `VERCEL_TOKEN` | `scripts/deploy.mjs` and other `scripts/vercel-*.mjs`. Loads from `.env.local`. Not a Next runtime variable. |
| `VERCEL_OIDC_TOKEN` | Deleted by deploy scripts so an old CLI login does not override `VERCEL_TOKEN`. |
| `PRODUCT_APP_UPSTREAM_URL` | `next.config.ts` rewrites. Server-side. |
| `NEXT_PUBLIC_PRODUCT_APP_URL` | `lib/site.ts` `productAppHref()`. |
| `NEXT_PUBLIC_IOS_APP_URL` | `lib/subscribe.ts` `getAppStoreUrls()`, `/download`. |
| `NEXT_PUBLIC_ANDROID_APP_URL` | Same. |

### Email

| Name | Where used |
|---|---|
| `SUBSCRIBE_WEBHOOK_URL` | `lib/subscribe.ts` |
| `RESEND_API_KEY` | `lib/subscribe.ts` |
| `RESEND_AUDIENCE_ID` | `lib/subscribe.ts` |

### Not present

Authentication, database, Stripe, storage, AI, and analytics variables are **not** defined in this repo.

Script-only (not production site config): `REVIEW_URL`, `PUBLISHED_URL`, `BASE_URL` in `scripts/browser-verify-*.mjs`.

---

## 19. Security (architecture only)

| Control | Present? |
|---|---|
| Protected routes | No |
| Server-side auth | No |
| Stripe webhook signatures | No Stripe |
| Server-side price checks | No prices |
| CSRF tokens | No |
| XSS | React escaping plus MDX. No extra sanitiser library. |
| Security headers in `next.config.ts` or `vercel.json` | No custom CSP, HSTS, or frame headers in repo |
| Rate limiting | No |
| Open redirects | No user-supplied redirect parameter found on the subscribe route |
| Unauthorised API | `/api/subscribe` is public by design |
| Private assets | No |
| Secret files committed | `.env.example` has empty values. `.env.local` is gitignored (per `DEPLOYMENT.md`). This audit did not print `.env.local`. |
| Webhook replay / idempotency | Subscribe webhook has none. Stripe webhooks do not exist. |

---

## 20. Deployment

Evidence in the repo:

- Vercel project name `iron-compass` (`.vercel/project.json`).
- `vercel.json` version 2: www → bare host 308, then pass-through.
- `scripts/deploy.mjs`: load `.env.local`, `npm run build`, then `npx vercel --prod --yes` with `VERCEL_TOKEN`.
- `DEPLOYMENT.md` documents that flow and the app-proxy env var.
- No `.github/workflows` in this repo. GitHub-connected auto-deploy **cannot be confirmed from files here**. `INTEGRATION.md` and `DEPLOYMENT.md` talk about Vercel production, not a CI yaml.
- No `output: "export"` in `next.config.ts`. Default Next server build (static pages plus the one dynamic subscribe route).
- Production branch name is **not** in `vercel.json`. Unknown from code alone. Local git history is not treated as Vercel’s branch setting.

Likely flow, from the script only: a machine with `VERCEL_TOKEN` runs `npm run deploy`, which builds locally and uploads a production deployment. A separate Git integration may also exist in the Vercel UI. **That second path is not proven by a config file in this repo.**

---

## 21. Testing and code quality

| Item | Fact |
|---|---|
| Test framework | None installed. No `*.test.ts` / `*.spec.ts`. |
| Stripe tests | None |
| Auth tests | None |
| End-to-end tests in npm scripts | None. `scripts/browser-verify-*.mjs` are manual Playwright-style checks, not wired to `npm test`. |
| Lint | `eslint.config.mjs` uses `eslint-config-next` core-web-vitals and TypeScript. |
| TypeScript | `strict: true`. `scripts/` is excluded from `tsconfig.json`. |
| CI | No GitHub Actions workflow in the repo. |
| Build | `npm run build` (`next build`). **Not run for this audit.** |

---

## 22. Technical risks for future paid products

| Issue | Level | Why |
|---|---|---|
| No user accounts or persistence | **BLOCKER** | A purchase cannot be tied to a person inside this repo. |
| No Stripe at all | **BLOCKER** | One-time checkout, webhooks, and Customer Portal would be new. |
| No entitlement model | **BLOCKER** | Nothing can decide “this person may download this product.” |
| Public `public/` files only | **BLOCKER** for protected delivery | Paid files placed here would be world-readable. |
| No unified identity with the app | **HIGH** | Same email in two systems would still be two strangers unless a new shared id is designed. App Stripe must not be assumed to cover website products. |
| `/products` is a placeholder | **MEDIUM** | Route exists and is noindex, but it is not a catalogue. |
| Subscribe endpoint has no rate limit | **MEDIUM** | Public POST can hit Resend or the webhook. |
| No purchase analytics or Meta events | **MEDIUM** | Facebook traffic would not record a purchase even after checkout exists. |
| `INTEGRATION.md` is staler than the nav | **LOW** | Easy to plan against app buttons that are not on the live pages. |
| Unused app-link components still in the tree | **LOW** | `Hero.tsx`, `DomainCta.tsx`, `ProductAppLink.tsx` still point at `productAppHref()`. Mounting them later would send people to `/app`. |
| No automated tests | **MEDIUM** | Payment work would have no existing safety net. |

---

## 23. Standalone-product readiness

| Requirement | Current status | Existing support | Missing work |
|---|---|---|---|
| Product catalogue | NOT IMPLEMENTED | `/products` placeholder only | Catalogue data and pages |
| Product detail pages | NOT IMPLEMENTED | None | New routes |
| One-time Stripe checkout | NOT IMPLEMENTED | None | Stripe Checkout in this repo or a shared service |
| Purchase records | NOT IMPLEMENTED | No database | Storage and a purchase model |
| Product entitlements | NOT IMPLEMENTED | None | Access rules after payment |
| Customer product library | NOT IMPLEMENTED | No account | Signed-in library |
| Secure file delivery | NOT IMPLEMENTED | Public files only | Private storage and signed URLs |
| Purchase confirmation | NOT IMPLEMENTED | No email templates | Confirmation page and/or email |
| Purchase analytics | NOT IMPLEMENTED | No analytics SDK | Event pipeline |
| Meta purchase tracking | NOT IMPLEMENTED | No Pixel, no CAPI | Pixel and/or Conversions API |
| Unified website/app identity | NOT IMPLEMENTED | Optional `/app` rewrite only | Shared user id and session |
| Refund / revocation | NOT IMPLEMENTED | No webhooks | Stripe refund events and access removal |
| Product versioning | NOT IMPLEMENTED | Blog frontmatter is not a product version | Version field and file history |

---

## 24. Current architecture diagrams

### What exists today

```
Visitor
  ↓
https://ironcompassai.com
  ↓
Next.js 16 site (this repo)
  ├─ static pages (home, domains, blog, legal, start, download)
  ├─ MDX journal from content/blog
  ├─ public files (images, audio)
  └─ POST /api/subscribe
        ├─ SUBSCRIBE_WEBHOOK_URL  (optional)
        └─ Resend Audiences       (optional)
```

There is no arrow to Stripe, a database, or an entitlement check.

### Website and app

```
ironcompassai.com          iron-compass-ai (separate repo)
(this marketing repo)      (not modified, not audited here)

Next.js pages              Auth, app UI, API, Stripe
public assets              (documented in INTEGRATION.md only)

Optional, env-gated only:
  /app  --rewrite-->  PRODUCT_APP_UPSTREAM_URL

No shared login
No shared database
No shared Stripe customer
No shared user id
```

---

## 25. Important file map

`package.json`  
Purpose: dependencies and scripts.  
Why it matters: proves there is no Stripe SDK, database client, or test script.

`next.config.ts`  
Purpose: redirects and optional `/app` rewrite.  
Why it matters: the only technical bridge toward the app.

`vercel.json`  
Purpose: www → bare host.  
Why it matters: canonical domain behaviour.

`lib/site.ts`  
Purpose: `SITE_URL`, metadata helper, domain slug list, `productAppHref()`.  
Why it matters: canonical URLs and the unused app-link target.

`app/layout.tsx`  
Purpose: fonts, default SEO, nav, footer, JSON-LD.  
Why it matters: global chrome for any future product page.

`app/page.tsx` and `app/components/ApprovedHome.tsx`  
Purpose: live homepage.  
Why it matters: approved public entry. Do not treat `app/components/Hero.tsx` as live.

`app/components/Navbar.tsx` and `app/components/Footer.tsx`  
Purpose: public navigation.  
Why it matters: shows there is no account or checkout link.

`app/products/page.tsx`  
Purpose: noindex placeholder.  
Why it matters: the route name exists; the product system does not.

`lib/blog.ts` and `app/blog/[slug]/page.tsx`  
Purpose: journal load and render.  
Why it matters: closest content pattern if products are file-based later. Not a paywall.

`content/blog/`  
Purpose: MDX articles.  
Why it matters: content lives in git, not a CMS or database.

`app/api/subscribe/route.ts` and `lib/subscribe.ts`  
Purpose: only server endpoint.  
Why it matters: pattern for a server route, and the only email integration.

`app/download/page.tsx` and `app/components/EmailCaptureForm.tsx`  
Purpose: “app not ready” plus optional email capture.  
Why it matters: not a purchase flow.

`lib/practicalToolIds.ts` and `app/components/blog-tools/`  
Purpose: free in-browser tools on some articles.  
Why it matters: interactive UI with no account and no server save.

`public/`  
Purpose: all images and audio.  
Why it matters: unsuitable for private paid files.

`.env.example`  
Purpose: variable names.  
Why it matters: full list of intended configuration. No Stripe keys.

`scripts/deploy.mjs` and `DEPLOYMENT.md`  
Purpose: how production is published from this repo.  
Why it matters: deploy path is Vercel CLI, not a GitHub Action in-repo.

`INTEGRATION.md`  
Purpose: written split between this repo and `iron-compass-ai`.  
Why it matters: states Stripe and auth live in the app. Cross-check against code before trusting older CTA notes.

`app/sitemap.ts` and `app/robots.ts`  
Purpose: SEO index rules.  
Why it matters: new product URLs will not appear until added here.

`styles/iron-compass.css` and `tailwind.config.js`  
Purpose: visual system.  
Why it matters: new pages should reuse these rather than inventing a third theme.

---

## 26. Unknowns (not in this repository)

- Whether Vercel production currently has `PRODUCT_APP_UPSTREAM_URL`, Resend, or the subscribe webhook set.
- Whether Vercel Git auto-deploy is enabled, and which Git branch it tracks.
- DNS records beyond the www redirect written in `vercel.json`.
- Anything inside `iron-compass-ai` (auth, database, Stripe products, user ids). This audit did not open that repo.
- Vercel Analytics or log drains enabled only in the dashboard.
- The exact Node.js version used on Vercel’s build image.

---

## Commands run for this audit

Read-only inspection only: file reads and searches. `npm run build` was not run. No packages were installed. No env files were printed. No deploy.
