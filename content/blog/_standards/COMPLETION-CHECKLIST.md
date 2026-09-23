# Blog task completion checklist

Use before asking for publication approval.  
**Benchmark:** 5 A.M. Standard + Shift Worker Routine (quality bar, not a forced template).  
**Full standard:** `IRON-COMPASS-BLOG-EDITORIAL-AND-IMPLEMENTATION-GUIDE.md`

Mark each item **Done**, **N/A**, or **Unverified**. Never tick Done for work you did not actually perform.

---

## Editorial

- [ ] Voice: calm, firm, practical; natural narration flow
- [ ] Advice accounts for work, recovery, family, changing circumstances
- [ ] Examples are illustrative, with explicit assumptions
- [ ] Calculations checked end-to-end (if timing/math is present)
- [ ] Evidence / general guidance / illustrative examples kept distinct
- [ ] Health-related claims have authoritative links (or claim removed)
- [ ] Structure and takeaway adapted to **this** topic (no forced shift-work tool)

## Human feel

The piece should sound and look like a calm person made it. Do not tell the reader it was made by AI.

- [ ] Writing sounds like someone talking, not a template: no stacked buzzwords, no “in today’s fast-paced world”, no “it’s important to note”, no perfectly even paragraph rhythm
- [ ] No made-up case studies presented as real customers; the close does not sound like a brochure
- [ ] Pictures look like a real place and a real person: no plastic skin, no extra fingers, no sci-fi glow, no stock power-pose
- [ ] Compass mark stays subtle (desk object, pin, or plaque); no giant watermark; no “AI-generated illustration” caption; the reader is not told the piece was AI-made

## Presentation & SEO

- [ ] Matches site Field Dispatch styling; accessible heading hierarchy
- [ ] Mobile layout checked in a real viewport or browser
- [ ] Relevant internal links only where useful
- [ ] Title, description, slug, canonical, OG image accurate
- [ ] Structured data still appropriate (no fake FAQ)

## Audio

- [ ] Narration script matches the approved article draft
- [ ] Live Listen either matches current audio **or** is hidden (`listenAudio: false`)
- [ ] No outdated MP3 served as the current article
- [ ] Audio regenerated only with explicit approval (or left hidden)

## Takeaway (if any)

- [ ] Checklist / worksheet / tool genuinely suits the topic
- [ ] Core use works without email or account
- [ ] Subscription (if present) is optional and after the result
- [ ] Validation honest; limitations stated
- [ ] Screen, print, and download results agree

## Time inputs (if any time fields)

- [ ] Rapid entry reaches state
- [ ] Deliberate clear works (including clearing both ends of an optional range)
- [ ] Incomplete input stays editable with a clear error
- [ ] Submit without blur uses latest values
- [ ] Edit → change → regenerate uses new values

## Review gate

- [ ] Local preview URL serves the changed files
- [ ] Browser scenarios that mattered were actually exercised
- [ ] Automated checks listed separately from browser checks
- [ ] Concise review handoff prepared
- [ ] Review banners / build markers absent from published route
- [ ] Explicit approval obtained before publish/deploy

---

## Verification log (required)

Fill this in so “Done” is auditable. Example:

| Check | Performed? | Notes |
|-------|------------|--------|
| Local URL opened | Yes / No | e.g. http://127.0.0.1:3001/review/… |
| Browser scenarios | Yes / No / Partial | list scenarios |
| Unit / script checks | Yes / No | e.g. `npx tsx scripts/verify-….mts` → PASS |
| Print layout | Yes / No / Emulated only | |
| Download matches screen | Yes / No | |
| Listen hidden or current | Yes / No | |
| Still unverified | — | list leftovers |

**Anything still unverified:**  
_…_
