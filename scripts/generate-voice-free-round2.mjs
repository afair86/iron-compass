import fs from "fs";
import path from "path";
import { EdgeTTS } from "node-edge-tts";

const root = path.resolve("content/blog/_reviews/5am-standard");
const outDir = path.resolve("public/audio/blog/_samples");
fs.mkdirSync(outDir, { recursive: true });

const shared = fs
  .readFileSync(path.join(root, "passage-shared.txt"), "utf8")
  .split("\n")
  .filter((l) => !l.startsWith("#") && l.trim() !== "")
  .join(" ")
  .replace(/\s+/g, " ")
  .trim();

// Slightly more spoken punctuation for free TTS rhythm (same meaning).
const sharedSpoken = shared
  .replace(/Then the roster moves\./, "Then… the roster moves.")
  .replace(/Usually, it isn’t\./, "Usually — it isn’t.")
  .replace(/That’s what the five a\.m\. standard is\./, "That’s what the five a.m. standard is.")
  .replace(
    /And if you’re too wrecked to drive safely, sleep\./,
    "And if you’re too wrecked to drive safely… sleep.",
  );

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function synthesize(label, text, cfg) {
  const out = path.join(outDir, `${label}.mp3`);
  const tts = new EdgeTTS({
    voice: cfg.voice,
    lang: cfg.lang,
    outputFormat: "audio-24khz-96kbitrate-mono-mp3",
    rate: cfg.rate ?? "+0%",
    pitch: cfg.pitch ?? "+0Hz",
    timeout: 90000,
  });
  let attempt = 1;
  while (true) {
    try {
      await tts.ttsPromise(text, out);
      console.log(`OK ${label} bytes=${fs.statSync(out).size} ${cfg.voice}`);
      return true;
    } catch (err) {
      if (attempt >= 3) {
        console.warn(`FAIL ${label}: ${err.message || err}`);
        return false;
      }
      console.warn(`retry ${label} #${attempt}`);
      await sleep(attempt * 2000);
      attempt += 1;
    }
  }
}

const samples = [
  { label: "free2-e-brian", text: sharedSpoken, cfg: { voice: "en-US-BrianNeural", lang: "en-US" } },
  { label: "free2-f-davis", text: sharedSpoken, cfg: { voice: "en-US-DavisNeural", lang: "en-US" } },
  { label: "free2-g-guy", text: sharedSpoken, cfg: { voice: "en-US-GuyNeural", lang: "en-US", rate: "-2%" } },
  { label: "free2-h-christopher", text: sharedSpoken, cfg: { voice: "en-US-ChristopherNeural", lang: "en-US" } },
  { label: "free2-i-connor-ie", text: sharedSpoken, cfg: { voice: "en-IE-ConnorNeural", lang: "en-IE" } },
  { label: "free2-j-thomas-gb", text: sharedSpoken, cfg: { voice: "en-GB-ThomasNeural", lang: "en-GB" } },
  { label: "free2-k-tony", text: sharedSpoken, cfg: { voice: "en-US-TonyNeural", lang: "en-US" } },
  {
    label: "free2-l-william-spoken-punct",
    text: sharedSpoken,
    cfg: { voice: "en-AU-WilliamNeural", lang: "en-AU", rate: "+0%", pitch: "+0Hz" },
  },
];

console.log(`chars=${sharedSpoken.length}`);
for (const sample of samples) {
  await synthesize(sample.label, sample.text, sample.cfg);
  await sleep(350);
}
console.log("free round 2 ready");
