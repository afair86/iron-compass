export class SubscribeError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "SubscribeError";
    this.status = status;
  }
}

type SubscribeResult = {
  ok: true;
  provider: "webhook" | "resend";
};

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Persists a subscribe request via configured provider (webhook or Resend audience). */
export async function subscribeEmail(email: string, source = "website"): Promise<SubscribeResult> {
  const normalized = email.trim().toLowerCase();

  if (!isValidEmail(normalized)) {
    throw new SubscribeError("Enter a valid email address.", 400);
  }

  const webhookUrl = process.env.SUBSCRIBE_WEBHOOK_URL;
  if (webhookUrl) {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: normalized,
        source,
        subscribedAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new SubscribeError("Could not add you to the list. Try again shortly.", 502);
    }

    return { ok: true, provider: "webhook" };
  }

  const resendKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (resendKey && audienceId) {
    const response = await fetch(`https://api.resend.com/audiences/${audienceId}/contacts`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: normalized,
        unsubscribed: false,
      }),
    });

    if (!response.ok && response.status !== 409) {
      throw new SubscribeError("Could not add you to the list. Try again shortly.", 502);
    }

    return { ok: true, provider: "resend" };
  }

  throw new SubscribeError("Email signup is not configured yet.", 503);
}

export function getAppStoreUrls() {
  return {
    ios: process.env.NEXT_PUBLIC_IOS_APP_URL?.trim() || null,
    android: process.env.NEXT_PUBLIC_ANDROID_APP_URL?.trim() || null,
  };
}

export function isSubscribeConfigured(): boolean {
  return Boolean(
    process.env.SUBSCRIBE_WEBHOOK_URL ||
      (process.env.RESEND_API_KEY && process.env.RESEND_AUDIENCE_ID),
  );
}
