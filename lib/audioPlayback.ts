/** Fixed public messages; never expose a browser/network exception verbatim. */
export function audioPlaybackError(error: unknown): string | null {
  const name = error && typeof error === "object" && "name" in error ? error.name : undefined;
  // Pausing or switching recordings can deliberately interrupt a pending play.
  if (name === "AbortError") return null;
  if (name === "NotAllowedError") return "Tap play again — browsers sometimes block the first attempt.";
  return "Audio could not load. Refresh and try again.";
}
