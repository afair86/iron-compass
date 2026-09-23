# Iron Compass blog standards

Approved reference for **all future Iron Compass AI blogs**.  
Quality benchmark: **5 A.M. Standard** article + **Shift Worker Routine** builder (adapt per topic; do not force that feature set onto unrelated posts).

## Start here

| Document | Use when |
|----------|----------|
| **[IRON-COMPASS-BLOG-EDITORIAL-AND-IMPLEMENTATION-GUIDE.md](./IRON-COMPASS-BLOG-EDITORIAL-AND-IMPLEMENTATION-GUIDE.md)** | Authoritative editorial + implementation standard |
| **[COMPLETION-CHECKLIST.md](./COMPLETION-CHECKLIST.md)** | Short pre-handoff checklist (Done / N/A / Unverified) |
| **[IMAGE-PROMPTS-2026-09-21-FOUR-ARTICLES.md](./IMAGE-PROMPTS-2026-09-21-FOUR-ARTICLES.md)** | AI image prompts + asset mapping for the Sep 2026 four-article set |

## Agent discovery

Cursor loads `.cursor/rules/iron-compass-blog-standard.mdc`, which points at the editorial & implementation guide. Future blog/review/audio tasks should follow that guide automatically.

## Hard rules (summary)

- Explicit approval before publish, deploy, or regenerating approved audio  
- Never serve stale Listen audio against a newer article (`listenAudio: false` until regen)  
- Core takeaways usable without email/account; subscription optional  
- Review markers only on `/review/…`, never on published `/blog/…`  
- Browser-verify real user interactions; separate automated checks from browser checks  
