/** Shared boundary for anonymous JSON forms; no member/auth service changes. */
export class PublicRequestError extends Error {
  status: number;
  constructor(message: string, status = 400) {
    super(message);
    this.name = "PublicRequestError";
    this.status = status;
  }
}

export async function readPublicJson(request: Request, maxBytes: number, timeoutMs = 10000): Promise<unknown> {
  const origin = request.headers.get("origin");
  if (origin) {
    // Next can construct request.url with its internal localhost name. Use the
    // actual Host authority; never accept an arbitrary X-Forwarded-Host alias.
    const url = new URL(request.url);
    const host = request.headers.get("host") || url.host;
    const forwardedProtocol = request.headers.get("x-forwarded-proto");
    const protocol = forwardedProtocol === "https" || forwardedProtocol === "http" ? `${forwardedProtocol}:` : url.protocol;
    let expected: string;
    try { expected = new URL(`${protocol}//${host}`).origin; }
    catch { throw new PublicRequestError("This request is not permitted.", 403); }
    if (origin !== expected) throw new PublicRequestError("This request is not permitted.", 403);
  }
  if (request.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") {
    throw new PublicRequestError("Send a JSON request body.", 415);
  }
  const declared = request.headers.get("content-length");
  if (declared && Number(declared) > maxBytes) {
    throw new PublicRequestError("Request body is too large.", 413);
  }
  const reader = request.body?.getReader();
  if (!reader) throw new PublicRequestError("Invalid request body.");
  let bytes = 0;
  const chunks: Uint8Array[] = [];
  let timer: ReturnType<typeof setTimeout> | undefined;
  const deadline = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new PublicRequestError("Request body took too long.", 408)), timeoutMs);
  });
  try {
    while (true) {
      const { done, value } = await Promise.race([reader.read(), deadline]);
      if (done) break;
      bytes += value.byteLength;
      if (bytes > maxBytes) throw new PublicRequestError("Request body is too large.", 413);
      chunks.push(value);
    }
    const buffer = new Uint8Array(bytes);
    let offset = 0;
    for (const chunk of chunks) { buffer.set(chunk, offset); offset += chunk.byteLength; }
    return JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(buffer));
  } catch (error) {
    // Cancelling an untrusted stream must not make the error response wait forever.
    void reader.cancel().catch(() => {});
    if (error instanceof PublicRequestError) throw error;
    throw new PublicRequestError("Invalid request body.");
  } finally {
    clearTimeout(timer);
    reader.releaseLock();
  }
}
