/** Anonymous form success requires the server's explicit acknowledgement. */
export class PublicFormTimeoutError extends Error {
  constructor() {
    super("Could not confirm submission in time. Please try again shortly.");
    this.name = "PublicFormTimeoutError";
  }
}

/** Bound both response headers and body; an interrupted connection can stall either. */
export async function submitPublicForm(path: "/api/contact" | "/api/subscribe", body: unknown, timeoutMs = 25000): Promise<{ responseOk: boolean; body: unknown }> {
  const controller = new AbortController();
  let timer: ReturnType<typeof setTimeout> | undefined;
  const deadline = new Promise<never>((_, reject) => {
    timer = setTimeout(() => {
      reject(new PublicFormTimeoutError());
      controller.abort();
    }, timeoutMs);
  });
  const submission = async () => {
    const response = await fetch(path, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body), signal: controller.signal,
    });
    return { responseOk: response.ok, body: await response.json().catch(() => null) as unknown };
  };
  try { return await Promise.race([submission(), deadline]); }
  finally { clearTimeout(timer); }
}

export function submissionError(responseOk: boolean, body: unknown, fallback: string): string | null {
  if (!body || typeof body !== "object" || Array.isArray(body)) return fallback;
  const result = body as Record<string, unknown>;
  if (responseOk && result.ok === true && result.error === undefined) return null;
  return typeof result.error === "string" && result.error.trim() ? result.error.trim().slice(0, 300) : fallback;
}
