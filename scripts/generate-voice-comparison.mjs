import fs from "fs";
import path from "path";
import { EdgeTTS } from "node-edge-tts";

const root = path.resolve("content/blog/_reviews/5am-standard");
const outDir = path.resolve("public/audio/blog/_samples");
fs.mkdirSync(outDir, { recursive: true });

const shared = fs.readFileSync(path.join(root, "passage-shared.txt"), "utf8")
  .split("\n")
  .filter((l) => !l.startsWith("#") && l.trim() !== "")
  .join(" ")
  .replace(/\s+/g, " ")
  .trim();

const originalStyle = fs.readFileSync(path.join(root, "passage-original-style.txt"), "utf8")
  .split("\n")
  .filter((l) => !l.startsWith("#") && l.trim() !== "")
  .join(" ")
  .replace(/\s+/g, " ")
  .trim();

const improvedStyle = shared;

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function synthesize(label, text, cfg) {
  const out = path.join(outDir, `${label}.mp3`);
  const tts = new EdgeTTS({
    voice: cfg.voice,
    lang: cfg.lang,
    outputFormat: "audio-24khz-96kbitrate-mono-mp3",
    rate: cfg.rate,
    pitch: cfg.pitch,
    timeout: 90000,
  });
  let attempt = 1;
  while (true) {
    try {
      await tts.ttsPromise(text, out);
      const bytes = fs.statSync(out).size;
      console.log(`OK ${label} bytes=${bytes} voice=${cfg.voice} rate=${cfg.rate} pitch=${cfg.pitch}`);
      return;
    } catch (err) {
      if (attempt >= 4) throw err;
      console.warn(`retry ${label} #${attempt}: ${err.message || err}`);
      await sleep(attempt * 2500);
      attempt += 1;
    }
  }
}

const samples = [
  {
    label: "cmp-a-william-current",
    text: shared,
    cfg: { voice: "en-AU-WilliamNeural", lang: "en-AU", rate: "-8%", pitch: "-3Hz" },
  },
  {
    // Natural pacing — not artificially slowed/deepened
    label: "cmp-b-william-improved",
    text: shared,
    cfg: { voice: "en-AU-WilliamNeural", lang: "en-AU", rate: "+0%", pitch: "+0Hz" },
  },
  {
    // Different free Edge voice — often more conversational
    label: "cmp-c-andrew-conversational",
    text: shared,
    cfg: { voice: "en-US-AndrewNeural", lang: "en-US", rate: "+0%", pitch: "+0Hz" },
  },
  {
    // Another free Edge alternative (GB mature male)
    label: "cmp-d-ryan-gb",
    text: shared,
    cfg: { voice: "en-GB-RyanNeural", lang: "en-GB", rate: "-2%", pitch: "+0Hz" },
  },
  {
    label: "script-original-william",
    text: originalStyle,
    cfg: { voice: "en-AU-WilliamNeural", lang: "en-AU", rate: "+0%", pitch: "+0Hz" },
  },
  {
    label: "script-improved-william",
    text: improvedStyle,
    cfg: { voice: "en-AU-WilliamNeural", lang: "en-AU", rate: "+0%", pitch: "+0Hz" },
  },
];

console.log(`sharedChars=${shared.length} originalChars=${originalStyle.length}`);
for (const sample of samples) {
  await synthesize(sample.label, sample.text, sample.cfg);
  await sleep(400);
}
console.log("all comparison samples ready");
