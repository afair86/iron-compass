import { createPackCampaign } from "./packCampaignService.ts";
import { PublicRequestError } from "./publicRequest.ts";

export const packLinkHeaders = { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store", "Referrer-Policy": "no-referrer", "X-Robots-Tag": "noindex, nofollow", "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'; form-action 'self'; frame-ancestors 'none'; base-uri 'none'", "X-Content-Type-Options": "nosniff" };
const escape = (value: string) => value.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
export function packLinkPage(title: string, copy: string, form = "", status = 200) {
  return new Response(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escape(title)} | Iron Compass AI</title><style>body{margin:0;background:#020c1c;color:#c7cfdd;font:18px/1.6 system-ui,sans-serif}main{max-width:620px;margin:8vh auto;padding:28px}h1{color:#f5f7fb;line-height:1.2}button,a{font:inherit}button{background:#ff3434;color:#fff;border:0;border-radius:30px;padding:14px 24px;cursor:pointer}button:focus-visible,a:focus-visible{outline:3px solid #00a0ff;outline-offset:5px}a{color:#8fd0ff}p{margin:24px 0}</style></head><body><main><p>IRON COMPASS AI</p><h1>${escape(title)}</h1><p>${escape(copy)}</p>${form}<p><a href="/free-pack">Use the free pack</a> · <a href="/contact">Contact</a></p></main></body></html>`, { status, headers: packLinkHeaders });
}
export async function boundedPackText(request: Request, max = 16384) {
  if (Number(request.headers.get("content-length") || 0) > max) throw new PublicRequestError("Request is too large.", 413);
  const reader = request.body?.getReader();
  if (!reader) return "";
  const chunks: Uint8Array[] = []; let size = 0;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_, reject) => { timer = setTimeout(() => reject(new PublicRequestError("Request timed out.", 408)), 5000); });
  try {
    while (true) {
      const part = await Promise.race([reader.read(), timeout]);
      if (part.done) break;
      size += part.value.length;
      if (size > max) throw new PublicRequestError("Request is too large.", 413);
      chunks.push(part.value);
    }
    return Buffer.concat(chunks).toString("utf8");
  } finally { clearTimeout(timer); void reader.cancel().catch(() => {}); reader.releaseLock(); }
}
export async function handlePackLink(request: Request, purpose: "confirm" | "unsubscribe") {
  try {
    const campaign = createPackCampaign();
    const urlToken = new URL(request.url).searchParams.get("token") || "";
    if (request.method === "GET") {
      campaign.verify(urlToken, purpose);
      const title = purpose === "confirm" ? "Confirm your email request" : "Stop the remaining notes";
      const copy = purpose === "confirm" ? "Choose below to receive the free pack and three follow-up notes over eight days. This does not enrol you in an ongoing newsletter." : "You can stop these emails without an account. Confirm below to cancel all remaining starter-pack notes.";
      // GET is always read-only: scanners and prefetchers cannot opt in or withdraw.
      return packLinkPage(title, copy, `<form method="post"><input type="hidden" name="token" value="${escape(urlToken)}"><button type="submit">${purpose === "confirm" ? "Confirm email and begin" : "Unsubscribe"}</button></form>`);
    }
    const origin = request.headers.get("origin");
    if (origin && origin !== campaign.origin) throw new PublicRequestError("This request is not permitted.", 403);
    if (request.headers.get("content-type")?.split(";")[0] !== "application/x-www-form-urlencoded") throw new PublicRequestError("Use the confirmation button in your email.", 415);
    const params = new URLSearchParams(await boundedPackText(request, 4096));
    const token = params.get("token") || (purpose === "unsubscribe" && params.get("List-Unsubscribe") === "One-Click" ? urlToken : "");
    if (purpose === "unsubscribe") {
      await campaign.unsubscribe(token);
      return packLinkPage("You are unsubscribed", "The remaining starter-pack notes have been stopped. You can continue using the free pack and public guides.");
    }
    await campaign.confirm(token);
    return packLinkPage("Your email is confirmed", "Your request is confirmed. The free pack is available below; the three follow-up notes are due over the next eight days. You can unsubscribe from any email.");
  } catch (error) {
    return packLinkPage("We could not complete that request", error instanceof PublicRequestError ? error.message : "This service is temporarily unavailable. You can still use the free pack or contact us for help.", "", error instanceof PublicRequestError ? error.status : 503);
  }
}
