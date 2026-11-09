# Automated website verification

This integrates the existing maintenance and optimisation work without changing production or redoing the site. Original PRs #5, #6 and #7 remain available for provenance; this candidate is based on their exact commits, not the older main branch.

## Automatic checks

`Website verification gates` runs on pull request updates and manual dispatch, not on every background report. It checks out the exact PR head, has contents-read permissions only, uses SHA-pinned actions, cancels obsolete duplicate runs and has a 20-minute timeout. There is no production deployment command, new dependency, paid AI call, live account or secret-bearing test step. Runner/build usage remains subject to existing service allowances; no new subscription was purchased.

Checks: lockfile install; high/critical production dependency audit; existing Node tests plus seven harness self-tests; lint; production build and TypeScript; blog/shift calculations; and a local HTTP smoke suite.

The smoke suite checks seven key pages for title, description, canonical host, one H1 and parseable structured data; four screenshot dialogs and matching feature links; built CSS/JS assets; robots; all sitemap URLs (capped at 500); static redirects; missing-page 404; built commit identity; and three app proxy paths, including a query string. It refuses external sitemap hosts and nonlocal app upstream rewrites.

Run with Node 24 and the existing locked dependencies:

```sh
npm ci --no-audit --no-fund
node --test tests/*.test.mjs scripts/source-status.test.mjs scripts/ci/*.test.mjs
PRODUCT_APP_UPSTREAM_URL=http://127.0.0.1:4311 NEXT_TELEMETRY_DISABLED=1 npm run build
node scripts/ci/website-smoke.mjs
```

## Evidence and limits

The initial, separate PR #7 gate passed in run 42546994752. The new combined candidate must pass its own run before claiming success. Local harness self-tests passed; full build/HTTP results are not inferred from those unit tests.

This is not browser/visual accessibility testing, a penetration test, a live login or payment test, or field conversion/performance evidence. Existing PR #6 browser evidence predates integration; material runtime changes may require renewed browser QA. Dependency audit coverage is limited to published advisories and installed dependency data.

The checks currently operate on this candidate, not as default-branch scheduled monitoring. They do not block production by themselves: branch protection and deployment gates are separate controls not changed here. The existing production source remains intentionally untouched until a specific release is approved.

The preview's public app upstream is branch-scoped. CI uses a local stub and never submits forms or touches customer accounts. Source stamps can report a dirty build tree after generated files; do not call a build reproducibly clean unless the recorded evidence establishes it.
