# Iron Compass — shared source and release status

Start here before changing or reporting on Iron Compass. GitHub holds pushed source and handovers. Vercel serves deployed builds. Neither can see unsaved or unpushed edits on a computer.

## Current source map

App, API and iPhone rows verified on 2 November 2026; website rows last verified on 29 October 2026, Australia/Brisbane. Read [release/source-map.json](release/source-map.json) for the machine-readable states. Current work and checks: [docs/CURRENT_HANDOVER.md](docs/CURRENT_HANDOVER.md).

| Component | Pushed source | What is actually deployed |
| --- | --- | --- |
| Website | [Recovered ten-domain source](https://github.com/afair86/iron-compass/tree/recovery/current-live-website) `afa2c955b3085319c5d53611567a1dca18f598f2` | Production deployment `dpl_EvccSYnx7gLGVJBDERd5wa4rC8Cu` at https://ironcompassai.com reports that same commit. |
| Website `main` | `590808fe09c2fa03c29d26b07f5342d824943424` | This is the GitHub production-branch baseline. It is older than the live site. Do not deploy it over https://ironcompassai.com. |
| Web app | The toolkit release is app commit `683ed3923a2bbf2c9de34cdf3de69861705f1c9e`, ported into the local web snapshot `webapp-account-recovery-20261030`. | Command-line deployment `dpl_CGUvEustNjeMANYm7iA1Gc1PDHch` at https://ironcompassai.com/app since 2 November 2026. It has no Git commit. Rollback target: `frontend-efcikfa5z`. |
| API | App repository `main` `1cadad9e7be912b705159ec2955cb819ca8d0fa7`, `apps/api/` | Railway reported success for `1cadad9e` on 2 November 2026; https://api.ironcompassai.com/health returned HTTP 200. No migration. |
| iPhone app | `codex/release-privacy-native-20261030` `683ed3923a2bbf2c9de34cdf3de69861705f1c9e` | TestFlight build 51 uploaded on 2 November 2026. Apple processing and phone checks are not verified. Not submitted to the App Store. Installed build is unknown. |

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
- The installed phone version remains unknown. TestFlight build 51 still needs Apple processing, phone checks and owner approval before any App Store submission.
- The live web app is still a command-line deployment from a local snapshot, not from a pushed commit.
