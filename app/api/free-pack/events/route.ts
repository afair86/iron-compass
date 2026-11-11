import { createPackCampaign } from "@/lib/packCampaignService";
import { boundedPackText } from "@/lib/packLinkResponse";
import { verifyPackWebhook, applyPackWebhook } from "@/lib/packWebhook";
import { PublicRequestError } from "@/lib/publicRequest";
export const runtime = "nodejs";
export async function POST(request: Request) {
  try {
    if (!process.env.PACK_RESEND_WEBHOOK_SECRET) return Response.json({ error: "Not configured" }, { status: 503 });
    const event = verifyPackWebhook(await boundedPackText(request), request.headers, process.env.PACK_RESEND_WEBHOOK_SECRET);
    await applyPackWebhook(createPackCampaign(), event);
    return Response.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) { return Response.json({ error: "Event not accepted" }, { status: error instanceof PublicRequestError ? error.status : 503 }); }
}
