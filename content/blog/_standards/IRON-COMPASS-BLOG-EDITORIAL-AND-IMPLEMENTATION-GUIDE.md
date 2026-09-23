# Iron Compass AI — Blog Editorial & Implementation Guide

**Status:** Approved reference standard for all future Iron Compass AI blogs  
**Benchmark (quality, not formula):** The 5 A.M. Standard article + Shift Worker Routine builder  
**Canonical live article (when current):** https://ironcompassai.com/blog/5am-standard-own-your-morning  
**Local review pattern:** http://127.0.0.1:3001/review/… and http://127.0.0.1:3001/blog/…  

Use this article as a **quality benchmark**, not a rigid template. Adapt structure and any practical takeaway to the topic. **Do not** force shift-work advice, sleep calculators, or interactive planners into unrelated articles.

Related files:

| File | Role |
|------|------|
| This guide | Authoritative editorial + implementation standard |
| `IRON-COMPASS-BLOG-MASTER-PROMPT.md` | Reusable pasteable brief for a single new article |
| `COMPLETION-CHECKLIST.md` | Short pre-handoff checklist |
| `README.md` | Index for this folder |
| `.cursor/rules/iron-compass-blog-standard.mdc` | Agent instruction that loads this standard |

---

## 1. Purpose

Every new blog should feel like the same product family: calm, useful, honest, and finished enough that a busy reader can act—without hype, without trapping core value behind signup, and without shipping stale audio or broken forms.

Do **not** publish, deploy, push live, send emails, connect new external services, or regenerate approved audio without **explicit user approval**.

Do **not** rewrite unrelated existing blogs merely to “bring them up to standard” unless asked.

---

## 2. Editorial voice

Write like a calm, experienced older brother over coffee.

- Warm without sentimentality  
- Firm without aggression  
- Practical Australian English (no forced slang)  
- Composed, clear, useful  

Never sound like: motivational grind, corporate brand voice, military instructor, therapist monologue, slogan machine, or a computer reading an essay.

Stoic quality comes from composure and clarity—not dramatic depth or trailer-narrator energy. Adapt register to topic (grief quieter; money steadier; fitness practical; leadership grounded). Keep the personality; change the writing. Do not clone 5 A.M. sentence patterns.

Prefer natural narration flow: short paragraphs, spoken transitions, ideas a listener could follow aloud.

### Human feel

The piece should sound and look like a calm person made it. Do not tell the reader it was made by AI.

**Writing**

- Sounds like someone talking, not a template filled in.
- No stacked buzzwords. No “in today’s fast-paced world.” No “it’s important to note.”
- Do not give every paragraph the same length and beat.
- Do not present made-up case studies as real customers. If you use an example, say it is an example.
- Do not end like a brochure (“unlock your potential,” “take the first step on your journey”). Say the next plain action.

**Pictures**

- A real place and a real person: natural light, an ordinary room, a believable face and hands.
- No plastic skin, no extra fingers, no sci-fi glow, no stock power-pose.
- Compass mark stays subtle (a desk object, pin, or plaque). No giant watermark.
- No “AI-generated illustration” line under the photo.
- Change the men from photo to photo. Ages 30 to 60, chosen to fit the page. Mix looks and situations: sporty, business, casual, family, and partnerships. Match the style to the content.
- They should look like they are enjoying the work of getting better — present, pleased, and in the middle of something useful. Not grim, and not posing for a poster.
- Do not repeat the same colours. Vary clothes, rooms, and light so a row of photos does not look like one shoot.

---

## 3. Realistic advice

Advice must account for **work, recovery, family, and changing circumstances**—not a perfect week.

- Do not assume another adult is free, quiet house, fixed start times, or unlimited recovery.  
- Distinguish “ideal week” from “ugly week”; give a shorter honest option.  
- When the roster, caring load, illness, or overtime genuinely removes room, say so. Do not turn every miss into a character flaw.  
- Safety first where relevant (fatigue, driving, medical rest). This site is not a clinical diagnosis.

---

## 4. Examples, calculations, and claims

### Concrete examples
- Label examples as **illustrative**.  
- State **assumptions** explicitly (times, commute, sleep need, who covers handover).  
- **Check the maths** end-to-end (work backwards from departure/shift; confirm wake, block length, sleep opportunity).  
- Never invent clock times in tools when required inputs are missing—say what is missing and give a flexible sequence instead.

### Evidence vs guidance vs illustration
Keep these visibly separate:

| Kind | How to present |
|------|----------------|
| **Evidence / authoritative guidance** | Name the source; link it; do not overclaim (“planning guide, not personal diagnosis”) |
| **General practical guidance** | Clear recommendations framed as judgment calls for the reader’s situation |
| **Illustrative examples** | Worked scenarios with assumptions; not prescriptions |

Health-related claims (sleep ranges, shift-work practices, safety) must use **authoritative links** (e.g. Sleep Health Foundation or equivalent reputable bodies). Prefer primary guidance pages over random blogs.

---

## 5. Site presentation

- Match existing Field Dispatch / stoic-dispatch styling (`styles/stoic-dispatch.css`, blog page shell).  
- Accessible headings: one H1 from the page template; body uses H2+; do not repeat the H1 in MDX.  
- Mobile: readable first scroll; no hero clutter; touch-friendly controls for any tool.  
- Relevant **internal links** to related Iron Compass articles or `/start` / `/app` where they genuinely help—not spam.  
- Unique hero under the H1 (`public/images/blog/<slug>-hero.webp`); do not reuse heroes across posts.  
- No category badge shouting at the top of the article.  
- Subtle Listen control under meta—never a heavy boxed player in the hero.

### SEO and structured data
Use accurate:

- Title / metaTitle  
- Description / metaDescription  
- Stable slug and **canonical** URL (`/blog/<slug>`)  
- OG/Twitter image  
- Existing article + breadcrumb (+ FAQ when present) structured data from `app/blog/[slug]/page.tsx`  

Do not invent fake FAQ schema. Keep dates honest (`date` / `updated`).

---

## 6. Narration and audio

1. Write a **dedicated narration script** that matches the approved article (conversational; no URLs, nav, captions, or mechanical heading announcements).  
2. Preferred path: `content/blog/narration/<slug>.md` (review drafts may live under `content/blog/_reviews/<topic>/`).  
3. Generate MP3 from the narration script—not raw Markdown.  
4. Approved voice: `en-US-ChristopherNeural`, rate `+0%`, pitch `+0Hz`, `audio-24khz-96kbitrate-mono-mp3` → `public/audio/blog/<slug>.mp3`.  
5. Subtle Listen via `ArticleListenButton` (`subtle`); no autoplay; no robotic browser TTS as primary path.

### Stale audio rule (mandatory)
**Never serve an outdated recording as the current article.**

If the article changes substantially after the MP3 was cut:

- Regenerate Christopher audio from the updated narration (**needs explicit approval**), **or**  
- Temporarily hide Listen with frontmatter `listenAudio: false` until regen is approved.

Update the narration script to match the article even when audio regen is waiting. Bump `audioVersion` when a new MP3 ships.

---

## 7. Reader takeaway (when it suits)

Offer a useful takeaway when it **genuinely fits** the topic, for example:

- Printable / downloadable checklist  
- Simple worksheet  
- Interactive tool (rules-based planner, etc.)  

**Adapt the feature to the topic.** Do not force a shift-work calculator, sleep widget, or “Build Your …” tool into articles where it would feel bolted on. A short static checklist is often enough.

### Access and email
- **Core tools and downloads must work without email or account.**  
- Subscription / email capture may sit **after** the useful result as an **optional** invitation.  
- Never require signup to generate, view, print, or download the core takeaway.  
- Prefer session-only storage for interactive answers unless the user explicitly downloads/prints. Do not send tool answers for marketing.

---

## 8. Interactive tools — product rules

When a tool is justified:

- Transparent assumptions and **honest limitations**  
- Specific conflict / error copy (e.g. a work-hours clash is not fixed by shortening a morning block)  
- Screen, print, and download results must **agree** on times, conflicts, and key numbers  
- Print: multi-page safe; hide chrome, subscribe, and actions; avoid absolute-position “visibility:hidden” tricks that clip long content  
- Review-only build markers (`showReviewBuild`) must **never** appear on published `/blog/…` routes  

### Time-input lessons (from the Shift Worker Routine work)

Treat these as standing regression expectations for any time-entry UI:

| Situation | Required behaviour |
|-----------|-------------------|
| **Rapid entry** | Values typed quickly still reach form state; Generate without pausing still uses them |
| **Deliberate clear** | Emptying an optional field must clear state—**never** ignore empty `onChange` events to “protect” against flicker if that blocks intentional clears |
| **Clear both ends of an optional range** | Clearing start and end must remove pair validation and related conflicts |
| **Clear only one end** | Show a clear validation message (add the other time, or clear this one) |
| **Incomplete input** | Keep the editable value; explain the error; do not silently wipe or invent a time |
| **Immediate submission** | Change a time and Generate/submit **without** clicking elsewhere first—blur must not be required for correctness (normalize on submit from latest state) |
| **Edit generated results** | Edit → change values → Regenerate must use the new values |
| **Native `type="time"` unreliability** | If native pickers drop empties or HH:MM:SS quirks break planning, prefer accessible text `HH:MM` (accept reasonable variants like `0630` / `8:00`) consistent with site styling |

Investigate browser findings as reproduction reports—not final diagnoses. Own the path: input → state → validation → planner. Helper-unit tests alone do not close a browser input bug.

---

## 9. Local review, verification, and handoff

### Workflow
1. Draft under review (`content/blog/_reviews/…` and/or `/review/…`) without overwriting published MDX until approved.  
2. Local preview on the running site; confirm the preview serves the files you changed (version marker on **review only** if needed).  
3. Meaningful **browser** verification of the failing user interactions—not only planner/unit helpers.  
4. Concise **review handoff** for the owner / independent reviewer.  
5. Publish/deploy only after **explicit approval**.

### Handoff contents (copyable)
- Review URL and how to recognise the latest version  
- What failed and confirmed cause (or what remains uncertain)  
- What changed  
- Browser scenarios tested and observed results  
- Automated checks—**clearly separated** from browser tests  
- Anything still unverified  
- Files changed  
- Confirmation that nothing was published  

### Verified vs unverified
In every handoff and checklist, distinguish:

- **Performed:** checks you actually ran (URL, script name, PASS/FAIL, what you saw)  
- **Unverified:** print dialog visuals not inspected, third-party review pending, audio not regenerated, etc.

Never call an unverified browser issue “resolved.”

---

## 10. Publication gate

Requires explicit user approval:

- Overwriting published MDX  
- Deploy / push live  
- Regenerating or replacing approved article audio  
- Sending emails or wiring new external services for the article  

Until approval: keep Listen hidden if audio is stale; keep review markers off the published path.

---

## 12. Reusable lessons (added 2026-09-21)

### Practical tools in published MDX
- Embed with frontmatter `practicalTool: <id>` and a `<!-- PRACTICAL_TOOL -->` marker in the body.
- Keep tool ID validation in a **server-safe** module (`lib/practicalToolIds.ts`). Do not import `"use client"` helpers into `app/blog/[slug]/page.tsx`.
- Tool UI stays client-side; page shell stays a Server Component.

### Imagery
- Store prompts + asset mapping under `content/blog/_standards/` (see `IMAGE-PROMPTS-*.md`).
- Frontmatter: `image`, `imageAlt`. Do not print an “AI-generated illustration” credit under photos. Human feel for pictures: see §2 — a real place and a real person; no plastic skin, extra fingers, sci-fi glow, or stock power-pose. Also vary age (30–60), style (sporty, business, casual, family, partnerships), enjoyment, and colour so photos do not all look alike.
- Optimise to WebP with `sharp`; unique heroes — never reuse across posts.
- **Brand compass (from now on):** incorporate the approved Iron Compass mark **subtly** in AI-generated scenes (desk object, pin, faint plaque, soft background detail). Do not stamp a giant watermark, hologram, or readable fake UI. Canonical source: `brand/iron-compass-mark-source.png`. Header/app logos are updated via `node scripts/apply-brand-mark.mjs`.

### Audio
- Generate with `node scripts/generate-article-audio.mjs <slug>` (Christopher). Requires `node-edge-tts` installed.
- If TTS cannot run, set `listenAudio: false` — never attach unrelated MP3s.

### Money worksheet maths
- Always label weekly vs monthly. Convert with weekly×52÷12 and monthly×12÷52. Verify worked examples in `scripts/verify-blog-money-math.mts`.

### Deploy gate
- Explicit approval required. Agent deploy needs `VERCEL_TOKEN` in `.env.local` (`npm run deploy:check`).
- Inspect dirty tree before deploy so unfinished review work is not shipped accidentally.

---

## 11. Deliverables for a new article


1. Title, slug, SEO meta  
2. MDX draft (review-ready)  
3. Unique hero asset  
4. Narration script matching the draft  
5. Christopher MP3 **or** `listenAudio: false` until regen approved  
6. Optional takeaway (checklist / worksheet / tool) only if it suits the topic  
7. Local preview URL + review handoff  
8. After approval: publish, enable Listen if audio is current  

Pasteable topic brief wrapper: `IRON-COMPASS-BLOG-MASTER-PROMPT.md`  
Pre-handoff ticks: `COMPLETION-CHECKLIST.md`
