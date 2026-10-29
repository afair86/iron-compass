# Iron Compass — shared source and release status

Start here before changing or reporting on Iron Compass. GitHub holds pushed source and handovers. Vercel serves deployed builds. Neither can see unsaved/unpushed edits on a computer.

## Current source map

| Component | Repository / working source | Deployed state verified 29 October 2026 |
| --- | --- | --- |
| Website | [Recovered ten-domain source](https://github.com/afair86/iron-compass/tree/recovery/current-live-website), `afa2c955b3085319c5d53611567a1dca18f598f2` | Production still reports `5d51214c5cc4d18108b77a7a9900fc75e70fd9cd`, CLI deployment. Recovery includes newer local changes and is not promoted. |
| Website production branch | `main`, baseline `590808f` | Old GitHub source. Do not merge/redeploy it over the ten-domain site by accident. |
| Web app | [App repository](https://github.com/afair86/iron-compass-ai), root build config with `frontend/` and `shared/` | Existing Vercel `frontend` project is CLI-deployed, not yet Git-connected. Its exact production commit is unknown. |
| API | Same app repository, `apps/api/` | Production commit/provider connection not verified here. Keep separate from website/web deployment claims. |
| Installed iOS/Android app | Same app repository, `frontend/` native builds | Installed build and source commit unverified. Updating the website or web app does not replace an installed build. |

Machine-readable baseline: [release/source-map.json](release/source-map.json). Current work and checks: [docs/CURRENT_HANDOVER.md](docs/CURRENT_HANDOVER.md). Product claims still follow the relevant repository's `docs/PRODUCT_STATE.md`.

## Operating workflow

1. Fetch GitHub before starting. Inspect the exact branch, HEAD, upstream and dirty state. Read this file and CURRENT_HANDOVER; do not assume `main` is the live source.
2. Work on a focused branch from the verified working source. Preserve another person's uncommitted work. Push small reviewable checkpoints when authorized so other tools can see them.
3. Update CURRENT_HANDOVER in the same commit: what changed, exact tests, remaining failures/unknowns and one next action. Use the commit history and workflow run as the commit identity; do not paste a self-referential SHA into its own commit.
4. Vercel's existing Git integration produces branch previews for the website. Preview-ready means a build exists, not that product QA passed. Do not equate a preview with production.
5. Publish only through the approved release workflow. After release, verify the host's commit and served version artifact. Keep unknown source/build fields unknown until checked.

## Automated evidence

The **Source continuity** GitHub Action runs source-identity tests and writes a job summary on pushes/PRs. It reads this repository's GitHub commit checks and deployment records using the built-in read-only token. It does not deploy, change customer data, create new credentials or consume AI credits.

Deployment-status/manual events start automatically only once this workflow exists on the repository's default branch. Until the reviewed baseline reaches that branch, use its push/PR runs; do not claim a default-branch status service is already active.

Future website builds run `prebuild` to create `/source-version.json`. App builds use `/app/source-version.json` once the matching app changes are released. The artifacts identify the reported commit, source kind and dirty/unknown/conflicting metadata. They contain no environment dumps or credentials. A current live deployment predating this setup will not have the new artifact yet.

## Completion criteria

- Current working code is pushed and linked here.
- Each Vercel project is connected to its intended repository and root build directory.
- Preview/production releases show an identifiable commit, with relevant checks attached.
- The website's recovered source has been reviewed before any production-branch transition.
- API and native releases have their own verified commit/build records.

The website source is now recovered and Git-connected. The remaining app connection, production-baseline transition and API/native version verification are explicit open items, not silent assumptions.
