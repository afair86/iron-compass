# CURRENT HANDOVER

## Public editorial and app-value pass — READY TO STAGE, 4 November 2026, 12:25 PM Brisbane, Codex

Owner requested the approved layout, SEO/AEO structure, purposeful colours and relevant app screenshots throughout public pages, including blogs. Checkout website-relaunch-20261104; branch codex/website-relaunch-20261104, based on ac90375ee7f17ad786402d58e340626a7c6cd214. Runtime source identity is this commit in git history; release pending at this checkpoint. Existing live build remains dpl_5fHPEQUdt3sevyPhQxsARUSSpytA / 850be92aae3117bc474df60ba5524104e220b3ba. Marketing project prj_fOowaY2ZkZPR56F2Pr3ZArjLBnYM, team team_6NQL6p1c5YCkRtcP1T3dERxN. Main remains older; do not redeploy it over the launch branch.

Changed: app/blog/[slug]/page.tsx and blog archive, articles/components/{ArticleLayout,ArticleSchema,TopicHubView}, AppValuePanel, lib/articleAppContext.ts, styles/public-editorial.css and layout import. All 88 articles have a subject-specific real screenshot, accurate Free/Core/Elite labels and signup/pricing/guide links after educational content; related reading strengthens topic links. Desktop articles use split photo/title introductions and centred comfortable reading columns, silver titles/blue guidance/amber practical attention. Archive removes photos from older entries (140 to 12 image elements including logo/marks), with meaningful domain topic links and initial-HTML ItemList. Article schema now initial HTML with correct publisher logo. About/Start/Download/Daily/Products use shared app-value panel; Daily/Products internal rebuild messages replaced with useful public guidance, retaining noindex. Contact/Pricing/Privacy/Terms receive the shared surface treatment without a sales panel inside forms/legal text. Founder story and published prices unchanged. Existing article photos retained; this is not a claim that every historical photo was newly reviewed/replaced.

Existing Markdown tables/task lists now render semantically using remark-gfm; wide tables are keyboard-accessible scroll regions on phones. All 88 educational texts preserved: 82 byte-identical rendered text snapshots, six differ only in table delimiters or checkbox notation, verified by normalization; content/blog sources and narration untouched. Fixed existing routine-tool ref update during render and review-route internal Link lint errors. Compatible dependency security fixes update lockfile Next 16.1.6 to 16.4.5; production dependency audit reports zero known advisories. Fifteen moderate development-tool advisories remain; no forced/breaking downgrade applied.

Checks: clean-cache Webpack production build/TypeScript pass; full ESLint zero errors/five existing warnings, changed-file ESLint pass; nine architecture/source tests pass; diff whitespace check pass. SEO audit all 119 public generated pages /117 indexable and 117 matching sitemap URLs: no missing metadata, canonical/OG/Twitter, H1/heading-order or JSON-LD issues. All 119 pass no decorative number/link-arrow scan. 19 public page families at actual 390/1440 CSS pixels (38 cases) no overflow, missing H1 or loaded broken images; table additionally passes actual319/390/1440 after containment fix. Public money worksheet and prompt builder generated correct outputs with fictional local inputs; no signup, email, payment or AI submission. Evidence in project checkpoints/2026-11-04-website-relaunch: public-content-check.json, public-responsive-qa.json, seo-audit.json, dependency-audit-after.json. No app/API/native/member data changes. Apple badge remains conditional on a verified live listing.

Next: stage production without domain assignment, verify exact source/pages/styles/assets, then promote the same tested deployment under ongoing owner release authorization. Keep protected staging private; use authenticated Vercel curl. No search-ranking or conversion uplift claimed.

## Plain headings and links — LIVE, 4 November 2026, Codex (Brisbane)

Owner requested removal of decorative 01/02/05 section labels and little arrows next to links, applying to all public pages. Removed the two section-number rendering paths and their decorative rules from DomainPageView/domain-story CSS, plus arrows in domain hero and homepage links. Retained clear blue headings, reading breaks and spacing (44px before the first guide heading), meaningful ordered practical steps, legal numbering and time/measurement formatting. All educational copy, photos, colours, metadata, app links, pricing and app/native settings unchanged. Rule 07 records the permanent public-site preference.

Production https://ironcompassai.com: dpl_5fHPEQUdt3sevyPhQxsARUSSpytA, reported source 850be92aae3117bc474df60ba5524104e220b3ba, branch codex/website-relaunch-20261104, checkout website-relaunch-20261104. Marketing Vercel project prj_fOowaY2ZkZPR56F2Pr3ZArjLBnYM / iron-compass, team team_6NQL6p1c5YCkRtcP1T3dERxN. Exact staged production checked and promoted without rebuild. Rollback dpl_7qJp22jBhiQmrj2vatYnCqnjCSb4. Main remains older; PR #4 preserves the source.

Validation: build/TypeScript, changed-component ESLint and diff checks pass. All 119 generated public pages scanned: no decorative section-number classes and no arrow glyphs in link labels. SEO: 117 indexable pages and matching sitemap URLs, zero audit issues. Local production-build browser checks on Home/Identity/Finance at actual 390/1440 CSS pixels: six cases, one H1, no markers, arrowed links or overflow, correct heading spacing. Authenticated staged HTTP verifies source commit, three pages and served stylesheets. Live Identity and Home verified after promotion; section targets and link behaviour preserved. CLI source stamp identifies the commit but clean-tree status is unknown and exactCommitBuild false. No indexing or conversion uplift claimed.

Next: owner review of plain Identity headings; keep numbered instructions only where they serve a practical purpose.


## Homepage and domain editorial release — LIVE, 4 November 2026, 11:47 AM Brisbane, Codex

Owner approved the full-width home photograph behind the headline, domains before the app walkthrough, richer domain layouts, shorter visual passages without losing content, more purposeful colour and brighter presentation throughout. Photos must look natural, relevant, varied in men/clothes/rooms/light, with believable enjoyment or satisfaction; grief stays quietly warm.

Production https://ironcompassai.com serves dpl_7qJp22jBhiQmrj2vatYnCqnjCSb4, reported source 719364159bc9402c4b3f6c3d162fe74b1c7b75ce, codex/website-relaunch-20261104 in the website-relaunch-20261104 checkout. Marketing project prj_fOowaY2ZkZPR56F2Pr3ZArjLBnYM / iron-compass, team team_6NQL6p1c5YCkRtcP1T3dERxN. Staged production checked and promoted unchanged. Rollback dpl_8z1QpjehYgk83Y3nzWQjCv7UG6AG (the earlier full-width hero release at 080c0451d0cf721c27dd11c1d406e8d86ca8e988). Main remains 997685885f3005c0261575134c057d2a13ba02ef. PR #4 preserves pushed source; do not redeploy older main.

Changes: ApprovedHome and its CSS now use one continuous priority photo (sizes=100vw), a contrast overlay and responsive crop; Ten life domains precedes HomeAppSection. DomainPageView and domain-story CSS provide a split photo-led introduction, descriptive breadcrumb, honest reading time, visible linked contents (sticky on desktop), a 66ch reading column, numbered blue section headings, blue key-passage panels and amber practical-action panels. Longer original paragraphs split only at sentence boundaries. Bright silver #f0f2f5 titles, clearer blue #a6c9e5 guidance, amber attention and red primary actions retain charcoal with lighter blue-charcoal surfaces. Major title/body spacing increased in shared editorial CSS, homepage/app sections and founder note. Domain app feature/plan details, related links, narration wording and full founder story retained.

Photos: lib/domainGuidePhotos.ts curates existing library scenes, with per-section relevance and natural satisfaction; lib/sitePhotos.ts replaces sombre/repetitive directory thumbnails and describes actual scenes in alt text. Eighteen existing photographs have lightweight WebP copies under public/images/domains/editorial (1,647,032 bytes total); original files preserved. No new images generated, no altered testimonials and no claim that models are real customers. Discipline has three different relevant editorial scenes, each once; Finance opens with a brighter office scene. Original homepage hero remains. Picture rules recorded in rule 07 alongside layout/colour direction.

Validation: production build/TypeScript, nine existing tests, changed TS/TSX ESLint and diff checks pass. SEO audit: 119 public pages, 117 indexable, matching 117 sitemap URLs, zero metadata/canonical/social/H1/heading-order/JSON-LD issues. All original rendered paragraph wording and word counts match across all ten domains after rejoining the new reading breaks. Seven guides have roughly 1,776–1,911 paragraph words; Resilience 634, Fall & Rise 622 and Legacy 662 were already shorter (counts include shared page/footer paragraphs); no content was silently removed or padded.

Final local browser QA: Home, Domains, Pricing and all ten guides at observed 390/1440 CSS pixels (26 cases), no overflow, broken completed images or missing contents targets. Earlier eight-width home checks cover 319–1919 CSS pixels. Editorial scene duplicates absent within guides. Practical anchor navigation tested on phone/desktop. Brighter main text/blue/amber/silver combinations on the new panels have minimum 6.75:1 contrast. Home copy controls/status pass a conservative white-photo overlay bound; heading minimum 6.66:1, checked supporting copy/controls/status at least 6.27:1 across phone/desktop.

Authenticated staged HTTP checks verify 18 pages, four served CSS files, correct palette/source commit and byte-identical copies of three representative new images. Preview stays protected; no public share link created. Live homepage and all ten domain guides pass 22 checks at exact 390/1440 CSS pixels after promotion: no overflow, missing targets, broken completed images or duplicate editorial scenes within a guide. Live Finance practice link reaches the warm amber action section. CLI source stamp identifies commit but sourceKind unknown, worktreeDirty null, exactCommitBuild false. App/API/native, Apple settings, pricing, billing and member data unchanged. Search indexing, rankings and conversion uplift not claimed verified.

Next: owner visual review of Home and domain guides; review/merge PR #4 before future main-based releases.


## Silver website hierarchy — LIVE, 4 November 2026

Owner approved charcoal background, silver headings, selective blue accents and red primary actions. Production https://ironcompassai.com serves dpl_5Lp2Ep2cE4pT4iWqjRiexbQ1SEKP, reported source 682fc7d66062d43786e774299bf13404639657a7, branch codex/website-relaunch-20261104, marketing project prj_fOowaY2ZkZPR56F2Pr3ZArjLBnYM, team team_6NQL6p1c5YCkRtcP1T3dERxN. Staged production checked, then promoted without rebuilding. Rollback dpl_D7F7Ev3uTod7DNPcuPc2duHjKxgZ. Main remains older; PR #4 preserves source.

Silver headings #e2e6ec; muted silver subtitles #b5bfcc. Charcoal unchanged. Steel-blue #9eb4c8 guides secondary buttons, links and the Core plan border. Red #ff3434 stays on primary actions and the existing logo AI accent. Domain-specific headings and founder note included. No copy, SEO, pricing, app/API/native or Apple setting changes. Heading contrast 13.21:1 on charcoal and 11.54:1 on cards; blue 6.76:1 on cards; action text 5.60:1 on red.

Build/TypeScript and nine existing tests pass. All 117 indexable pages pass SEO audit and match sitemap. Local production-build browser QA: 18 pages including all ten domains at actual 390/1440 CSS pixels, 36 cases; one H1, all headings silver, no overflow or completed broken images. Authenticated staged requests verify nine pages, served stylesheets, approved palette and commit. Temporary public preview link was rejected by automatic review; no access grant was made, and protected staged HTTP plus local visual checks were used. Live Home, About, Pricing and Discipline checks pass at exact 390/1440 CSS pixels after promotion: silver headings and no overflow. Production host confirms the tested deployment. Source stamp identifies commit but clean-tree status unknown, exactCommitBuild false.


## Founder introduction and full product name — live, 4 November 2026

Owner accepted a brief homepage founder introduction linking to the full About story and explicitly restored the product name Iron Compass AI. Homepage now has two sentences under From the founder, signed Adam, with Why I built Iron Compass AI -> /about#founder-full. Full About story preserved except the product name. Public templates, headings, metadata, publisher data, alt text, print labels and article text now use the full name. Technical identifiers, URLs, narration/audio, charcoal and heading colours unchanged. Brand-only diffs checked for all other public-copy files. Production dpl_D7F7Ev3uTod7DNPcuPc2duHjKxgZ serves 1f5a2df77b7e96afcc4c3c3bb9b6f787f74b6f27 at https://ironcompassai.com. Build/TypeScript, nine tests and 117-page SEO/brand audit pass. Seventeen staged pages at 390/1440 CSS pixels pass 34 overflow, H1, image and brand checks. Founder link and full About story checked at phone/desktop widths. Exact tested build promoted; live deployment/name/intro/charcoal verified. Rollback dpl_6Bkn8Kq6375Mgcbxi7FhPQP3DRm7. CLI source stamp identifies the commit but does not claim clean Git source. Next: review/merge draft PR #4 before future main-based releases; enable the Apple badge only after approval and a verified public listing.
## Charcoal correction — 4 November 2026, live

Owner asked to restore charcoal because near-black felt too stark. Production dpl_6Bkn8Kq6375Mgcbxi7FhPQP3DRm7 is READY at https://ironcompassai.com from a8417aa18eb940f3989d8e570bd0f6252bbd35cf. Exact staged production build checked and promoted without rebuild. Background #1b1f25, section bands #20252c, cards #242a32; muted text #9aa5b4. The homepage now inherits the shared background token. Body text contrast across normal/hover surfaces is at least 7.90:1; muted text at least 4.97:1. Build/TypeScript and nine existing tests pass. Seven representative pages at actual 390/1440 CSS pixels on the staged build: 14 checks, correct charcoal, one H1, no overflow; no browser errors observed. Live homepage/body/band colours and no overflow independently confirmed after promotion. This is a CSS-only presentation change; app, copy, SEO, pricing and Apple settings unchanged. Rule 07 records the website/app design distinction and charcoal palette. Rollback: dpl_BYiYwGsDGWdJzPfrU5998wFZfBMA. Next: use the verified live site; keep this charcoal standard for future website work.

## Charcoal correction — 4 November 2026, prepared

Owner says the pitch-black background is too much and wants charcoal restored. Changed only shared website surface tokens, the homepage hardcoded backgrounds and section-band token; recorded the website/app design distinction in rule 07. Background #1b1f25, band #20252c, cards #242a32, muted text #9aa5b4. Local browser confirms the homepage/body/band values and visibly softer charcoal. Production remains e133e65 / dpl_BYiYwGsDGWdJzPfrU5998wFZfBMA until this candidate passes staged QA. Next: build, stage without public-domain assignment, check representative phone/desktop pages, promote the tested build.


## Website launch repair — 4 November 2026, 10:28 AM Brisbane

The owner requested audit, repair, staged production QA and promotion of the public website. Production is READY at https://ironcompassai.com from dpl_BYiYwGsDGWdJzPfrU5998wFZfBMA, commit e133e65849f46a684fbf4fd2e2584b8a9d53b0cc. The exact staged production build was tested and promoted without rebuilding. Rollback: dpl_7q4qNooqBExEgkaWBtJW3Jcp7wb2.

- Source: codex/website-relaunch-20261104, based on committed local candidate 6a14893. Source is pushed; draft PR #4 preserves it. Main was not overwritten. This handover commit merges main's release-tracking files into the repair branch, keeping the tested app/layout.tsx and styles/editorial.css. navigation-actions.css is retained for history but is not imported; the tested semantic-actions.css remains active.
- Changes: homepage proposition and CTA hierarchy; photo-led website composition; preserved founder note, app screenshots and ten-domain content; reading widths; accessible menu/skip link; explicit monthly price labels and plan links; current Start/Download/Contact/About copy; visible product questions; conditional official Apple badge. Prices unchanged.
- SEO: two original articles recovered by fixing missing opening frontmatter delimiters, with their bodies intact and audio held. Removed 31 empty legacy JSON-LD blocks from rendered MDX; BlogPosting/Breadcrumb/available FAQ data now render in initial HTML. Shared organization/app entity ids, metadata, sitemap dates and robots rules repaired. www now permanently redirects 308 to apex, preserving paths and queries (separate Vercel domain setting; no new build).
- Validation: production Next build/TypeScript pass (local Webpack workaround for Windows Turbopack font fetch; Vercel default cloud build passes). Six architecture tests and changed TS/TSX ESLint pass. 117 indexable pages pass title/description/canonical/OG/Twitter/H1/heading-order/JSON-LD audit and match 117 sitemap URLs. 127 local and live route/link destinations return 200. 22 pages including all ten domains pass 390/1440 staged browser checks (44 cases); additional local 319/768/1024 cases pass. Signup -> Create account and plan links -> /app/pricing verified, without submitting registration or buying. Runtime error/fatal scan returned no matching logs.
- Boundaries: no app/API/native/Apple/billing/database change. No paid AI, account creation, purchase or email submission. Badge remains hidden until NEXT_PUBLIC_IOS_APP_URL is set to a live https://apps.apple.com/ listing. Search indexing, search-console ownership and conversion/retention uplift were not claimed verified.
- Source continuity: this merge keeps main's tracking workflow, prebuild artifact generator, scripts and instructions. The LIVE e133e65 build predates their inclusion on this branch, so production source-version.json is not claimed present. Older app/API/native records below are historical and were not reverified by this website task.

Next action: review/merge PR #4 through the normal repository workflow before future main-based releases; after Apple approval, verify the public listing and enable its badge.

Brisbane date: 29 October 2026. Assistant: ChatGPT/Codex.

## Authorized combined release — in progress

The owner explicitly requested: "ok lets align all of these, test and deploy". This authorizes this release; the earlier hold below is superseded for the tested changes in this release.

- Website base: tracking branch at aae3fc3f48bc0225456c88780477df026b0f21df, including recovered source afa2c955. Website main remains the older baseline until this release is merged.
- Product changes: app/layout.tsx imports styles/navigation-actions.css last; styles/editorial.css no longer forces secondary links red; styles/navigation-actions.css keeps mobile/tablet app access beside the logo, removes adjacent duplicates and styles guidance links; .cursor/rules/07-website-ux.mdc reflects the owner's latest semantic colour roles.
- Tests: production Next build and TypeScript passed; six domain architecture tests and three source-identity tests passed. Built-page Chromium checks passed at 360, 390, 768, 820, 1024 and 1366px: menu interaction, top app access, sticky phone/tablet access, duplicate removal, secondary colours and no horizontal overflow. No stylesheet was injected into these checks.
- Source: this combined release will include the shared source tracking from PR #2. Its branch/commit and workflow identify the pushed source. Production is not claimed until host and served version are checked.
- App: combines PR #3 habit/onboarding work, PR #4 tracking, and the previously uncommitted QA/navigation package. Google button relay and expired-session loading have additional fixes. App tests/build and deployment are being checked independently.
- Important boundary: Cursor recorded uncommitted work on another computer in collab/codex-cursor-launch-audit. That work is unavailable here and is not claimed uploaded. API production and installed native versions remain unverified; web deployment does not update store binaries.

Next action: push the tested combined website branch, align main to it through the reviewed release, and verify the production source version. Continue the app release separately.

## Earlier Cursor checkpoint (preserved for history)


Brisbane time: 29 October 2026, afternoon. Assistant: Cursor. Read this file on GitHub. It replaces the morning checkpoint below for current facts. Unsaved computer edits are not included.

## States

- Local/unpushed: the website recovery checkout was clean and matched the pushed recovery commit. A separate app checkout remains on `collab/codex-cursor-launch-audit` with uncommitted edits. Those edits were not added to this branch.
- Pushed: website recovery `afa2c955b3085319c5d53611567a1dca18f598f2`. Website `main` `590808fe09c2fa03c29d26b07f5342d824943424`. App `main` `445389d2e232c1b02c6deb1f8cf83101431dcdbe`. Habit and onboarding draft `fix/light-full-onboarding-review` `49491a071c5a6a7406255cf0601766c24ec36e1b`, still a separate pull request. This file is on `sync/shared-source-of-truth` in both repositories.
- Tests passed: `node --test scripts/source-status.test.mjs` passed 3 of 3 in both tracking checkouts. After the first push, Source continuity succeeded in both repositories. The app CI workflow also succeeded on `589fd46516b195d6290cd4fa89f0a47a7ad6464d`: the api job built and ran its test command, and the frontend job ran `npm ci`, built, and ran its test command. That is not full app QA.
- Preview deployed: app preview `dpl_7HYvA3X5vQoMCoDHm7YrgCzKqoqa` is ready for `589fd46516b195d6290cd4fa89f0a47a7ad6464d`, repository `afair86/iron-compass-ai`, branch `sync/shared-source-of-truth`. Checked URL: https://frontend-git-sync-shared-source-a745c1-adams-projects-26d15070.vercel.app/auth. The sign-in page loaded on a phone-width view, the stylesheet and script returned HTTP 200, and the script's API host is https://api.ironcompassai.com. No sign-in was submitted. `/app/source-version.json` reports that commit, with `worktreeDirty: true` and `exactCommitBuild: false`, so the build machine was not a clean tree. Website previews remain non-production. This evidence commit is newer than the checked app preview.
- Production deployed: website `dpl_EvccSYnx7gLGVJBDERd5wa4rC8Cu` reports `afa2c955b3085319c5d53611567a1dca18f598f2` at https://ironcompassai.com. Web app `dpl_A8yf4ZxVJeGM1gMC5vUwM7MPM6gr` is still the live command-line deployment and has no Git commit. Public sign-in https://ironcompassai.com/app/auth returned HTTP 200. API health returned HTTP 200. API commit, and the installed phone build, remain unknown.

## What changed

- Connected the existing Vercel project `frontend` (`prj_kru7tmL5GZJTdtCuOUpO6IpyjtAc`) to `afair86/iron-compass-ai`. No second project was created.
- Root directory stays the repository root. Install, build, and output match the root `vercel.json`: install in `frontend`, build with `VITE_WEB_APP_BASE=/app/`, output `frontend/dist`.
- Existing environment names, the website `/app` proxy, and the live web-app deployment were left in place. Production Git builds for the app project are ignored until the owner approves a production deployment.
- Updated this handover and the source map so GitHub shows the live website commit and the still-unknown app production commit.

## Checks

- Vercel reports website project `iron-compass` linked to `afair86/iron-compass`, production branch `main`.
- Vercel reports app project `frontend` linked to `afair86/iron-compass-ai`, production branch `main`, root directory unset (repository root).
- No new app production deployment appeared after the connection. The current production deployment is still `dpl_A8yf4ZxVJeGM1gMC5vUwM7MPM6gr`.
- Source-identity tests passed 3 of 3 in both repositories. No customer record was changed. No migration, native release, or production promotion was run.

## Next action

Leave the live web app and the live website as they are. Production Git builds for the app project stay ignored. The owner can approve a production deployment only after reviewing the checked preview above. Do not deploy website `main`.

## Superseded morning checkpoint

The earlier note said the live website was still command-line deployment `dpl_kDxbSAWPyjDFQrbbwL9JnBfGCwDW` reporting `5d51214c5cc4d18108b77a7a9900fc75e70fd9cd`, and that the app project was not Git-connected. Both statements are out of date. The recovered website commit is now the production deployment named above. The app project is connected, and its production commit is still unknown.
