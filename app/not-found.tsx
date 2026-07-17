import Link from "next/link";
import PageShell from "@/app/components/PageShell";
import { PageContainer, SectionShell } from "@/app/components/LayoutPrimitives";
import { buildPageMetadata } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Page Not Found | Iron Compass AI",
  description: "This page does not exist. Return to the journal, domains, or homepage.",
  path: "/404",
  robots: { index: false, follow: true },
});

export default function NotFound() {
  return (
    <PageShell>
      <PageContainer width="narrow">
        <SectionShell variant="hero" className="space-y-6">
          <p className="ic-eyebrow">404</p>
          <h1 className="ic-page-title">Page Not Found</h1>
          <p className="ic-section-copy ic-section-copy--muted max-w-2xl">
            This URL does not exist or has moved. Use the links below to get back on track.
          </p>
          <div className="ic-cta-row">
            <Link href="/" className="ic-btn-primary text-[0.62rem]">
              Home
            </Link>
            <Link href="/blog" className="ic-btn-ghost text-[0.6rem]">
              Journal
            </Link>
            <Link href="/domains" className="ic-btn-ghost text-[0.6rem]">
              Domains
            </Link>
          </div>
        </SectionShell>
      </PageContainer>
    </PageShell>
  );
}
