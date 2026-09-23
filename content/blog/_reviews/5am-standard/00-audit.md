# Audit: 5 A.M. Standard — article + Listen audio

**Article URL:** https://ironcompassai.com/blog/5am-standard-own-your-morning  
**Repo paths inspected:** `app/components/ArticleListenButton.tsx`, `app/blog/[slug]/page.tsx`, `lib/speechText.ts`, `scripts/generate-article-audio.mjs`, `content/blog/5am-standard-own-your-morning.mdx`, `public/audio/blog/5am-standard-own-your-morning.mp3`  
**Date:** 2026-09-20  
**Status:** Findings only. Live article not overwritten by this review pack.

---

## 1. Listen / Play Audio component

**File:** `app/components/ArticleListenButton.tsx`

Client component mounted under the article hero in `app/blog/[slug]/page.tsx`.

Current controls when an MP3 exists:
- Play
- Pause
- Stop (resets to start)

Missing today:
- Progress / seek bar
- Elapsed and total duration
- Playback speed
- Skip forward / back
- Loading state
- Resume from last position
- Sticky / floating player
- Keyboard shortcuts beyond native focus
- Paragraph follow-along / highlighting

If no MP3 file exists on disk, the UI shows “Audio for this article is being prepared” and does **not** fall back to browser speech (robotic TTS was deliberately disabled).

---

## 2. How article text is obtained for narration

**Generation path (what produced the live MP3):**
1. Read `content/blog/<slug>.mdx`
2. Parse frontmatter with `gray-matter`
3. Strip Markdown via a local `markdownToSpeechText()` inside `scripts/generate-article-audio.mjs`
4. Prefix with the frontmatter `title`
5. Send plain text to Edge TTS in chunks

**Runtime page path:**
- `markdownToSpeechText(post.content)` from `lib/speechText.ts` is still passed into the button as `text`
- That `text` prop is **not used for playback** when `audioSrc` is present
- It only exists for a future / unused browser-speech fallback

There is **no dedicated narration script file** for this article today.

---

## 3. Generated in advance or dynamic?

**Pre-generated.**

- Offline script writes `public/audio/blog/<slug>.mp3`
- Site serves the static file
- Playback does **not** call TTS in the browser or on a server at click time

Estimated live file length: ~5.5 MB, ~7–8 minutes at 96 kbps.

---

## 4. TTS method in use

| Layer | Method |
|---|---|
| Live Play button | HTML5 `<audio>` playing a static MP3 |
| How the MP3 was made | Microsoft Edge neural TTS via `node-edge-tts` (unofficial Edge Read Aloud API) |
| Browser `speechSynthesis` | Not offered in the current UI when MP3 exists; disabled as primary path |

**Cost today:** Free / no API key.  
**Risk:** Unofficial Microsoft endpoint; can timeout or change without notice. Package is installed as **extraneous** (not listed in `package.json`).

No OpenAI, ElevenLabs, Amazon Polly, or Google Cloud TTS is wired in.

---

## 5. Current voice and audio config

From `scripts/generate-article-audio.mjs`:

| Setting | Value |
|---|---|
| Voice | `en-AU-WilliamNeural` |
| Language | `en-AU` |
| Format | `audio-24khz-96kbitrate-mono-mp3` |
| Rate | `-8%` (slightly slower) |
| Pitch | `-3Hz` (slightly lower) |
| Timeout | 90s per chunk |
| Chunk size | ~1600 characters |
| Retries | up to 4 |

No SSML is used. No expressive/prosody styles beyond rate/pitch. Chunks are binary-concatenated MP3 parts (usually works, but can create tiny glitches at joins).

---

## 6. Narration source type

Narration is generated from **stripped Markdown body + title**, not from:
- a dedicated spoken script
- rendered HTML
- visible DOM text

So it is closer to “read the article file after cleanup” than “a written-for-speech narration.”

---

## 7. Unwanted content that can enter narration

**Stripped well enough:**
- Fenced code blocks
- Images (`![...](...)`)
- Markdown emphasis markers
- Most heading markers (heading text remains)
- Table rows (whole line removed)

**Still can / does enter narration:**
- Heading text read as normal sentences (mechanical section announcements)
- Link **labels** (URL paths removed, but words like “Discipline & Mindset”, “Start Your Compass” remain)
- FAQ Q&A wording
- Closing CTAs / internal promo lines
- Dramatic slogan lines that read poorly aloud
- Duplicate title (page H1 already present; generator also prefixes title)

**Does not enter:**
- Nav chrome
- Frontmatter metadata fields other than title
- Image file paths

---

## 8. Regenerated on every playback?

**No.** The MP3 is static. Each Play reuses the same file. No paid generation on click.

---

## 9. Desktop / mobile playback expectations

Because playback is a normal MP3 via HTML5 audio:
- Desktop Chrome / Edge / Firefox: should play after user tap
- Android Chrome: usually fine
- iPhone Safari: should play after user gesture; background/lock-screen behaviour depends on OS and whether a proper `<audio>` element / Media Session is used (currently a JS `new Audio()` instance — limited Media Session / lock-screen metadata)
- Seeking / speed / duration: **not exposed in UI**, even though the underlying MP3 supports them

No automated cross-device QA suite exists in-repo for this player.

---

## 10. Can the current system deliver natural high-quality narration?

**Partially — better than browser TTS, not yet “older brother” quality.**

Strengths:
- Neural voice (not robotic OS TTS)
- Australian male voice available free
- Pre-generated file = reliable playback once hosted
- Rate/pitch can be tuned without paid APIs

Limits:
- Flat delivery; limited natural emphasis
- No dedicated spoken script → essay cadence
- Chunk joins can feel slightly discontinuous
- Player UX is minimal (play/pause/stop only)
- Unofficial provider reliability
- No article↔audio version lock (edit article, old audio stays until manually regenerated)
- Current article still contains slogan-y / AI-flavoured lines that sound worse when spoken

**Honest quality note:** A full MP3 exists and was generated technically. This audit does **not** claim the live voice “sounds natural” from a human listening review. Owner listening approval is still required.

---

## Defects / gaps (priority)

1. No dedicated narration script (reads cleaned Markdown).
2. Player lacks seek, duration, speed, skip, resume, sticky mode.
3. No article revision ↔ audio version association.
4. `node-edge-tts` not pinned in `package.json`.
5. Editorial lines that sound artificial when spoken (“Body online”, “morning is theft”, “world spends you”, etc.).
6. First-person claims (“I’ve watched…”, “Examples I’ve seen…”) are not verified author biography.
7. Paragraph follow-along not possible without timestamps/subtitles (Edge can optionally save subtitles — unused today).
8. Closing CTAs and internal links are narrated.

---

## Simplest improvements without paid services

1. Keep Edge neural pre-generation (free).
2. Write a dedicated narration `.txt` / `.md` and generate from that.
3. Upgrade the HTML5 player UI (seek, speed, skip, duration, resume).
4. Soften / rewrite essay language for spoken cadence.
5. Add `audioVersion` / hash in frontmatter so stale audio can be flagged.
6. Generate short A/B voice samples for owner approval before regenerating the full article.
7. Optionally enable Edge subtitle export later for rough paragraph sync — only if quality is worth the complexity.

## Paid alternatives (recommendation only — do not activate)

| Option | Quality potential | AU male | Cost shape | Notes |
|---|---|---|---|---|
| Keep Edge TTS | Good enough baseline | Yes (William) | $0 | Unofficial; tune script + voice |
| Amazon Polly Neural | High | Limited AU | Per char | Solid commercial rights |
| Google Cloud TTS | High | Some AU | Per char | Good SSML |
| Azure Speech (official) | High | Strong AU | Per char | Closest official cousin to Edge voices |
| ElevenLabs | Very high | Custom clone possible | Subscription / credits | Best “human” feel; needs approval + rights check |

**Recommendation before spending:** improve script + player + Edge sample first. Only move to paid if owner rejects Edge after listening to a controlled sample.
