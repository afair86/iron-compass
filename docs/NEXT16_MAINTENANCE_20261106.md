# Next.js 16 maintenance verification

Verified 6 November 2026, 8:09 pm Australia/Brisbane. Priority 1 only.

## Source and deployed baseline

- Refetched `main`: `997685885f3005c0261575134c057d2a13ba02ef`. Its lockfile has Next.js / eslint-config-next 16.1.6, @next/mdx 16.0.7, React / React DOM 19.2.4 and sharp 0.34.5.
- Live domain inspected through Vercel: deployment `dpl_7EGek3iAxR3fmVWc82mmqMCfA5gr`, source `50563a8725e9aa1ccb6274eecefac0dd58cea253`, branch `codex/website-search-20261105`. Build logs explicitly report Next.js 16.4.5. That source's lockfile has eslint-config-next 16.1.6, @next/mdx 16.0.7, React / React DOM 19.2.4 and sharp 0.35.5. Other deployed package versions are inferred from the source lockfile, rather than runtime introspection.
- Maintenance branch: `codex/website-next16-security-20261106`, based on verified live-site branch tip `cf60def3c3b821bdd644974da82967fea3147044` (the live source plus its release handover). Checkout: `website-next-security-20261106`.
- Main is behind the live website. This branch preserves the live-site design/content rather than restoring main's older site. Review the maintenance diff against `codex/website-search-20261105`; do not merge or release older main over production.

## Version selection and exact changes

The npm registry's stable `latest` tag and the [official release](https://github.com/vercel/next.js/releases/tag/v16.4.5) both identify **16.4.5**, released 3 November, as the current stable Next.js release. Canary 16.5 is excluded. The release includes seven moderate security fixes; it supersedes the [14 October security update](https://nextjs.org/blog/nextjs-security-update-october-14-2026). This is the latest patched stable target, not a guarantee against undiscovered vulnerabilities.

`package.json` and `package-lock.json` now pin:

| Package | Previous manifest | Previous lock | New manifest / lock |
| --- | --- | --- | --- |
| next | ^16.0.7 | 16.4.5 | 16.4.5 |
| eslint-config-next | ^16.0.7 | 16.1.6 | 16.4.5 |
| @next/mdx | ^16.0.7 | 16.0.7 | 16.4.5 |

The runtime was already current in production. This change makes the declared versions reproducible and aligns lint and MDX tooling. React / React DOM remain 19.2.4 and sharp remains 0.35.5; no unrelated direct dependencies changed.

Lockfile transitive changes: @next/eslint-plugin-next 16.1.6 -> 16.4.5; eslint-plugin-react-hooks 7.0.1 -> 7.1.1; @babel/core, helper-compilation-targets and helper-module-transforms 7.29.7 -> 7.29.13; @babel/generator, parser and traverse 7.29.12 -> 7.29.13; @babel/helper-string-parser 7.29.11 -> 7.29.13; @babel/helpers 7.29.10 -> 7.29.13. convert-source-map 2.0.0 is relocated from @babel/core/node_modules to node_modules. These are development tooling resolutions from npm, not website runtime changes.

Only the dependency manifest, lockfile, this report and CURRENT_HANDOVER change relative to the branch base. No application code, styles, content, images, SEO configuration, redirects, rewrites or Vercel configuration change.

## Verification

Environment: Node 24.18.0, npm 11.16.0, Windows; Vercel project is configured for Node 24.x.

- Clean `npm ci --ignore-scripts --no-audit`: passed; 544 packages installed from the lockfile. No install lifecycle scripts were required for these checks.
- `npm run build`: passed, including TypeScript and all 129 static generation entries. The first restricted-network attempt failed fetching existing Inter/Montserrat Google Fonts. Retrying the unchanged build with network access passed. One existing tracing warning remains at app/review/5am-audio/page.tsx:17; production logs show the same warning.
- `npm run lint`: exit 0, zero errors, five warnings identical to baseline: two raw img warnings in PhotoFrame.tsx and three unused variables in apply-brand-mark.mjs / vercel-link.mjs. No rules disabled.
- `node --test tests/*.test.mjs scripts/source-status.test.mjs`: 14/14 passed before and after. Includes FAQ parsing, saved-checklist injection escaping, domain architecture and source identity.
- `node scripts/verify-blog-money-math.mts` and `node scripts/verify-shift-routine.mts`: passed. Existing Node module-type warnings remain.
- Generated SEO title, description, robots, canonical, Open Graph, Twitter and parsed JSON-LD equal the existing baseline build across all 123 HTML files, including internal error/review outputs. This is not a claim that all 123 are indexable.
- All 117 sitemap URLs return 200 from the updated local production server. robots.txt returns 200; an unknown route returns 404.
- Static/dynamic route definitions and redirect definitions match the baseline. All 26 non-internal application redirects return 308 with the expected destination, including old checklist anchors. The Vercel www-host redirect configuration is byte-unchanged; its hosting behaviour was not redeployed or retested locally.
- Both /app rewrite definitions checked in the built manifest. /app, /app/auth and /app/pricing?plan=core preserve paths/query against a local upstream stub. No live app account, billing or production backend was exercised.
- Malformed JSON and missing-data requests to both contact/subscribe APIs return 400. Local image optimization returns an image; an unapproved external image source returns 400. No live form submission occurred.
- Edge/Chromium: nine routes at 390px and 1440px (18 cases): home, About, Pricing, Download, Domains, Discipline, Grief & Honour, Blog and the quiet discipline checklist article. Each loads, has one h1, retains the header app link, has loaded non-lazy images, no horizontal overflow and no page exceptions. Mobile navigation opened and navigated to About correctly. Inspected saved full-page desktop-home and mobile-About screenshots. Lazy images outside the viewport are not asserted loaded by this check.
- `git diff --check`: passed. Site source/config directories remain byte-unchanged relative to the branch base.

## Security findings and limits

- `npm audit --omit=dev`: **zero vulnerabilities**, both baseline and updated lockfile.
- Full `npm audit`: nonzero result, **eight moderate / zero high / zero critical**, unchanged from baseline. One underlying [minimatch glob amplification advisory](https://github.com/advisories/GHSA-g3hv-75wg-m249) propagates through seven ESLint/TypeScript-ESLint packages. These are development dependencies. The audit suggests a major downgrade of eslint-config-next to 15.5.29, which would break the requested matching 16.x version; no automatic audit fix or override was applied. This finding remains open for a separately scoped tooling fix.
- No exploit testing, live API mutation, production deploy, promotion, main merge or source reconciliation was performed. Local checks used a synthetic app upstream and no production secrets. The harness initially needed a correction for the manifest's grouped rewrite structure; the completed run passed.
- Raw local logs, audit JSON, browser harness/results and two screenshots are in the parent workspace outputs/website-next16-* files. They are evidence artifacts, outside the website source/deployment.

Next action: review the focused maintenance diff and remaining development-only audit finding. Production release requires explicit owner approval. Reconcile the existing live-site source with main through its separate review before a main-based release.
