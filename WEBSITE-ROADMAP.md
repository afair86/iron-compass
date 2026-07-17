# Iron Compass AI — Website Roadmap

**Last updated:** 2026-07-12  
**Workflow:** Audit → Plan → Wait → Execute **one** task → Verify → Complete → Update this file → Wait

---

## Status

| ID | Item | Status |
|----|------|--------|
| **K1** | Confirm production `/app` proxy healthy | **DONE** (2026-07-12) |
| **C1** | CTA taxonomy fix (`/app` vs `/start` vs `/download`) | **DONE** (2026-07-12) |
| S1 | Canonical host (`www` vs bare) + align `SITE_URL` | Next (pending approval) |
| H3 | Official support email set | Pending |
| C3 | Public Pricing page (Free / Core / Pro) | Pending |
| N1 | Analytics | Pending |
| C2 | Email capture wired | Pending |
| L2 | Rebuild or remove `/products` stub | Pending |
| X1 | Mobile contrast / readability | Pending |

Full category backlog lives in the approved audit plan (chat). Only **one** ID executes per approval.

---

## K1 — Verification log

- `https://ironcompassai.com/app` → **200**, product HTML (`#root`, command-interface meta)
- `https://ironcompassai.com/app/dashboard` → **200**, same shell
- Upstream APP frontend → **200**
- `www` → bare host **308** for `/app` (tracked under **S1**, not a K1 failure)
- `INTEGRATION.md` updated so it no longer claims `/app` 404s

**Pass criteria met.** Product door is open for conversion work (C1+).

---

## C1 — Verification log

**Taxonomy locked in `INTEGRATION.md`:**

| Intent | Labels | Target |
|--------|--------|--------|
| Product / member | Open the App, Start Your Rise, Start Inside the App, Start in the App, Become a Member | `/app` |
| Education funnel | Start Program, Start the Program, Start Your Compass, footer Start | `/start` |
| Install / waitlist | Download the App | `/download` |

**Fixed (were wrongly pointing at `/start` or `/download`):**
- About — “Start Inside the App” → `/app`
- Contact — “Become a Member” + “Open the App” → `/app`
- Domains hub — “Start Inside Iron Compass” → `/app`
- Start page — “Start in the App” → `/app` (kept “Download the App” → `/download`)

**Left intentional:** blog/articles “Start the Program” / “Start Your Compass” → `/start`; article “Download the App” → `/download`; nav/footer ProductAppLink already correct.

Deployed to production with this change.
