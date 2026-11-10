# CURRENT HANDOVER

## 10 November 2026 — website safety release live (current)

The owner-authorised website-only release is live at https://ironcompassai.com. Production deployment `dpl_8ruQDPfVUea9hY3W22Z1z7PPpSby` serves exact source `04f1d544043277f9b6f0fe9660a402cc3f1b77c1` on `release/website-safety-20261110`, builtAt2026-11-10T02:18:14.715Z, worktreeDirty=false, metadataConflict=false, exactCommitBuild=true. This checkpoint is documentation after release; do not confuse its newer branch head with the live runtime commit. Main was not merged or deployed. Previous preparation notes below are historical.

Exact-commit Linux verification [run42741488147](https://github.com/afair86/iron-compass/actions/runs/42741488147) passes52tests, locked installation, production audit, lint(0errors/5existingwarnings),build/TypeScript, calculations and198HTTPchecks. Protected preview `dpl_DRk5qRmvJa8LRsKUCyxGgB1CuoyL`, staged production and live domain each pass299hosted records:117publicpages,169assets,anonymousapp/assets,reviewnoindex,404and invalid-only form rejections. Public indexable pages do not inherit preview noindex. Browser checks cover dialog/Escape/focusreturn, mobilemenu/pricing,livehomewidth390/nooverflow/no brokenloadedimages, andStartfree→Sign in→home. No real signup/contact/reset/login/purchase/OAuth action.

App separation verified: existing app alias still points to `dpl_C4aT41aYohywsLBMeP11Ut2u2vJk`, matching before release. AppJS/CSSchecksums unchanged, separateAPIhealth200before/after, www308preservespath/query. No app/API/database/auth/billing/native/credential/Apple submission change or key access occurred. Approved website design/prices/imagery and production app destination preserved. Domain-classification request remains unsent.

Website automatic custom-domain assignment is disabled, so future builds require explicit promotion; preview protection is preserved. The public app URL variable is branch-preview-only and matches the existing production destination. Production runtime variables were retained and a production-context artifact was tested before moving traffic. Installation is locked to npmci. Source-provenance repair includes only the blank template and equality-guarded routing formatting correction; real dirty/unknown changes still fail exact-source tests.

Rollback: website `dpl_7EGek3iAxR3fmVWc82mmqMCfA5gr` / reported source50563a8725e9aa1ccb6274eecefac0dd58cea253. No rollback was needed or rehearsed against live visitors. Private account/provider persistence and actual Apple review outcome are not certified here. Next: continue only evidence-backed website maintenance from this release branch; preserve app/Apple holds and manual stage→verify→promote workflow. Detailed local audit/raw evidence remains outside this public release checkout.

## 10 November 2026 — authorised website safety release candidate

Hosted diagnostics now confirm the remaining modification is `vercel.json` formatting only (`semanticMatch:true`, no changed top-level keys). Prebuild restores committed bytes only if parsed JSON is identical; changed routing or unrelated dirty files remain failures, covered by a synthetic Git fixture test. Real env files remain excluded. CLI deployment helper now passes its existing token via environment only, never process arguments. These are website build/release safeguards, with no app/runtime routing change.

The template exception removes the observed `.env.example` deletion, confirmed by the next build's zero ignored files, but source still reports dirty. Do not call that issue resolved. Add build-only Git status/path diagnostics (no file contents or environment values) to identify the remaining source mutation before production promotion.

First clean release commit `1f424a63faeff68e0d2caa410acdf8d69d819e09` passed Linux verification run42740421518 (51tests, audit, lint, build, calculations and198HTTPchecks). Protected preview `dpl_2sYWoJyM2TfJ72wJU9EonCP59tRw` is READY and source matches, but its stamp remains dirty. Build logs identify the one removed tracked file as `.env.example`, excluded by `.vercelignore`. Add an exact exception for that blank, non-secret template while retaining `.env*` exclusion for real configuration; then verify clean source on the rebuilt hosted artifact. The earlier preview is not the release artifact. No public traffic/app/Apple change has occurred.

Owner authorises website deployment provided the submitted Apple launch is unaffected. Website-only branch `release/website-safety-20261110` is based on integration commit `6fe119abe3bae7dba3516ed8bda3c0c72fe84123`. The separate app, API, database, authentication, billing, native builds, credentials and Apple submission are outside this release. The prepared domain-classification request remains unsent.

Candidate adds bounded and validated public forms, truthful acknowledgement/error handling, native POST fallback, explicit no-store responses, browser request deadlines, calculator/tool boundaries, article-link corrections, article-name validation, audio failure/accessibility repairs and checklist print selectors. Scoped public security headers exclude `/app`; existing app proxy destination and production settings must remain unchanged. Existing approved website design, pricing, imagery and app screenshots are retained. Website dependency pins/tooling override and explicit framework roots were tested locally.

Local checks before this release:51tests, build/TypeScript, lint with0errors/5existingwarnings,198loopbackHTTPchecks,296isolated-package records, app/provider outage/recovery and browser form/storage fixtures. Detailed raw audit evidence remains local and is not included in this public release checkout. The required diagnostic build-identity helper is included for its test. The existing verification workflow now runs on pushes to this release branch on Linux; it does not deploy or alter shared services.

Current public production at preparation: `dpl_7EGek3iAxR3fmVWc82mmqMCfA5gr`, reporting website source `50563a8725e9aa1ccb6274eecefac0dd58cea253`. Main remains older and must not replace it. Nothing from this candidate is live yet. Next: verify the exact clean commit in Linux CI and a protected hosted preview, stage a production-context build without assigning domains, test public/app-route boundaries, then promote only that tested website artifact. Keep rollback ID and record the actual final deployment/source. Do not claim tests of signed-in sessions, purchases, real provider persistence or Apple review from anonymous/fixture checks.

## Maintenance integration verified - 9 November 2026, Australia/Brisbane

Assistant: ChatGPT through connected GitHub/Vercel tools, without a Work/Codex handoff. The owner authorised safe non-production implementation and automation. Production releases, spending, advertising publication and Apple submission changes remain excluded.

Active candidate: [draft PR #8](https://github.com/afair86/iron-compass/pull/8), branch `integration/website-maintenance-20261109`, targeting `codex/website-search-20261105`, NOT the older main branch. Read the current PR head before continuing. This checkpoint changes documentation only; the runtime, dependencies, workflow and tests are those of tested commit `bcf578df8c49b902728bdb07b7689bdb06397a57`. Any later commit needs its own appropriate checks. Do not treat an older green result as proof for unreviewed changes.

## Verified evidence

The combined candidate passed GitHub Actions [run 42548938564](https://github.com/afair86/iron-compass/actions/runs/42548938564), job `128939957487`, on Node 24.22.2:
- Locked dependency installation passed; production dependency audit returned zero published vulnerabilities in that run. This is not a complete security assessment.
- All 21 tests passed: 14 existing tests and seven new harness tests.
- Lint passed with zero errors and five pre-existing warnings.
- Next.js 16.4.5 build and TypeScript passed; 129 generated entries.
- Existing financial-calculation and shift-routine checks passed.
- Local HTTP/HTML smoke suite passed: seven key pages, 117 sitemap URLs, 26 redirects, 16 static assets, four screenshot dialogs and matching homepage feature links, source identity, missing-page 404 and three synthetic app-proxy routes. Total 174 local requests; no live login, purchase or customer records touched.
- Local build source matched bcf578df, metadataConflict=false, exactCommitBuild=true.
- Source continuity run `42548938575` passed independently.

Vercel preview `dpl_9UgY48SfNe1swN3KgXWvEw1Qv7JT` is READY for bcf578df at `https://iron-compass-huruoyxc7-adams-projects-26d15070.vercel.app`. Authenticated HTTP reads confirmed source-version.json and /app/auth return 200. The app entry returned its expected HTML with app asset paths; no account or form was submitted. Hosted source reports the expected commit and no metadata conflict but worktreeDirty=true/exactCommitBuild=false. Do not describe the hosted build as reproducibly clean; that remains a release-traceability limitation. Deployment Protection was not disabled. The authenticated fetch integration used its temporary deployment access mechanism.

## Preserved source and scope

Original commits remain parents of the candidate:
- PR #6 optimisation: `0a89802ba1dba139aabbee09313cb918a802bd65`.
- PR #5 maintenance: `8bee2f1c69aae58e279f1b25af3f49956a78d86b`; exact package manifest, lockfile and maintenance report reused.
- PR #7 initial verification: `1df8aee6f6a7bc7150c48e550812328a5c235d44`; its earlier gate also passed in run42546994752.

Existing imagery, product text, pricing, homepage structure, routes and runtime changes remain those already reviewed in PR #6. The prior full handover is archived byte-for-byte at [docs/archive/CURRENT_HANDOVER_PRE_INTEGRATION_20261109.md](archive/CURRENT_HANDOVER_PRE_INTEGRATION_20261109.md). No existing branch was overwritten or force-pushed, and no customer computer checkout was modified.

New automation files: `.github/workflows/website-verification.yml`, `scripts/ci/website-smoke.mjs`, `scripts/ci/website-smoke.test.mjs`. See [WEBSITE_AUTOMATION_20261109.md](WEBSITE_AUTOMATION_20261109.md). CI has read-only repository permissions, SHA-pinned actions, a timeout and duplicate-run cancellation. It performs no deployment and uses a loopback-only synthetic app upstream. No npm dependency or AI API job was added. Existing service allowances still apply to builds/tests; no new subscription or credit purchase was made.

Public app URL variable `PRODUCT_APP_UPSTREAM_URL` was added only to this integration preview branch (variable `deOpOwG5si8NQEfM`). Production variables and credentials were not changed.

## Continuing oversight

The existing Founder Brief, Weekly Intelligence and AI Efficiency Audit schedules were retained. Their prompts now reference this PR/source record and require exact-commit test and deployment evidence, direct integrations first, no repeated build for unchanged code, and clear separation of tested/preview/live states. They remain reporting automations, not autonomous release agents. Business metrics or Apple API data must be labelled unavailable when not actually connected.

## Boundaries and remaining work

Production alias was independently checked at `dpl_7EGek3iAxR3fmVWc82mmqMCfA5gr`, source `50563a8725e9aa1ccb6274eecefac0dd58cea253`; do not substitute the current main branch, which is older. No live alias, production environment, app/API/database, Apple build69, ad or payment was changed.

These checks are NOT enforced branch protection or deployment gates. They run on candidate PR updates; they are not default-branch scheduled production monitoring. HTML checks do not replace browser interaction/accessibility or real subscription tests. Existing PR #6 browser evidence predates this combined build. Five lint warnings and the pre-existing audio-review filesystem-tracing warning remain; do not hide them or force unrelated upgrades to obtain a cosmetically clean report.

Read-only app CI review found main's `.github/workflows/ci.yml` permits `--passWithNoTests` for frontend/API. That is a coverage risk, not evidence that tests are missing. Its iOS TestFlight workflow is manual-dispatch only. No app workflow or native build has been changed; identify the authoritative release source and actual executed tests before modifying them.

Next engineering priorities are hosted source-provenance verification and proportionate browser/regression review before a separately approved production release, then evidence-backed app test coverage. Existing analytics plan and first-update backlog remain authoritative starting points; do not rebuild or re-audit completed work. Keep the original PRs for provenance and avoid merging their changes twice.
