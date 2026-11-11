# Iron Compass — shared source and release status

Start here before changing or reporting on Iron Compass. GitHub holds pushed source and handovers. Vercel serves deployed builds. Neither can see unsaved or unpushed edits on a computer.

## 12 November 2026 — combined website release deployed; app unchanged

Owner authorised deployment of completed updates conditional on preserving the app in review. Live https://ironcompassai.com serves exact clean source 08d49ff3f27949d72c5074292452e50321159b11, deployment dpl_5gZ4ZfctAkcx3xJ9LCCwS9HYJyjm, from release/website-growth-20261112 (PR #13). This supersedes preparation/held statements below. Natural copy, free seven-day pack/offline download, confirmed five-message email sequence and the approved first three connection articles/local planners are published. The next three local drafts/audio are excluded. Do not promote the older blog-only artifact or older main over this combined release.

Exact-source CI Website verification 43100443089 and Source continuity 43100443177 both succeeded. Local: 70 tests pass/1 optional external-store test skipped, build/TypeScript pass, lint zero errors/five unchanged warnings, smoke 202 HTTP/121 sitemap metadata/26 redirects. Production-settings stage and initial public content artifact each passed 315 hosted checks. Final enabled live artifact passed 21 source/page/download/app parity/redirect/health/route-guard checks. Browser at widths390/1440: no horizontal overflow/broken loaded article images, all three sample planners generated results, explicit email consent required, app opens sign-in, no browser errors observed.

Email production namespace starter-v1 has separate secrets/store identity, canonical links, verified Resend sender, active signed production callback and existing authenticated daily worker. The production-profile sequence passed on the protected exact-source artifact before promotion using only Resend official delivered fixture: four requests/one confirmation; actual emailed GET read-only; POST starts welcome once; day2/day5/day8 once despite repeated worker calls; actual emailed unsubscribe/RFC8058 and permanent no-reenrollment pass. Only the official fixture timestamps/queue were accelerated; not an eight-day soak. Five fixture emails delivered; two official bounce/complaint callbacks suppressed durable records and removed ciphertext. Earlier owner-Gmail preview acceptance separately verified all five inbox messages with SPF/DKIM/DMARC PASS. No customer test messages. Customer delivery now enabled; no native provider automation/second delivery path. Never run old preview cleanup against production; preserve reservations/suppression. Analytics/GA4 experiment remains off pending a measurement account; customer conversion outcomes unmeasured. No paid tier added.

Separate app deployment rechecked dpl_C4aT41aYohywsLBMeP11Ut2u2vJk unchanged. App/auth/reset HTML, JS/CSS hashes and security headers match pre-release capture; API health200. No app/API/native/auth/billing, dependencies/lockfile, next.config redirects/rewrites or Apple review configuration changes. This does not certify Apple's review outcome. Scoped final deployment runtime error/fatal query returned no groups: point-in-time only.

Rollback website: dpl_HK4q9t8pbSJWYjCx2sGWezp7x833 / source25c68be9ae55855efb755884f249f413490c678f; retain app upstream. To pause email, set production campaign enabled=false, rebuild/stage tested source and promote after checks; preserve signing secrets/store/unsubscribe processing. Never erase reservations/suppressions/store epoch. Automatic domain assignment remains disabled. Later documentation commits do not change live runtime identity08d49ff.

Sanitised evidence is outside public repo in sibling outputs/growth-*20261112*. Private continuous-improvement record website-growth-release-20261112.json preserves 276 original checks/9 backlog items and26 additive controls; original app/key/classification and unrecovered-source holds remain. No cross-chat message sent without requested explicit permission.

## Historical website update — 4 November 2026

The live website is dpl_Gsrwo9DsF3oaP8j3qF51qyFQ7qy3 at https://ironcompassai.com, reporting runtime commit 6f31847a1d946b85de2dd8d566cb0468bceeeb43. Domain photography now shows complete responsibility/action scenes across Home, directory and all ten guides, with varied natural colour and corrected framing. Three new illustrative images support Finance, Resilience and Fall & Rise; founder photographs and app screenshots are unchanged. All three practical-guide hubs and five standalone guides now use the current editorial standard, with relevant images, linked contents, daily/weekly actions, correct app contexts and updated search structure. Fall & Rise now addresses major life setbacks, Stoic recovery and longer-term rebuilding with integrity, with matching website descriptions, metadata and Comeback screenshots. Old mismatched narration controls are hidden. The owner-requested outdoor readability pass lifts charcoal surfaces and silver reading text while preserving colour roles. The owner's real family photograph appears on About, Plans and the small homepage founder note. A dedicated app overview is live at /download with stronger responsibility-led messaging, real screenshots, plan labels, FAQ/schema and strategic navigation links. Pricing cards and founder wording are unchanged. The earlier premium public editorial/SEO work across all 88 blog articles and domain guides remains intact, with Facebook linked and Instagram deferred. 117 indexable URLs pass search metadata/schema/sitemap checks. The private staged production build was tested and promoted unchanged. Source is pushed on codex/website-relaunch-20261104 in draft PR #4; main remains older 997685885f3005c0261575134c057d2a13ba02ef and must not replace this release. See CURRENT_HANDOVER for exact QA, source-stamp limitations and rollback. Live app changes and ad campaigns await separate owner instructions. The table below is the preserved 29 October historical baseline, not a fresh verification of app/API/native states.

## Historical source map

Verified on 29 October 2026, Australia/Brisbane. Read [release/source-map.json](release/source-map.json) for the machine-readable states. Current work and checks: [docs/CURRENT_HANDOVER.md](docs/CURRENT_HANDOVER.md).

| Component | Pushed source | What is actually deployed |
| --- | --- | --- |
| Website | [Recovered ten-domain source](https://github.com/afair86/iron-compass/tree/recovery/current-live-website) `afa2c955b3085319c5d53611567a1dca18f598f2` | Production deployment `dpl_EvccSYnx7gLGVJBDERd5wa4rC8Cu` at https://ironcompassai.com reports that same commit. |
| Website `main` | `590808fe09c2fa03c29d26b07f5342d824943424` | This is the GitHub production-branch baseline. It is older than the live site. Do not deploy it over https://ironcompassai.com. |
| Web app | [App repository](https://github.com/afair86/iron-compass-ai) root, with `frontend/` and `shared/`. Pushed `main` is `445389d2e232c1b02c6deb1f8cf83101431dcdbe`. | The existing Vercel project `frontend` is now connected to this repository. Live production is still command-line deployment `dpl_A8yf4ZxVJeGM1gMC5vUwM7MPM6gr`, and its commit is unknown. |
| API | Same app repository, `apps/api/` | https://api.ironcompassai.com/health returned HTTP 200. The deployed commit is unknown. |
| Installed iOS/Android app | Same app repository, `frontend/` native builds | Installed build and commit are unknown. A web deployment does not replace an installed app. |

## How to read a checkpoint

Each checkpoint must say which of these is true, separately:

- Local or unpushed: edits on a computer that GitHub cannot see.
- Pushed: a commit that exists on GitHub.
- Tests passed: the exact check that passed. A source-identity test is not full product QA.
- Preview deployed: a non-production Vercel build and its commit.
- Production deployed: the deployment currently serving customers, and its commit when the host reports one.

If a commit or build was not checked, leave it unknown. Do not copy an older deployment forward.

## Operating workflow

1. Fetch GitHub before starting. Inspect the exact branch, HEAD, upstream and dirty state. Read this file and CURRENT_HANDOVER. Do not assume `main` is the live source.
2. Work on a focused branch from the verified working source. Preserve another person's uncommitted work. The app habit and onboarding work stays on `fix/light-full-onboarding-review` and must not be mixed into this tracking branch.
3. Update CURRENT_HANDOVER in the same commit: what changed, exact tests, remaining failures or unknowns, and one next action. Use the commit history and workflow run as the commit identity. Do not paste a self-referential SHA into its own commit.
4. The website project `iron-compass` is GitHub-connected to `afair86/iron-compass`. The web-app project `frontend` is GitHub-connected to `afair86/iron-compass-ai`, using the repository root and the root `vercel.json` build. Pushes to non-production branches create previews. Preview-ready means a build exists, not that product QA passed.
5. Production Git builds for the web app are ignored until the owner approves a production deployment. That keeps the current live web app in place. Do not remove that protection, merge to `main`, or promote a deployment without that approval.
6. Publish only through the approved release workflow. After release, verify the host's commit and served version artifact. Keep unknown source and build fields unknown until checked.

## Automated evidence

The Source continuity GitHub Action runs source-identity tests and writes a job summary on pushes and pull requests. It reads this repository's commit checks and deployment records with the built-in read-only token. It does not deploy, change customer data, create credentials, or consume AI credits.

Deployment-status and manual events start automatically only once this workflow exists on the repository's default branch. Until the reviewed baseline reaches that branch, use its push and pull-request runs. Do not claim a default-branch status service is already active.

Future website builds run `prebuild` to create `/source-version.json`. App builds use `/app/source-version.json` once that app commit is built. The artifacts identify the reported commit, source kind, and dirty, unknown, or conflicting metadata. They contain no environment dumps or credentials. The current live website and live web app predate this artifact, so its absence there is expected.

## Completion still open

- The recovered website is pushed and is the live site. GitHub `main` has not been moved to that commit.
- Both Vercel projects are connected to their repositories. The web app uses the repository root.
- A non-production app preview, `dpl_7HYvA3X5vQoMCoDHm7YrgCzKqoqa`, was checked for commit `589fd46516b195d6290cd4fa89f0a47a7ad6464d`. Its version file says the build tree was dirty, so it is not marked an exact clean build. Production approval is still open.
- API and installed-app versions remain unknown.
