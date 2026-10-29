# CURRENT HANDOVER

Brisbane date: 29 October 2026. Assistant: ChatGPT/Codex. Read this on GitHub before continuing. This is the shared repository checkpoint; the earlier Windows-only LAUNCH-HANDOFF file was unavailable in this environment and has not been overwritten.

## Source identity

- Website recovered working source: `recovery/current-live-website` at `afa2c955b3085319c5d53611567a1dca18f598f2`.
- This setup is on a separate `sync/shared-source-of-truth` branch, based on that source. See its commit/run for current identity.
- Production website: deployment `dpl_kDxbSAWPyjDFQrbbwL9JnBfGCwDW`, reported source `5d51214c5cc4d18108b77a7a9900fc75e70fd9cd`, CLI. Production branch remains `main` (`590808f` baseline).
- Recovery contains additional saved local changes; not byte-identical to the deployed baseline. It must remain a preview until reviewed.
- Website Vercel/GitHub connection verified. Web app project `frontend` is not listed as Git-connected; exact deployed app SHA unknown. API/native build identities remain unverified.

## Changes in this setup

- Added SOURCE_OF_TRUTH.md, release/source-map.json and this shared handover.
- Added source-status script, focused tests and a read-only GitHub Action reporting source/check/deployment evidence.
- Added a prebuild version artifact so future served website builds can be compared with a commit.
- Updated launch instructions to read the GitHub handover rather than depend solely on a computer-local file.

## Actual checks

- Recovered branch and parent source verified through GitHub; Vercel confirms a Git-created branch preview.
- Current production deployment and production branch checked separately from that preview.
- Focused identity tests pass for missing source, hosted metadata without .git, dirty working tree and conflicting commit metadata. No provider/member data was used.
- No production promotion, domain change, migration or installed-app release was performed.
- Full website build/browser QA for the recovered source and setup preview remain to be verified; a successful identity test is not that QA.

## Open work / next action

Finish connecting the existing Vercel `frontend` project to `afair86/iron-compass-ai` at repository root, preserving its existing environment and domains. Browser settings access needs Vercel authentication; the connector cannot reconnect an existing unlinked project. Then verify its branch preview and exact source commit before changing any live upstream.

Keep the earlier habit/onboarding draft PR #3 and the later QA/navigation follow-up distinct. The follow-up package is not yet merged/deployed, and the reported native onboarding failure remains unconfirmed.
