import { createPackCampaign, authorizePackWorker } from "@/lib/packCampaignService";
export const runtime = "nodejs";
export const maxDuration = 300;
export async function GET(request: Request) {
  if (!authorizePackWorker(request.headers.get("authorization"), process.env.CRON_SECRET)) return Response.json({ error: "Not permitted" }, { status: 401 });
  try { return Response.json({ ok: true, results: await createPackCampaign().run() }, { headers: { "Cache-Control": "no-store" } }); }
  catch { return Response.json({ error: "Campaign unavailable" }, { status: 503, headers: { "Cache-Control": "no-store" } }); }
}
