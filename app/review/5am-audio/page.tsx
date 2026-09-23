import "@/styles/stoic-dispatch.css";
import fs from "fs";
import path from "path";
import { MDXRemote } from "next-mdx-remote/rsc";
import matter from "gray-matter";
import type { Metadata } from "next";
import PageShell from "@/app/components/PageShell";
import { PageContainer } from "@/app/components/LayoutPrimitives";
import ArticleListenButton from "@/app/components/ArticleListenButton";

export const metadata: Metadata = {
  title: "LOCAL REVIEW — 5 A.M. Audio (do not publish)",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

function readText(rel: string) {
  return fs.readFileSync(path.join(process.cwd(), rel), "utf8");
}

function sampleExists(name: string) {
  return fs.existsSync(path.join(process.cwd(), "public", "audio", "blog", "_samples", name));
}

const VOICE_SAMPLES = [
  {
    id: "A",
    file: "cmp-a-william-current.mp3",
    title: "A — Current William (live settings)",
    hint: "en-AU-WilliamNeural · rate −8% · pitch −3Hz — what live audio used.",
  },
  {
    id: "B",
    file: "cmp-b-william-improved.mp3",
    title: "B — William improved settings",
    hint: "Same AU William · natural rate/pitch (not slowed or deepened).",
  },
  {
    id: "C",
    file: "cmp-c-andrew-conversational.mp3",
    title: "C — Andrew (US conversational)",
    hint: "en-US-AndrewNeural via same free Edge path — often more conversational.",
  },
  {
    id: "D",
    file: "cmp-d-ryan-gb.mp3",
    title: "D — Ryan (GB mature male)",
    hint: "en-GB-RyanNeural · slight −2% rate — alternate free mature male.",
  },
] as const;

/** Free-only second pass after A–D did not hit the mark. */
const FREE_ROUND_2 = [
  {
    id: "E",
    file: "free2-e-brian.mp3",
    title: "E — Brian (US)",
    hint: "en-US-BrianNeural — often warmer / less announcer-like than Guy.",
  },
  {
    id: "G",
    file: "free2-g-guy.mp3",
    title: "G — Guy (US)",
    hint: "en-US-GuyNeural · slight −2% — common mature US narration voice.",
  },
  {
    id: "H",
    file: "free2-h-christopher.mp3",
    title: "H — Christopher (US)",
    hint: "en-US-ChristopherNeural — clearer, slightly formal.",
  },
  {
    id: "I",
    file: "free2-i-connor-ie.mp3",
    title: "I — Connor (Irish)",
    hint: "en-IE-ConnorNeural — different accent, still free Edge neural.",
  },
  {
    id: "J",
    file: "free2-j-thomas-gb.mp3",
    title: "J — Thomas (GB)",
    hint: "en-GB-ThomasNeural — British male alternative to Ryan.",
  },
  {
    id: "L",
    file: "free2-l-william-spoken-punct.mp3",
    title: "L — William + spoken punctuation",
    hint: "AU William natural settings, same text with softer pauses (… / —).",
  },
  {
    id: "M",
    file: "free2-m-piper-ryan.wav",
    title: "M — Piper Ryan (offline free)",
    hint: "Fully free local Piper en_US-ryan-medium. Different engine than Edge — usually less polished, but no API cost.",
  },
] as const;

const SCRIPT_SAMPLES = [
  {
    file: "script-original-william.mp3",
    title: "Original-style narration",
    hint: "Slogan-heavy / essay cadence from the published approach. Same William settings as B.",
  },
  {
    file: "script-improved-william.mp3",
    title: "Improved spoken narration",
    hint: "Rewritten for conversation. Same William settings as B — so you hear writing difference only.",
  },
] as const;

export default function FiveAmAudioReviewPage() {
  const draftRaw = readText("content/blog/_reviews/5am-standard/01-article-draft.mdx");
  const { content: draftBody } = matter(draftRaw);
  const narration = readText("content/blog/_reviews/5am-standard/02-narration-script.md")
    .split("\n")
    .filter((line) => !line.startsWith("#"))
    .join("\n")
    .trim();

  const missing = [...VOICE_SAMPLES, ...FREE_ROUND_2, ...SCRIPT_SAMPLES]
    .filter((s) => !sampleExists(s.file))
    .map((s) => s.file);

  return (
    <PageShell>
      <PageContainer width="narrow">
        <div className="ic-dispatch space-y-10 py-10">
          <header className="space-y-4">
            <p className="ic-dispatch-label">Local review only · not indexed · not live</p>
            <h1 className="ic-page-title">5 A.M. Standard — audio &amp; editorial review</h1>
            <p className="ic-dispatch-lede">
              One page to compare voices, compare narration writing, read the improved article, and test the
              upgraded player. Nothing here replaces the live article until you approve.
            </p>
            <p className="text-sm text-[color:var(--ic-stone)]">
              Live article remains:{" "}
              <a className="underline" href="https://ironcompassai.com/blog/5am-standard-own-your-morning">
                ironcompassai.com/blog/5am-standard-own-your-morning
              </a>
            </p>
          </header>

          <section className="ic-listen space-y-3">
            <h2 className="ic-section-title text-xl">How to use this page</h2>
            <ol className="list-decimal pl-5 space-y-2 text-[color:var(--ic-stone)] leading-relaxed">
              <li>Play samples A–D with the same passage — pick the voice that feels least “AI”.</li>
              <li>Then play original vs improved narration — same voice settings, different writing.</li>
              <li>Scroll the article and use the sticky player controls (seek, speed, skip, resume).</li>
              <li>Tell me which voice + which narration to ship. Do not publish until you say so.</li>
            </ol>
          </section>

          {missing.length > 0 ? (
            <section className="ic-listen">
              <p className="ic-listen__error">
                Missing samples: {missing.join(", ")}. Run{" "}
                <code>node scripts/generate-voice-comparison.mjs</code>
              </p>
            </section>
          ) : null}

          <section className="space-y-4">
            <h2 className="ic-section-title text-xl">1. Voice comparison (same passage)</h2>
            <p className="text-[color:var(--ic-stone)] leading-relaxed">
              Same ~70–80 second excerpt from the improved narration. Only the voice/settings change.
              Only one sample plays at a time.
            </p>
            <div className="space-y-4">
              {VOICE_SAMPLES.map((sample) =>
                sampleExists(sample.file) ? (
                  <ArticleListenButton
                    key={sample.file}
                    title={sample.title}
                    hint={sample.hint}
                    audioSrc={`/audio/blog/_samples/${sample.file}`}
                    audioVersion={`review-${sample.id}`}
                    enableSticky={false}
                    compact
                  />
                ) : null,
              )}
            </div>
            <div className="ic-listen">
              <p className="ic-listen__label">Paid providers</p>
              <p className="ic-listen__hint">
                You chose free-only for now. Paid samples stay off until you approve a provider and add a
                key.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="ic-section-title text-xl">1b. Free round 2 (new voices)</h2>
            <p className="text-[color:var(--ic-stone)] leading-relaxed">
              Same passage again. Fresh free voices after A–D. Start with <strong>E (Brian)</strong> and{" "}
              <strong>M (Piper)</strong> — most different from the first set.
            </p>
            <div className="space-y-4">
              {FREE_ROUND_2.map((sample) =>
                sampleExists(sample.file) ? (
                  <ArticleListenButton
                    key={sample.file}
                    title={sample.title}
                    hint={sample.hint}
                    audioSrc={`/audio/blog/_samples/${sample.file}`}
                    audioVersion={`review-${sample.id}`}
                    enableSticky={false}
                    compact
                  />
                ) : null,
              )}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="ic-section-title text-xl">2. Script comparison (same voice)</h2>
            <p className="text-[color:var(--ic-stone)] leading-relaxed">
              Both use William at natural rate/pitch. Difference is writing only.
            </p>
            <div className="space-y-4">
              {SCRIPT_SAMPLES.map((sample) =>
                sampleExists(sample.file) ? (
                  <ArticleListenButton
                    key={sample.file}
                    title={sample.title}
                    hint={sample.hint}
                    audioSrc={`/audio/blog/_samples/${sample.file}`}
                    audioVersion={`review-script-${sample.file}`}
                    enableSticky={false}
                    compact
                  />
                ) : null,
              )}
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="ic-section-title text-xl">3. Upgraded player test</h2>
            <p className="text-[color:var(--ic-stone)] leading-relaxed">
              Full controls: play/pause, seek, speed, ±15s, restart, resume from last position, sticky bar
              when you scroll past this block. Use sample B (or your favourite) below, then scroll the
              article.
            </p>
            {sampleExists("cmp-b-william-improved.mp3") ? (
              <ArticleListenButton
                title="Player test — William improved"
                hint="Scroll down after pressing play to check the sticky bar."
                audioSrc="/audio/blog/_samples/cmp-b-william-improved.mp3"
                audioVersion="review-player-test"
                enableSticky
              />
            ) : null}
          </section>

          <section className="space-y-4">
            <h2 className="ic-section-title text-xl">4. Recommended fixes &amp; costs</h2>
            <div className="ic-listen space-y-3 text-[color:var(--ic-stone)] leading-relaxed">
              <p>
                <strong className="text-[color:var(--ic-paper,#f3efe6)]">Free path (current system):</strong>{" "}
                Keep pre-generated Edge neural MP3s. Ship a dedicated spoken script (not stripped Markdown).
                Prefer natural rate over “slower + deeper.” Best free candidates on this page: B (AU William
                natural) or C (Andrew conversational). Edge is unofficial and can flake; pin{" "}
                <code>node-edge-tts</code> in package.json.
              </p>
              <p>
                <strong className="text-[color:var(--ic-paper,#f3efe6)]">Listening issues found:</strong> live
                audio reads essay Markdown (slogans, heading residue, CTAs); player was play/pause/stop only;
                slowed/deepened William can sound more “processed,” not more human; no article↔audio version
                lock; chunked full-article MP3s can have tiny joins.
              </p>
              <p>
                <strong className="text-[color:var(--ic-paper,#f3efe6)]">If free voices still feel AI:</strong>
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>
                  <strong>OpenAI TTS (gpt-4o-mini-tts / voice options like “ash”, “verse”):</strong> strong
                  conversational quality. Needs API key. Rough ballpark often ~US$0.02–0.08 per 2–3k-word
                  article depending on model/voice — confirm current OpenAI pricing before buying. Commercial
                  usage generally allowed under OpenAI terms for generated audio you create; verify current
                  policy.
                </li>
                <li>
                  <strong>Azure Speech (official Neural):</strong> includes AU neural males; SSML control;
                  commercial licence via Azure. Typically a few US cents per article at normal rates. Closest
                  “official” cousin to Edge voices.
                </li>
                <li>
                  <strong>ElevenLabs:</strong> often the most “human” long-form listen; subscription or
                  credits. Estimate can land ~US$0.10–0.50+ per long article depending on plan/quality.
                  Confirm commercial rights for hosted blog narration on your plan.
                </li>
              </ul>
              <p>
                Recommendation: pick a free sample on this page first. Only approve a paid provider if none of
                A–D feel comfortable for a full 10–20 minute listen.
              </p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="ic-section-title text-xl">5. Improved article draft (not live)</h2>
            <article className="ic-prose prose prose-invert max-w-none">
              <MDXRemote source={draftBody} />
            </article>
          </section>

          <section className="space-y-4">
            <h2 className="ic-section-title text-xl">6. Full improved narration script</h2>
            <pre className="ic-listen whitespace-pre-wrap text-sm leading-relaxed text-[color:var(--ic-stone)]">
              {narration}
            </pre>
          </section>

          <section className="ic-listen space-y-3">
            <h2 className="ic-section-title text-xl">Approval checklist</h2>
            <ul className="list-disc pl-5 space-y-2 text-[color:var(--ic-stone)]">
              <li>Preferred voice sample: A–D / E–M / still not good enough (consider paid)</li>
              <li>Narration: improved script OK?</li>
              <li>Player: ship sticky controls to live?</li>
              <li>After approval: regenerate full article MP3 + swap published MDX + set reusable baseline</li>
            </ul>
          </section>
        </div>
      </PageContainer>
    </PageShell>
  );
}
