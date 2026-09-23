import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { EdgeTTS } from "node-edge-tts";

function markdownToSpeechText(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^\|\s*.*$/gm, " ")
    .replace(/^[-*+]\s+/gm, "")
    .replace(/^\d+\.\s+/gm, "")
    .replace(/[*_~`>#]/g, "")
    .replace(/\n{2,}/g, ". ")
    .replace(/\n/g, " ")
    .replace(/\s{2,}/g, " ")
    .replace(/\s+\./g, ".")
    .trim();
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function synthesizeChunk(tts, text, outFile, attempt = 1) {
  try {
    await tts.ttsPromise(text, outFile);
    const size = fs.statSync(outFile).size;
    if (size < 500) throw new Error(`audio too small (${size} bytes)`);
    return size;
  } catch (err) {
    if (attempt >= 4) throw err;
    const wait = attempt * 2500;
    console.warn(`retry ${attempt} after ${wait}ms: ${err.message || err}`);
    await sleep(wait);
    return synthesizeChunk(tts, text, outFile, attempt + 1);
  }
}

const slug = process.argv[2] || "5am-standard-own-your-morning";
const mdxPath = path.resolve(`content/blog/${slug}.mdx`);
const outPath = path.resolve(`public/audio/blog/${slug}.mp3`);

const raw = fs.readFileSync(mdxPath, "utf8");
const { data, content } = matter(raw);
const full = `${data.title || ""}. ${markdownToSpeechText(content)}`.trim();

fs.mkdirSync(path.dirname(outPath), { recursive: true });

const tts = new EdgeTTS({
  voice: "en-US-ChristopherNeural",
  lang: "en-US",
  outputFormat: "audio-24khz-96kbitrate-mono-mp3",
  rate: "+0%",
  pitch: "+0Hz",
  timeout: 90000,
});

const maxChunk = 1600;
const chunks = [];
let remaining = full;
while (remaining.length > 0) {
  if (remaining.length <= maxChunk) {
    chunks.push(remaining);
    break;
  }
  let cut = remaining.lastIndexOf(". ", maxChunk);
  if (cut < 600) cut = remaining.lastIndexOf(" ", maxChunk);
  if (cut < 400) cut = maxChunk;
  chunks.push(remaining.slice(0, cut + 1).trim());
  remaining = remaining.slice(cut + 1).trim();
}

console.log(`chunks=${chunks.length} totalChars=${full.length}`);

const partFiles = [];
for (let i = 0; i < chunks.length; i++) {
  const part = path.resolve(`public/audio/blog/${slug}.part${i}.mp3`);
  const size = await synthesizeChunk(tts, chunks[i], part);
  partFiles.push(part);
  console.log(`part ${i + 1}/${chunks.length} bytes=${size}`);
  await sleep(400);
}

const buffers = partFiles.map((f) => fs.readFileSync(f));
fs.writeFileSync(outPath, Buffer.concat(buffers));
for (const f of partFiles) fs.unlinkSync(f);

console.log(`wrote ${outPath} bytes=${fs.statSync(outPath).size}`);
