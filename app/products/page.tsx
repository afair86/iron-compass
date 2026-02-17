// LEGACY PLACEHOLDER: this route has been neutralised and will be rebuilt using the new Iron Compass Tailwind design system.
export const metadata = {
  title: "Iron Compass Toolkits",
  description:
    "Digital toolkits and systems to help men build discipline, strength, purpose, and leadership. Calm, trustworthy, and built for long-term growth.",
};
import Link from "next/link";
import PageShell from "../components/PageShell";

export default function ProductsPage() {
  return (
    <PageShell>
      <div className="ic-content-stack ic-content-narrow text-center">
        <section className="ic-panel space-y-5 text-center">
          <h1 className="ic-section-title">Products page queued for rebuild</h1>
          <p className="ic-section-copy ic-section-copy--muted">
            This page is part of the legacy interface and is being upgraded to the new Iron Compass design. Use the links below to continue.
          </p>
          <div className="ic-cta-row pt-2">
            <Link href="/" className="ic-btn-primary text-[0.62rem]">
              Return Home
            </Link>
            <Link href="/domains" className="ic-btn-ghost text-[0.6rem]">
              Explore Domains
            </Link>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
