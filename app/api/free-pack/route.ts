import { NextResponse } from "next/server";
import { acceptPackRequest } from "@/lib/packRequest";
import { PublicRequestError } from "@/lib/publicRequest";

export async function POST(request: Request) {
  try { return NextResponse.json(await acceptPackRequest(request), { headers: { "Cache-Control": "no-store" } }); }
  catch (error) { return NextResponse.json({ error: error instanceof PublicRequestError ? error.message : "Could not confirm that request. Use the pack without email or try again later." }, { status: error instanceof PublicRequestError ? error.status : 500, headers: { "Cache-Control": "no-store" } }); }
}
