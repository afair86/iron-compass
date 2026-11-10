/** Rejected native POST only. Never echo submitted values or claim delivery. */
export function nativeFormFallback(request: Request, kind: "contact" | "signup"): Response | null {
  const media = request.headers.get("content-type")?.split(";")[0].trim().toLowerCase();
  if (request.method !== "POST" || media !== "application/x-www-form-urlencoded" || !request.headers.get("accept")?.includes("text/html")) return null;
  const contact = kind === "contact";
  const title = contact ? "Your message has not been sent." : "Your signup has not been submitted.";
  const back = contact ? "/contact" : "/blog";
  const email = contact ? '<p>You can also <a href="mailto:adam.fairclough86@gmail.com">email us</a>.</p>' : "";
  return new Response(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>Form not submitted | Iron Compass AI</title><style>body{margin:0;background:#262c34;color:#d5dce6;font:16px/1.6 system-ui,sans-serif}main{max-width:42rem;margin:4rem auto;padding:1.5rem}h1{color:#f0f2f5;font-size:1.7rem}a{color:#a6c9e5}</style></head><body><main><p>IRON COMPASS AI</p><h1>${title}</h1><p>This form needs JavaScript. Enable it, return to the page and try again.</p>${email}<p><a href="${back}">Return to the website</a></p></main></body></html>`, {
    status: 415,
    headers: { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" },
  });
}
