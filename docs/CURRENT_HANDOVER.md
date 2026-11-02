# CURRENT HANDOVER

Brisbane time: 2 November 2026, 5:15 pm. Assistant: Cursor. Read this file on GitHub. It replaces the 29 October checkpoint below for app, API and iPhone facts. Unsaved computer edits are not included.

## States

- Local/unpushed: the live web app was deployed from the local snapshot `webapp-account-recovery-20261030` (no Git commit). Its pre-release source is backed up in the shared ChatGPT project under `checkpoints/2026-11-02-toolkits/web-snapshot-backup`.
- Pushed: app `main` `1cadad9e7be912b705159ec2955cb819ca8d0fa7` (fast-forward from `c683da34`). iPhone release branch `codex/release-privacy-native-20261030` `683ed3923a2bbf2c9de34cdf3de69861705f1c9e` (fast-forward from `1f0d4651`). API branch `cursor/toolkit-knowledge-api` at the same API commit.
- Tests passed: app client 125 of 125 suites, 1208 of 1208 tests, and the /app build. API 63 of 63 suites, 510 of 510 tests, and the production typecheck. Web snapshot 77 of 77 suites, 924 of 924 tests, and its build. GitHub CI on `1cadad9e` succeeded.
- Preview deployed: none.
- Production deployed: API on Railway, `1cadad9e`, reported successful; https://api.ironcompassai.com/health returned HTTP 200. Web app `dpl_CGUvEustNjeMANYm7iA1Gc1PDHch` serves https://ironcompassai.com/app with `assets/index-4fb4fe9f.js`. iPhone TestFlight build 51 uploaded from `683ed392` (run https://github.com/afair86/iron-compass-ai/actions/runs/41403983888). Apple processing and phone checks are not verified. No App Store submission.

## What changed

- All eight tools rebuilt as interactive tools under their existing names, with charts that fit every width and checks that keep tests, patterns and plans followable.
- Plans: Free has no tools and no AI. Core has five tools (Today's preparation, Weekly awareness, Weekly review, Identity snapshot, Forecast). Elite has all eight (adds 90-day strategy, Comeback protocol, 90-day review). Enforced in the app and the API.
- Pricing page rewritten to sell Core and Elite with prices unchanged, and small dismissible upsells in Today, Habits, Journal, Tools and Account.
- Red actions now #e02e2e with white text (4.57:1), one amber #e7ba72, no neon blue.
- Web sign-in shows Google's own button instead of clicking a hidden one.
- Elite coaching model routing is built but switched off: `IC_COACHING_MODEL_ELITE` is not set.

## Next action

Owner or ChatGPT: install TestFlight build 51 on a phone, complete one real Google sign-in on https://ironcompassai.com/app/auth, and confirm the Railway `GOOGLE_CLIENT_ID` includes the web client ending `6u4n8cgrhtce`. Submit to the App Store only with the owner's approval.

## Superseded 29 October checkpoint

The web app was command-line deployment `dpl_A8yf4ZxVJeGM1gMC5vUwM7MPM6gr` and the API commit was unknown. Both statements are out of date.
