import { handlePackLink } from "@/lib/packLinkResponse";
export const runtime = "nodejs";
export const GET = (request: Request) => handlePackLink(request, "unsubscribe");
export const POST = GET;
