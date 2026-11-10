import { readPublicJson, PublicRequestError } from "./publicRequest.ts";
export { PublicRequestError as SubscribeRequestError } from "./publicRequest.ts";

export const MAX_SUBSCRIBE_BYTES = 4096;

export function validateSubscribeBody(body: unknown): { email: string; source: string } {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    throw new PublicRequestError("Invalid request body.");
  }
  const { email, source } = body as Record<string, unknown>;
  if (typeof email !== "string" || !email.trim()) {
    throw new PublicRequestError("Email is required.");
  }
  if (email.trim().length > 254) {
    throw new PublicRequestError("Enter a valid email address.");
  }
  if (source !== undefined && (typeof source !== "string" || source.trim().length > 80)) {
    throw new PublicRequestError("Invalid signup source.");
  }
  return { email: email.trim(), source: typeof source === "string" && source.trim() ? source.trim() : "website" };
}

/** Enforce the byte limit even when Content-Length is absent or understated. */
export async function readSubscribeRequest(request: Request) {
  return validateSubscribeBody(await readPublicJson(request, MAX_SUBSCRIBE_BYTES));
}
