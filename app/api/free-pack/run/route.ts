import { timingSafeEqual } from "node:crypto";
import { createPackCampaign } from "@/lib/packCampaignService";
export const runtime = "nodejs";
export const maxDuration = 300;
export async function GET(request: Request) {
  const expected = `Bearer ${process.env.CRON_SECRET || ""}`;
  const actual = request.headers.get("authorization") || "";
  if (!process.env.CRON_SECRET || actual.length !== expected.length || !timingSafeEqual(Buffer.from(actual), Buffer.from(expected))) return Response.json({ error: "Not permitted" }, { status: 401 });
  try { return Response.json({ ok: true, results: await createPackCampaign().run() }, { headers: { "Cache-Control": "no-store" } }); }
  catch { return Response.json({ error: "Campaign unavailable" }, { status: 503, headers: { "Cache-Control": "no-store" } }); }
}
