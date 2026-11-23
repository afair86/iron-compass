# Iron Compass launch coordination

Preserve the repository's existing project, testing, security and release rules
in `.cursor/rules/`; read applicable rules before product edits.

For launch and app/website integration work, read and follow
`SOURCE_OF_TRUTH.md`, `docs/CURRENT_HANDOVER.md`, and
`.cursor/rules/00-launch-handover.mdc` automatically. The GitHub checkpoint is shared
across tools; a computer-local handoff must not be the only current record. Before a meaningful task
ends, reread and update the shared CURRENT HANDOVER with source identity, actual
checks, blockers and next action. Preserve another agent's newer checkpoint.

No production changes, deployment-triggering pushes, releases, spending, saved
live QA reviews or irreversible actions without applicable owner approval.
Never reset/clean existing work or expose credentials/private member content.

## Codex routing and coordination across conversations

These repository-level rules apply to every assistant working from a checkout that includes this file. They do **not** synchronise chat histories or replace a local checkout refresh.

1. **Route before spending tokens.** Use ordinary ChatGPT for standalone strategy, market research, writing, product requirements and read-only investigation that does not need repository execution. For a mixed request, use the existing approved brief and implement only the necessary engineering slice. If Codex is unnecessary, stop tool-heavy work and give a concise handoff to normal ChatGPT.
2. **Check for parallel work first.** Verify this checkout's branch, HEAD, dirty files, latest applicable handover, open PRs and active workstreams before edits. Do not start overlapping implementation or overwrite another conversation's work; report collision or unclear ownership and work read-only until resolved. Keep one authoritative status in the existing GitHub handover, not a chat-specific plan.
3. **Spend deliberately.** Prefer the least expensive capable model/effort, narrow file/context reads, targeted diffs and reusable verified findings. Don't launch parallel agents, broad audits, repeated research, full test suites or paid tools by default. Escalate where complexity, failure risk or essential QA justify it; never compromise required security or release checks merely to save credits.
4. **Respect scope and approvals.** Follow all applicable `.cursor/rules/` instructions and this repository's source/release rules. No unapproved purchases, metered services, production changes, merges, deployments, releases or destructive commands. Never force-push, reset another worker's checkout or expose credentials/member information.
5. **Close with evidence.** Report changed files, exact checks performed or deliberately not run, branch/commit, limitations, blockers, approvals and one next action. Update `docs/CURRENT_HANDOVER.md` at the meaningful checkpoint without deleting newer facts. Mark work *live and verified* only after inspecting the actual deployed version.

A founder request in any conversation does not authorise other conversations to perform unrelated work, and a proposed roadmap idea does not authorise implementation or deployment.
