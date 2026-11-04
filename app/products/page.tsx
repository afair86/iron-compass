import AppValuePanel from "@/app/components/AppValuePanel";
import Link from "next/link";
import PageShell from "../components/PageShell";
import { buildPageMetadata } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Iron Compass AI Toolkits",
  description:
    "Digital toolkits and systems to help men build discipline, strength, purpose, and leadership. Calm, trustworthy, and built for long-term growth.",
  path: "/products",
  robots: { index: false, follow: true },
});

export default function ProductsPage() {
  return (
    <PageShell className="ic-public-page">
      <div className="ic-content-stack ic-content-narrow ic-align-center">
        <section className="ic-panel space-y-5 ic-align-center">
          <h1 className="ic-section-title">
            Practical guides. A place to put them to work.
          </h1>
          <p className="ic-section-copy ic-section-copy--muted">
            Use the public domain guides and journal tools without an account.
            Each offers an action you can use today. When you want a daily
            record, carry the practice into the Iron Compass AI app.
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
