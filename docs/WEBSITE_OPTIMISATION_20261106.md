# Targeted live-website optimisation

6 November 2026, Australia/Brisbane. Existing site improved incrementally; no rebuild or production release.

## Verified source and retained capabilities

Production Vercel deployment `dpl_7EGek3iAxR3fmVWc82mmqMCfA5gr` still serves source `50563a8725e9aa1ccb6274eecefac0dd58cea253`. Work branches from current live-site tip `cf60def3c3b821bdd644974da82967fea3147044` on `codex/website-optimisation-20261106`, checkout website-optimisation-20261106. Main `9976858` remains behind production and must not replace it.

Checked all open PRs and fetched branch tips. PR #4 already contains the premium website, dedicated app overview, editorial/SEO work, founder photos and domain imagery; the 5 November search branch contains the latest article/FAQ/checklist corrections. PR #5 separately pins/alines Next.js 16.4.5 and its tooling; its preview is ready at `8bee2f1`. Those dependencies are not touched or duplicated here. PR #2 covers source continuity and the old Copilot domain branch is historical. No newer optimisation branch was found at inspection time.

| Area | Already implemented and retained | Genuine opportunity |
| --- | --- | --- |
| Conversion | Explicit product explanation; Start free, Open app, Explore the app, Free/Core/Elite pricing; founder story and Apple-review status | Homepage app feature cards led to generic domains/pricing or directly into app rather than the matching explanation |
| Interaction/motion | Working mobile navigation; card/button hover transitions; reduced-motion CSS; article worksheets, check-ins, prompt builders, routine builder and saved/printed checklists; selected article narration | Small app examples were static and hard to inspect. No new carousel, animation library or duplicate tool needed |
| App demonstration | Authentic screenshots on home, /download, articles and domain guides, with plan labels and visible FAQs | Let a visitor inspect the existing screenshot at readable size without leaving the explanation |
| Performance/mobile | Responsive site and real screenshots; Next image optimisation, font swapping; no overflow/page exceptions in initial live checks | Raw PhotoFrame images generated eager/preload requests even for offscreen/prefetched content |
| SEO | Server-rendered titles/descriptions/canonicals, OG/Twitter, JSON-LD, linked guides, robots, 117 sitemap URLs, legacy redirects | Preserve these; no need to rebuild SEO or rewrite articles |
| Analytics/operations | Source-version tracking; app purchase handling remains separate; contact and signup API routes support existing webhook/Resend setup | No analytics script loaded on home, /download or pricing; source has no website event collector. Form delivery and search-console reports were not claimed verified |
| Existing stack | Locked Next16.4.5, React19.2.4, Tailwind3.4.15, TypeScript5.9.3, MDX/content files, next/image, Google Fonts, Vercel; same-origin /app rewrites | Use existing browser/CSS/React capabilities. No new dependencies or monthly service |

## Ranked opportunities and decisions

Ranks combine expected impact, effort, reversibility and available evidence. Conversion benefit remains a hypothesis until the funnel is measured.

| Rank | Existing → specific change | Expected benefit | Effort estimate | Added monthly cost | Risk / reversibility | Measurement |
| --- | --- | --- | --- | --- | --- | --- |
| 1 — implemented | Eager raw PhotoFrame requests → native lazy loading and async decoding for photo/mark | Less unnecessary initial loading and bandwidth | 0.5–1h plus QA | $0 | Low; image pixels/crops unchanged; two attributes revert it. Visible-photo timing checked | Resource bytes/requests and LCP/CLS |
| 2 — next | No tracker → one free GA4 Standard funnel across site and app | Find actual visitor-to-paid drop-off before larger changes | Half-day site setup; roughly one further day app/payment integration | $0 licence, no paid warehouse/add-ons | Medium setup/privacy/attribution risk; can disable collection. Owner must create/select account; not installed here | App opens, successful signup, verified first subscription; consent-limited denominator |
| 3 — implemented | Home feature cards → matching /download feature anchors | Explain Habits/Journal/Strategy before plan choice; fewer context jumps | Under 0.5h | $0 | Low; app/signup/plan CTAs remain; trivial link revert | Correct-destination checks now; engagement/conversion after measurement |
| 4 — implemented | Small static /download examples → accessible full-screen image links/dialogs | Read real product detail; preserve place on page; stronger demonstration | 1–2h plus QA | $0 | Low; only four existing screenshots, no simulated product; plain-image fallback without JS | Viewer open/close, keyboard/mobile QA; usage once analytics exists |
| 5 — deferred | Existing CTA copy/placement → one experiment at largest measured drop-off | Possible conversion lift | 1–3h per variant | $0 using existing code | Low when reversible, but value unproven today | First establish baseline; no unsupported uplift claim |
| 6 — deferred | Current photo originals → targeted responsive derivative only if remaining image weight matters | Further bandwidth reduction | 1–3h plus crop/quality QA | No new subscription; existing hosting limits apply | Medium visual risk; original approved imagery must remain | Image byte/quality comparison and real mobile timings |
| 7 — deferred | Current small screenshot examples → recorded product walkthrough | May explain complex paid tools if visitors still hesitate | 1–2 days plus future update burden | $0 if produced/hosted within existing allowances | Higher content staleness and page-weight risk | Measure screen engagement and signup drop-off first |

Conversion specialist: retain clear product/plan choices; remove only observed context jumps. Premium UX: useful screenshot inspection with restrained 140ms entrance/160ms hover, disabled for reduced motion; existing effects retained. Frontend: address measured preload waste and use a native dialog rather than a library. Growth: no claim to measure subscriptions from website clicks; the app/payment boundary is required. Commercial: all implemented work uses current technology, no licence cost, is reversible and avoids a redesign.

## Exact implemented scope

- PhotoFrame.tsx adds loading=lazy and decoding=async to existing images. Native visible/near-viewport loading remains; original hero Next Image priority and image pixels/crops are untouched.
- AppScreenshot.tsx and its CSS add four inspectable examples on /download: native modal semantics, labelled title/plan, Close, Escape, backdrop dismissal, native modal background isolation and focus return. Full originals load on demand. Without JS, the image link still works; modified clicks retain normal browser behaviour. No app action or private data is simulated.
- Home feature tiles point to /download#app-today, #app-habits, #app-journal and #app-strategy. Existing app, signup and pricing CTAs stay in place. Added anchor scroll margins avoid the fixed header.
- A modal-only scroll lock is scoped to an open app-preview dialog. No persistent global state or event listeners added.
- Brand, imagery, homepage section order, pricing, founder words, educational content, routes, app rewrites, redirects, APIs and dependencies remain unchanged. No AI, 3D, autoplay, paid service, account creation or member-data changes.
- Analytics deliberately remains uninstalled. The owner selected a **free measurement plan**, documented in WEBSITE_MEASUREMENT_PLAN_20261106.md. There is no measurement ID/property to send events to, and the separate app/payment integration is outside this website change.

## Measurements and validation

Live baseline inspected in Edge at390/1440px on home, /download and /pricing, plus the home app showcase: no page exceptions/overflow; no analytics scripts loaded; current screenshots and CTA destinations verified. Live timings were fast on this connection but are not field data.

Before/after comparison below uses the existing baseline and updated **local production builds**, alternating three fresh browser contexts per route at390×900, device scale1, networkidle plus600ms. Medians, same computer/browser, unthrottled network/CPU. Bytes are encoded resource body sizes (including Next prefetches), excluding HTML/transport headers; not billing totals. These are lab observations, not real-user Core Web Vitals, conversion lift or a guarantee for every connection.

| Route | Initial resource bytes before → after | Reduction | Requests before → after | Median LCP before → after | Median CLS |
| --- | --- | --- | --- | --- | --- |
| Home | 3,398,488 → 1,079,030 | 68.2% | 53 → 40 | 140 → 136ms | 0 → 0 |
| App overview | 3,380,214 → 424,422 | 87.4% | 52 → 33 | 120 → 124ms | 0 → 0 |
| Pricing | 3,358,048 → 746,562 | 77.8% | 51 → 33 | 148 → 132ms | 0 → 0 |
| Discipline guide | 3,498,746 → 458,518 | 86.9% | 54 → 34 | 140 → 144ms | 0 → 0 |

Raw photo preloads fell from20–22 to0 in these cases; native lazy photos still load as visitors approach them. Observed script-resource increase was821 encoded bytes per route, reflecting the viewer/prefetched module. Timing differences of a few milliseconds are noise; the reliable finding is lower initial loading, with no material lab timing/CLS regression. Scrolling the entire site still requires the original image bytes.

Checks: clean unchanged-lockfile install; production build/TypeScript and129 generation entries pass; lint has zero errors and the same five existing warnings; all14 existing tests pass. SEO title/description/canonical/OG/Twitter/robots/parsed JSON-LD match baseline across123 generated HTML files. Static/dynamic route definitions and sitemap body match. All26 application redirects and local /app path/query proxy checks pass. At390/768/1440px, all four feature journeys, all four screenshot dialogs, Close/Escape/focus return/background-control isolation, reduced motion and no overflow pass; mobile navigation still works. Plain-image links work without JS. No page exceptions. No live signup, purchase or form submission was made. Initial harness was adjusted to allow native modal focus to enter browser chrome while keeping background page controls inaccessible.

Visual QA inspects the unchanged first-view layouts and new viewer on phone/desktop; it is not a claim of pixel-identical screenshots. The existing audio-review filesystem tracing warning and five lint warnings remain. Dependency audit was already covered by PR5; dependencies are byte-unchanged here and were not audited redundantly. Raw evidence/harnesses and screenshots are outside the repo in parent outputs/website-optimisation-* and outputs/optimisation-*.

## Release recommendation

Use the separate optimisation preview and focused PR against the current live-site source. This report accompanies the preview push; final deployment identity/status is reported in the PR and task reply after the build. No production release is authorised by this task. After hosted preview validation, recommend this small change for owner approval; retain the separate PR5 maintenance change and reconcile main through its existing review before any main-based release. Do not deploy older main over production.

Expected ongoing cost: **$0 in new subscriptions** and no added server endpoint. Expected immediate benefit: less initial resource loading and clearer product inspection. Actual conversion improvement remains unknown. Next highest ROI: implement the documented free funnel measurement before expanding animation, personalisation or demonstrations.
