import { PublicRequestError } from "./publicRequest.ts";

export const MAX_CONTACT_BYTES = 32768;
export type ContactMessage = { name: string; email: string; message: string };

export function validateContactBody(body: unknown): ContactMessage {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw new PublicRequestError("Send a name, email, and message.");
  }
  const { name, email, message } = body as Record<string, unknown>;
  if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string") {
    throw new PublicRequestError("Enter your name, a valid email, and a message.");
  }
  const values = { name: name.trim(), email: email.trim(), message: message.trim() };
  if (!values.name || values.name.length > 200 || values.email.length > 254 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email) || values.message.length < 2 || values.message.length > 10000) {
    throw new PublicRequestError("Enter your name, a valid email, and a message of up to 10,000 characters.");
  }
  return values;
}

export async function deliverContactMessage(message: ContactMessage): Promise<void> {
  const url = process.env.CONTACT_WEBHOOK_URL?.trim();
  if (!url) throw new PublicRequestError("The contact form is not receiving messages yet.", 503);
  const signal = AbortSignal.timeout(8000);
  let response: Response;
  try {
    response = await fetch(url, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...message, sentAt: new Date().toISOString() }),
      signal, redirect: "error",
    });
  } catch {
    throw new PublicRequestError("Could not send that. Try again shortly.", signal.aborted ? 504 : 502);
  }
  if (!response.ok) throw new PublicRequestError("Could not send that. Try again shortly.", 502);
}
