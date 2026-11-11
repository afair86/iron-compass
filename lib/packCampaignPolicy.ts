import { PACK_EMAIL_CONSENT_VERSION, packCampaign } from "./freePack.ts";

export type CampaignState = { consentVersion: string; confirmedAt: string | null; unsubscribed: boolean; suppressed: boolean; sentIds: string[] };
/** Provider workflow must re-read durable state before each send, including after waits. */
export function duePackMessages(state: CampaignState, now = new Date()) {
  if (state.consentVersion !== PACK_EMAIL_CONSENT_VERSION || !state.confirmedAt || state.unsubscribed || state.suppressed) return [];
  const confirmed = Date.parse(state.confirmedAt);
  if (!Number.isFinite(confirmed) || !Number.isFinite(now.getTime()) || confirmed > now.getTime()) return [];
  // Never backfill a burst of overdue notes after a delayed worker restarts.
  const current = packCampaign.filter(message => now.getTime() - confirmed >= message.day * 86400000).at(-1);
  return current && !state.sentIds.includes(current.id) ? [current] : [];
}

export function campaignEmailText(id: string, senderIdentity: string, contactAddress: string, unsubscribeUrl: string) {
  const message = packCampaign.find(item => item.id === id);
  if (!message || !senderIdentity.trim() || !contactAddress.trim()) throw new Error("Verified sender identity and contact details are required.");
  const url = new URL(unsubscribeUrl);
  if (url.protocol !== "https:") throw new Error("A working HTTPS unsubscribe URL is required.");
  return { subject: message.subject, text: `${message.body}\n\n${message.cta}: https://ironcompassai.com${message.href}\n\nYou requested the free pack and three follow-up notes.\n${senderIdentity}\nContact: ${contactAddress}\nUnsubscribe from the remaining notes: ${unsubscribeUrl}` };
}
