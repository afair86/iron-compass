# CURRENT HANDOVER

## Isolated maintenance integration - 9 November 2026, Australia/Brisbane

Assistant: ChatGPT using connected GitHub/Vercel tools, not a Work handoff. Owner authorised continued safe non-production implementation and automated verification. Production release, spending and Apple submission changes remain excluded.

Branch: `integration/website-maintenance-20261109`. The commit containing this checkpoint identifies the exact source; do not embed a self-referential SHA. No local customer checkout was modified. Local test harness: `/mnt/data/iron-compass-verification`; full repository build is delegated to the existing GitHub Actions runner because this session cannot clone the repository over its network.

Sources combined, with original history retained as commit parents:
- Optimisation PR #6: `0a89802ba1dba139aabbee09313cb918a802bd65`.
- Maintenance PR #5: `8bee2f1c69aae58e279f1b25af3f49956a78d86b`; its exact package manifest, lockfile and maintenance report are reused.
- Initial verification PR #7: `1df8aee6f6a7bc7150c48e550812328a5c235d44`; verification workflow extended rather than duplicated.

Initial verification PR #7 is now independently confirmed successful: GitHub Actions run `42546994752`, job `128934022610`, passed clean install, production dependency audit, source tests, lint and build. This is evidence for that earlier commit, not the new combined candidate.

New work: `.github/workflows/website-verification.yml`, `scripts/ci/website-smoke.mjs`, `scripts/ci/website-smoke.test.mjs`, this checkpoint and `docs/WEBSITE_AUTOMATION_20261109.md`. Prior handover content is preserved byte-for-byte in [the archive](archive/CURRENT_HANDOVER_PRE_INTEGRATION_20261109.md). Existing product changes, imagery, content, SEO and pricing are otherwise preserved from PR #6.

The new harness syntax check and seven self-tests pass locally on Node 22.16.0. CI uses Node 24 to match Vercel's configured major version. CI checks the existing repository tests plus the harness tests, lint, production dependencies, build, sitemap/routes/metadata/assets/redirects and synthetic app proxy. No new npm packages or AI API jobs are added. A GitHub check is a verification signal, not an enforced branch-protection or Vercel release gate.

Vercel public app upstream variable `deOpOwG5si8NQEfM` was added only for this integration preview branch. Production variables and secrets were not changed. CI always builds and tests with a loopback-only synthetic upstream, and refuses a manifest pointing app rewrites to a live host.

Production alias was verified before implementation at `dpl_7EGek3iAxR3fmVWc82mmqMCfA5gr`, source `50563a8725e9aa1ccb6274eecefac0dd58cea253`. Main remains older; no main ref, live alias, native build, database, live form, purchase, ad or member record changed. Hosted preview and combined CI results are pending verification at this commit.

Next action: open/read the combined draft PR, inspect its exact-head Actions result and preview, resolve any test failures on this branch, and report the verified candidate. A production release needs explicit approval for the tested candidate; do not merge to main as a shortcut.
