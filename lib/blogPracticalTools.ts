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

export function downloadTextFile(filename: string, text: string) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
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
