import { handlePackLink } from "@/lib/packLinkResponse";
export const runtime = "nodejs";
export const maxDuration = 60;
export const GET = (request: Request) => handlePackLink(request, "confirm");
export const POST = GET;
