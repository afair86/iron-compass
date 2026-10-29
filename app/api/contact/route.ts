import { NextResponse } from "next/server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: { name?: string; email?: string; message?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Send a name, email, and message." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name || !EMAIL_PATTERN.test(email) || message.length < 2) {
    return NextResponse.json({ error: "Enter your name, a valid email, and a message." }, { status: 400 });
  }

  const webhookUrl = process.env.CONTACT_WEBHOOK_URL?.trim();
  if (!webhookUrl) {
    return NextResponse.json(
      { error: "The contact form is not receiving messages yet." },
      { status: 503 },
    );
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      email,
      message,
      sentAt: new Date().toISOString(),
    }),
  });

  if (!response.ok) {
    return NextResponse.json({ error: "Could not send that. Try again shortly." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
