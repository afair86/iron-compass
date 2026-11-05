/**
 * Shared helpers for blog practical tools (session-only, print/download).
 * Entries stay in the browser unless the reader downloads or prints.
 */

export function parseMoney(raw: string): number | null {
  const cleaned = raw.trim().replace(/[$,\s]/g, "");
  if (!cleaned) return null;
  if (!/^-?\d+(\.\d{1,2})?$/.test(cleaned)) return null;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
}

/** Convert weekly amount to monthly equivalent (52 weeks / 12 months). */
export function weeklyToMonthly(weekly: number): number {
  return (weekly * 52) / 12;
}

/** Convert monthly amount to weekly equivalent. */
export function monthlyToWeekly(monthly: number): number {
  return (monthly * 12) / 52;
}

export function formatMoney(n: number): string {
  return n.toLocaleString("en-AU", { style: "currency", currency: "AUD", maximumFractionDigits: 2 });
}

function escapeHtml(text: string) {
  return text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}

/** A self-contained, styled copy. Personal answers are escaped and never sent to a server. */
export function brandedChecklistHtml(text: string): string {
  const [title, ...lines] = text.split(/\r?\n/);
  const sections = lines.join("\n").trim().split(/\n\s*\n/).filter(Boolean);
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${escapeHtml(title || "Iron Compass AI checklist")}</title><style>
*{box-sizing:border-box}body{margin:0;background:#262c34;color:#d5dce6;font:17px/1.75 system-ui,sans-serif}main{max-width:860px;margin:0 auto;padding:48px 24px}header{border-bottom:1px solid #647080;padding-bottom:24px;margin-bottom:36px}.brand{color:#f0f2f5;font-weight:750;letter-spacing:.12em}.brand span{color:#ff3434}h1{color:#f0f2f5;font-size:clamp(1.6rem,4vw,2.4rem);line-height:1.25;margin:32px 0 24px}section{background:#333c46;border-left:3px solid #a6c9e5;border-radius:8px;padding:24px;margin:0 0 24px;white-space:pre-wrap;overflow-wrap:anywhere}footer{border-top:1px solid #647080;padding-top:24px;margin-top:36px;font-size:.9rem;color:#b4becb}a{color:#a6c9e5;text-underline-offset:4px}@media print{body{background:white;color:#20252b}main{padding:0;max-width:none}h1,.brand{color:#20252b}section{background:white;border:1px solid #b3bdc8;border-left:3px solid #536d83;break-inside:auto}a{color:#253e52}footer{color:#4b5563}p{orphans:3;widows:3}}
</style></head><body><main><header><div class="brand">IRON COMPASS <span>AI</span></div><h1>${escapeHtml(title || "Your checklist")}</h1><p>Your saved copy. Keep it for your own review, or use your browser’s Print option to save a PDF.</p></header>${sections.map(section => `<section>${escapeHtml(section)}</section>`).join("")}<footer>Iron Compass AI · Practical structure for the responsibilities you carry.<br><a href="https://ironcompassai.com/">Visit Iron Compass AI</a></footer></main></body></html>`;
}

export function downloadBrandedChecklist(filename: string, text: string) {
  const blob = new Blob([brandedChecklistHtml(text)], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename.replace(/\.[^.]+$/, "") + ".html";
  a.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function printToolResult() {
  const root = document.body;
  const clear = () => {
    root.classList.remove("ic-printing-routine");
    window.removeEventListener("afterprint", clear);
  };
  root.classList.add("ic-printing-routine");
  window.addEventListener("afterprint", clear);
  window.setTimeout(clear, 2000);
  window.print();
}
