import AppValuePanel from "@/app/components/AppValuePanel";
import Link from "next/link";
import PageShell from "../components/PageShell";
import { buildPageMetadata } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Iron Compass AI Daily Practice",
  description:
    "A focused daily compass that keeps your actions aligned with the man you are becoming. Simple structure, zero fluff.",
  path: "/daily",
  robots: { index: false, follow: true },
});

export default function Page() {
  return (
    <PageShell className="ic-public-page">
      <div className="ic-content-stack ic-content-narrow ic-align-center">
        <section className="ic-panel space-y-5 ic-align-center">
          <h1 className="ic-section-title">
            A daily practice you can return to
          </h1>
          <p className="ic-section-copy ic-section-copy--muted">
            Choose one responsibility. Set a small action for today and a
            lighter version for the days that change. At the end of the week,
            review what held and what needs adjusting.
          </p>
          <div className="ic-cta-row pt-2">
            <Link href="/blog" className="ic-btn-primary">
              Read the journal
            </Link>
            <Link href="/domains" className="ic-btn-ghost text-[0.6rem]">
              Explore Domains
            </Link>
            <AppValuePanel />
          </div>
        </section>
      </div>
    </PageShell>
  );
}
