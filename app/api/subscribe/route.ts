import { NextResponse } from "next/server";
import { subscribeEmail, SubscribeError } from "@/lib/subscribe";
import { readSubscribeRequest, SubscribeRequestError } from "@/lib/subscribeRequest";
import { nativeFormFallback } from "@/lib/nativeFormFallback";

export async function POST(request: Request) {
  try {
    const { email, source } = await readSubscribeRequest(request);
    const result = await subscribeEmail(email, source);
    return NextResponse.json({ ok: true, provider: result.provider }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    if (error instanceof SubscribeError || error instanceof SubscribeRequestError) {
      if (error instanceof SubscribeRequestError && error.status === 415) {
        const fallback = nativeFormFallback(request, "signup");
        if (fallback) return fallback;
      }
      return NextResponse.json({ error: error.message }, { status: error.status, headers: { "Cache-Control": "no-store" } });
    }

    return NextResponse.json({ error: "Something went wrong. Try again shortly." }, { status: 500, headers: { "Cache-Control": "no-store" } });
  }
}
