# Narration / audio update note (draft v3)

Status: narration updated; live MP3 still old — Listen hidden until regen approved

## Done locally
1. Rewrote `02-narration-script.md` to match `05-article-draft-v3.mdx`.
2. Set `listenAudio: false` on the published MDX and the review draft.
3. Review page and published Listen control hide the old Christopher MP3 (no stale playback).

## Still needs your approval
1. Regenerate Christopher MP3 from the updated narration (`scripts/generate-article-audio.mjs` / Edge Christopher path).
2. Set `listenAudio: true` (or remove the flag) on the published MDX.
3. Bump `audioVersion` on the Listen button (e.g. `christopher-v3`).
4. Do **not** auto-replace the live MP3 before that approval.

Until then, Listen stays hidden so readers are not served mismatched audio.
