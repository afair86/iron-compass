import { NextResponse } from "next/server";
import { readPublicJson, PublicRequestError } from "@/lib/publicRequest";
import { deliverContactMessage, validateContactBody, MAX_CONTACT_BYTES } from "@/lib/contact";
import { nativeFormFallback } from "@/lib/nativeFormFallback";

export async function POST(request: Request) {
  try {
    const message = validateContactBody(await readPublicJson(request, MAX_CONTACT_BYTES));
    await deliverContactMessage(message);
    return NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) {
    if (error instanceof PublicRequestError) {
      if (error.status === 415) {
        const fallback = nativeFormFallback(request, "contact");
        if (fallback) return fallback;
      }
      return NextResponse.json({ error: error.message }, { status: error.status, headers: { "Cache-Control": "no-store" } });
    }
    return NextResponse.json({ error: "Could not send that. Try again shortly." }, { status: 500, headers: { "Cache-Control": "no-store" } });
  }
}
