import Link from "next/link";
import PageShell from "../components/PageShell";
import { PageContainer, SectionShell, HeadingStack } from "../components/LayoutPrimitives";

export const metadata = {
  title: "About Iron Compass",
  description:
    "Learn about the Iron Compass philosophy—a complete life system for men built on discipline, purpose, strength, and integrity. Discover who it is for, why it exists, and the core values that set it apart.",
};

const pillars = [
  "Discipline over motivation—minimums fire daily.",
  "Purpose chosen on paper, translated into cadence.",
  "Strength, leadership, and financial power built through standards.",
  "Technology used as leverage, not a crutch.",
];

const builtFor = [
  "Men who want a complete system, not scattered hacks.",
  "Operators balancing family, work, and personal mission.",
  "Builders who pair aggression with integrity and accountability.",
];

export default function AboutPage() {
  return (
    <PageShell>
      <PageContainer>
        <SectionShell variant="hero" className="text-center space-y-5">
          <h1 className="ic-page-title text-center mx-auto">About the System</h1>
          <p className="ic-section-copy ic-section-copy--muted max-w-3xl mx-auto">
            Iron Compass is a life system for men who want discipline, purpose, strength, and integrity without noise. One map, eight domains, and the
            same standards we run inside the app.
          </p>
          <div className="ic-cta-row pt-2">
            <Link href="/domains" className="ic-btn-primary text-[0.62rem]">
              Explore the Domains
            </Link>
            <Link href="/start" className="ic-btn-ghost text-[0.6rem]">
              Start Inside the App
            </Link>
          </div>
        </SectionShell>

        <SectionShell variant="panel" className="space-y-6 text-center">
          <HeadingStack eyebrow="Operating Principles" title="What makes Iron Compass different" />
          <ul className="space-y-3 text-sm text-left mx-auto max-w-3xl">
            {pillars.map((item) => (
              <li key={item} className="ic-dot-list">
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </SectionShell>

        <SectionShell variant="panel" className="space-y-6 text-center">
          <HeadingStack eyebrow="Who it's for" title="Men who refuse drift" />
          <ul className="space-y-3 text-sm text-left mx-auto max-w-3xl">
            {builtFor.map((item) => (
              <li key={item} className="ic-dot-list">
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </SectionShell>

        <SectionShell variant="outline" className="space-y-4 text-center">
          <h2 className="ic-heading-2 text-center mx-auto">Ready to see it in motion?</h2>
          <p className="ic-section-copy ic-section-copy--muted max-w-2xl mx-auto">
            Browse the eight domains or head straight to the app. The standards are the same across every route.
          </p>
          <div className="ic-cta-row justify-center">
            <Link href="/domains" className="ic-btn-primary text-[0.62rem]">
              View Domains
            </Link>
            <Link href="/blog" className="ic-btn-ghost text-[0.6rem]">
              Read the Journal
            </Link>
          </div>
        </SectionShell>
      </PageContainer>
    </PageShell>
  );
}
