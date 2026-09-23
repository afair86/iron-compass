import fs from "fs";
import path from "path";
import { EdgeTTS } from "node-edge-tts";

const sampleText = `Protect the first block of your day before everyone else’s priorities take over.

That block might start at five. It might start at twenty to six. After nights, it might start at two in the afternoon.

Now, night shifts, sleep, and recovery. An early block taken from sleep you needed is not discipline. It’s borrowing from later in the day. You’ll often repay it with a flat afternoon, a short temper, or a dangerous drive home.

If you are too wrecked to drive safely, sleep. The standard is meant to support a working life, not compete with basic safety.`;

const outDir = path.resolve("public/audio/blog/_samples");
fs.mkdirSync(outDir, { recursive: true });

const configs = [
  { id: "william-current", voice: "en-AU-WilliamNeural", lang: "en-AU", rate: "-8%", pitch: "-3Hz" },
  { id: "william-natural", voice: "en-AU-WilliamNeural", lang: "en-AU", rate: "-2%", pitch: "0Hz" },
  { id: "william-steady", voice: "en-AU-WilliamNeural", lang: "en-AU", rate: "-5%", pitch: "-1Hz" },
];

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

for (const cfg of configs) {
  const out = path.join(outDir, `5am-sample-${cfg.id}.mp3`);
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
      await tts.ttsPromise(sampleText, out);
      console.log(`wrote ${out} bytes=${fs.statSync(out).size} rate=${cfg.rate} pitch=${cfg.pitch}`);
      break;
    } catch (err) {
      if (attempt >= 4) throw err;
      console.warn(`retry ${cfg.id} #${attempt}: ${err.message || err}`);
      await sleep(attempt * 2500);
      attempt += 1;
    }
  }
  await sleep(500);
}

console.log("samples ready");
