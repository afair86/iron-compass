import Link from "next/link";
import FounderNote from "../components/FounderNote";
import PageShell from "../components/PageShell";
import PhotoFrame from "../components/brand/PhotoFrame";
import { pagePhotoAlts, pagePhotos } from "@/lib/sitePhotos";
import { PageContainer, SectionShell, HeadingStack } from "../components/LayoutPrimitives";
import { buildPageMetadata } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "About Iron Compass AI",
  description:
    "Why Iron Compass AI exists: practical Stoicism, daily discipline and responsibility. Read the founder’s story and explore the ten life domains behind the app.",
  path: "/about",
});

const pillars = [
  "Keep a daily standard, including on difficult days.",
  "Give your responsibilities time in the week.",
  "Build strength, leadership and financial steadiness through repeated action.",
  "Use technology to support your judgment and follow-through.",
];

const builtFor = [
  "Men who want a practical structure for their responsibilities.",
  "Fathers, partners and leaders balancing family, work and health.",
  "Men prepared to keep a standard and take ownership when they miss it.",
];

export default function AboutPage() {
  return (
    <PageShell>
      <PageContainer>
        <SectionShell variant="hero" className="space-y-5">
          <PhotoFrame src={pagePhotos.about} alt={pagePhotoAlts.about} />
          <h1 className="ic-page-title">About the System</h1>
          <p className="ic-section-copy ic-section-copy--muted max-w-3xl mx-auto">
            Iron Compass AI is a life system for men who want discipline, purpose, strength, and integrity without noise. One map, ten life domains, and
            standards you can use this week.
          </p>
          <div className="ic-cta-pair">
            <Link href="/domains" className="ic-btn-primary">
              Explore the domains
            </Link>
            <Link href="/blog" className="ic-btn-ghost">
              Read the journal
            </Link>
          </div>
        </SectionShell>

        <FounderNote variant="full" />

        <SectionShell variant="panel" className="space-y-6 ic-band">
          <HeadingStack eyebrow="Operating Principles" title="What makes Iron Compass AI different" />
          <ul className="space-y-3 text-sm mx-auto max-w-3xl">
            {pillars.map((item) => (
              <li key={item} className="ic-dot-list">
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </SectionShell>

        <SectionShell variant="panel" className="space-y-6">
          <HeadingStack eyebrow="Who it's for" title="Men who refuse drift" />
          <ul className="space-y-3 text-sm mx-auto max-w-3xl">
            {builtFor.map((item) => (
              <li key={item} className="ic-dot-list">
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </SectionShell>


      </PageContainer>
    </PageShell>
  );
}
