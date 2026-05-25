import { NextResponse } from "next/server";
import { subscribeEmail, SubscribeError } from "@/lib/subscribe";

type SubscribeBody = {
  email?: string;
  source?: string;
};

export async function POST(request: Request) {
  let body: SubscribeBody;

  try {
    body = (await request.json()) as SubscribeBody;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = body.email?.trim();
  if (!email) {
    return NextResponse.json({ error: "Email is required." }, { status: 400 });
  }

  const source = body.source?.trim() || "website";

  try {
    const result = await subscribeEmail(email, source);
    return NextResponse.json({ ok: true, provider: result.provider });
  } catch (error) {
    if (error instanceof SubscribeError) {
      return NextResponse.json({ error: error.message }, { status: error.status });
    }

    return NextResponse.json({ error: "Something went wrong. Try again shortly." }, { status: 500 });
  }
}
