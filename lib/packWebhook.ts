import { createHmac, timingSafeEqual } from "node:crypto";
import { PackCampaign } from "./packCampaignService.ts";
import { PublicRequestError } from "./publicRequest.ts";
/** Svix documented raw-body HMAC protocol, including timestamp and rotating signatures. */
export function verifyPackWebhook(raw: string, headers: Headers, secret: string, now = Date.now()) {
  const id = headers.get("svix-id") || "", timestamp = headers.get("svix-timestamp") || "";
  if (!id || !/^\d+$/.test(timestamp) || Math.abs(now / 1000 - Number(timestamp)) > 300 || !secret.startsWith("whsec_") || Buffer.from(secret.slice(6), "base64").length < 24) throw new PublicRequestError("Invalid webhook", 400);
  const expected = createHmac("sha256", Buffer.from(secret.slice(6), "base64")).update(`${id}.${timestamp}.${raw}`).digest();
  const valid = (headers.get("svix-signature") || "").split(" ").some(part => {
    const [version, value] = part.split(",");
    if (version !== "v1" || !value) return false;
    const received = Buffer.from(value, "base64");
    return received.length === expected.length && timingSafeEqual(received, expected);
  });
  if (!valid) throw new PublicRequestError("Invalid webhook", 400);
  return JSON.parse(raw) as { type: string; data?: { to?: string[]; email_id?: string } };
}
export async function applyPackWebhook(campaign: PackCampaign, event: ReturnType<typeof verifyPackWebhook>) {
  if (["email.bounced", "email.complained", "email.suppressed"].includes(event.type)) {
    if (!Array.isArray(event.data?.to) || event.data.to.length > 50) throw new PublicRequestError("Invalid event", 400);
    for (const email of event.data.to) {
      if (typeof email !== "string" || email.length > 254) throw new PublicRequestError("Invalid event", 400);
      await campaign.store.mutate("suppress", campaign.identity(email), campaign.clock());
    }
  }
  // Replays are idempotent: suppression is monotonic and can never reactivate anyone.
}
