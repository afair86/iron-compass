import { createHmac, randomUUID } from "node:crypto";
import { PublicRequestError, readPublicJson } from "./publicRequest.ts";
import { FREE_PACK_VERSION, PACK_EMAIL_CONSENT, PACK_EMAIL_CONSENT_VERSION, PACK_EXPERIMENT } from "./freePack.ts";

export function packDeliveryConfigured(env = process.env) {
  const verified = Date.parse(env.PACK_CAMPAIGN_VERIFIED_AT || "");
  return env.PACK_CAMPAIGN_ENABLED === "true" && Boolean(env.PACK_CAMPAIGN_WEBHOOK_URL && env.PACK_CAMPAIGN_SIGNING_SECRET && env.PACK_CAMPAIGN_PROVIDER_NAME) && Number.isFinite(verified) && verified <= Date.now();
}

export async function acceptPackRequest(request: Request) {
  const value = await readPublicJson(request, 4096);
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new PublicRequestError("Enter your email and choose whether to receive the notes.");
  const body = value as Record<string, unknown>;
  if (body.website) throw new PublicRequestError("Could not accept that request.", 400);
  if (typeof body.email !== "string" || body.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(body.email.trim())) throw new PublicRequestError("Enter a valid email address.");
  if (body.consent !== true || body.consentVersion !== PACK_EMAIL_CONSENT_VERSION) throw new PublicRequestError("Choose the email option to request the pack and follow-up notes, or use the pack without email.");
  if (body.variant !== undefined && body.variant !== "control" && body.variant !== "practice") throw new PublicRequestError("Invalid experiment variant.");
  if (!packDeliveryConfigured()) throw new PublicRequestError("Email delivery is not enabled yet. You can use or download the pack without email.", 503);
  const url = new URL(process.env.PACK_CAMPAIGN_WEBHOOK_URL!);
  if (url.protocol !== "https:") throw new PublicRequestError("Email delivery is not available. Use the pack without email.", 503);
  const secret = process.env.PACK_CAMPAIGN_SIGNING_SECRET!;
  if (secret.length < 32) throw new PublicRequestError("Email delivery is not available. Use the pack without email.", 503);
  const email = body.email.trim().toLowerCase();
  // Stable recipient/sequence key: the receiving workflow must durably deduplicate it.
  const idempotencyKey = createHmac("sha256", secret).update(`${FREE_PACK_VERSION}:${email}`).digest("hex");
  const requestId = randomUUID();
  const payload = JSON.stringify({ schema: "iron-compass-pack-v1", requestId, idempotencyKey, email, pack: FREE_PACK_VERSION, consent: { granted: true, version: PACK_EMAIL_CONSENT_VERSION, text: PACK_EMAIL_CONSENT, requestedAt: new Date().toISOString(), source: "free-pack" }, experiment: body.variant ? { id: PACK_EXPERIMENT, variant: body.variant } : null });
  const timestamp = String(Date.now());
  const signature = createHmac("sha256", secret).update(`${timestamp}.${payload}`).digest("hex");
  let response: Response;
  try {
    response = await fetch(url, { method: "POST", headers: { "content-type": "application/json", "x-ic-timestamp": timestamp, "x-ic-signature": signature, "idempotency-key": idempotencyKey }, body: payload, redirect: "error", signal: AbortSignal.timeout(8000) });
  } catch { throw new PublicRequestError("Could not confirm your email request. Your details are still here; you can try again or use the pack below.", 502); }
  const ack = await response.json().catch(() => null);
  // An HTTP 200 alone is not proof of a saved opt-in or queued confirmation.
  if (!response.ok || ack?.ok !== true || ack?.requestId !== requestId || ack?.status !== "confirmation_pending") throw new PublicRequestError("Could not confirm your email request. You can use the pack below without email.", 502);
  return { ok: true, status: "confirmation_pending" } as const;
}
