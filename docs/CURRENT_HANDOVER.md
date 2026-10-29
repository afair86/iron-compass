# CURRENT HANDOVER

Brisbane time: 29 October 2026, afternoon. Assistant: Cursor. Read this file on GitHub. It replaces the morning checkpoint below for current facts. Unsaved computer edits are not included.

## States

- Local/unpushed: the website recovery checkout was clean and matched the pushed recovery commit. A separate app checkout remains on `collab/codex-cursor-launch-audit` with uncommitted edits. Those edits were not added to this branch.
- Pushed: website recovery `afa2c955b3085319c5d53611567a1dca18f598f2`. Website `main` `590808fe09c2fa03c29d26b07f5342d824943424`. App `main` `445389d2e232c1b02c6deb1f8cf83101431dcdbe`. Habit and onboarding draft `fix/light-full-onboarding-review` `49491a071c5a6a7406255cf0601766c24ec36e1b`, still a separate pull request. This file is on `sync/shared-source-of-truth` in both repositories.
- Tests passed: `node --test scripts/source-status.test.mjs` passed 3 of 3 in both tracking checkouts before this commit. That does not prove website or app QA. The GitHub Action for this commit starts after the push.
- Preview deployed: website preview `dpl_7BqNVVMUAgSKkEWmNJWHTrUMBEGd` is the recovered commit. Website preview `dpl_2JGD7jNxbs5fZJ3qZS9JQq4Ah2x4` is the previous tracking commit `4c5f30fd3bbee13942fe11add084e768c256ebe1`. The app branch preview for this commit does not exist until after the push, so it is unknown here.
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

Push this non-production branch, then open the app preview Vercel creates for it. Confirm the repository, branch, commit, sign-in page, assets, and API host. Leave production approval until that preview is shown.

## Superseded morning checkpoint

The earlier note said the live website was still command-line deployment `dpl_kDxbSAWPyjDFQrbbwL9JnBfGCwDW` reporting `5d51214c5cc4d18108b77a7a9900fc75e70fd9cd`, and that the app project was not Git-connected. Both statements are out of date. The recovered website commit is now the production deployment named above. The app project is connected, and its production commit is still unknown.
