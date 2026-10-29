# Iron Compass — shared source and release status

Start here before changing or reporting on Iron Compass. GitHub holds pushed source and handovers. Vercel serves deployed builds. Neither can see unsaved or unpushed edits on a computer.

## Current source map

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
