import Link from "next/link";
import PageShell from "../../components/PageShell";
import { PageContainer, SectionShell, HeadingStack } from "../../components/LayoutPrimitives";
import { buildDomainMetadata, domainContentMap } from "../content";

const content = domainContentMap["grief-honour"];

export const metadata = buildDomainMetadata(content);

export default function GriefHonourPage() {
  return (
    <PageShell>
      <PageContainer>
        <SectionShell variant="hero" className="space-y-6 text-left">
          <p className="ic-eyebrow">Iron Compass Domain</p>
          <h1 className="ic-page-title text-left">Grief &amp; Honour</h1>
          <p className="ic-section-copy ic-section-copy--muted max-w-3xl">
            Grief proves something mattered. Honour turns that pain into responsibility instead of destruction. This domain stabilises the body, builds rituals, and restores forward motion so suffering becomes legacy instead of collapse.
          </p>
          <div className="ic-cta-row">
            <Link href="/start" className="ic-btn-primary text-xs sm:text-[0.72rem]">
              Start Your Rise
            </Link>
            <Link href="/download" className="ic-btn-ghost text-xs sm:text-[0.7rem]">
              Download Iron Compass AI
            </Link>
          </div>
          <p className="ic-section-copy ic-section-copy--muted text-sm">Trusted by men carrying heavy seasons without collapsing.</p>
        </SectionShell>

        <SectionShell variant="panel" className="space-y-4 md:space-y-5 text-left">
          <h2 className="ic-heading-2 text-left">Why Grief &amp; Honour Matter More Than Men Realise</h2>
          <p className="ic-section-copy">
            Loss will visit every man. Without structure, grief becomes chaos—sleep breaks, tempers flare, and impulsive decisions cause long-term damage. Honour gives pain a job: to build strength, gratitude, and forward motion.
          </p>
          <p className="ic-section-copy">
            Iron Compass keeps you functional while you hurt, so responsibilities stay intact and meaning is carried forward.
          </p>
        </SectionShell>

        <SectionShell variant="panel" className="space-y-4 md:space-y-5 text-left">
          <h2 className="ic-heading-2 text-left">The Modern Grief Problem</h2>
          <p className="ic-section-copy">
            Many pretend nothing hurts and implode later. Others burn everything down with impulsive decisions, numb with substances, or isolate until responsibilities collapse. Online bravado hides real pain and delays healing.
          </p>
          <p className="ic-section-copy">
            Iron Compass stabilises the body first, then gives grief a channel through honour and direction.
          </p>
        </SectionShell>

        <SectionShell variant="panel" className="space-y-5 md:space-y-6 text-left">
          <HeadingStack title="Four Pillars of Grief &amp; Honour" center={false} className="space-y-2" />
          <div className="space-y-6 md:space-y-7">
            <div className="space-y-3">
              <h3 className="ic-heading-3 text-left">1. Stabilise</h3>
              <p className="ic-section-copy">
                Sleep, water, movement, and guardrails first. Stabilising the body lowers emotional volatility and prevents self-destruction while pain is fresh.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="ic-heading-3 text-left">2. Honour</h3>
              <p className="ic-section-copy">
                Letters, rituals, and actions that reflect what was lost. Honour keeps meaning alive and channels grief into respect instead of rage or numbness.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="ic-heading-3 text-left">3. Walk Forward</h3>
              <p className="ic-section-copy">
                Small, deliberate steps toward a reshaped future—no drastic life decisions, just steady motion so you do not get stuck in the crater.
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="ic-heading-3 text-left">4. Brotherhood</h3>
              <p className="ic-section-copy">
                Let loyal men carry weight with you. Isolation magnifies pain; shared load keeps you standing. Brotherhood is a guardrail against self-destruction.
              </p>
            </div>
          </div>
        </SectionShell>

        <SectionShell variant="panel" className="space-y-4 md:space-y-5 text-left">
          <h2 className="ic-heading-2 text-left">How Men Quietly Undermine Their Own Healing</h2>
          <p className="ic-section-copy">
            Suppressing emotion until it explodes, making major decisions while flooded, numbing with substances, and refusing support. These choices feel strong but create long-term damage to body, relationships, and mission.
          </p>
        </SectionShell>

        <SectionShell variant="panel" className="space-y-4 md:space-y-5 text-left">
          <h2 className="ic-heading-2 text-left">Grief &amp; Honour as Identity Support</h2>
          <p className="ic-section-copy">
            How you carry loss becomes part of your name. Stabilising, honouring, and moving forward show your family and brothers what integrity looks like under pain. It reinforces Discipline, protects Bonds, and clarifies Identity &amp; Legacy.
          </p>
        </SectionShell>

        <SectionShell variant="panel" className="space-y-4 md:space-y-5 text-left">
          <h2 className="ic-heading-2 text-left">Practical Standards (Without Obsession)</h2>
          <p className="ic-section-copy">
            Guard three stabilisers daily (sleep window, walk, meal). Create a weekly honour ritual. Delay major decisions for 90 days. Talk to one trusted brother or counsellor. Keep the body moving and the calendar simple.
          </p>
        </SectionShell>

        <SectionShell variant="panel" className="space-y-4 md:space-y-5 text-left">
          <h2 className="ic-heading-2 text-left">Grief Across Life Phases</h2>
          <p className="ic-section-copy">
            Loss looks different during deployment, parenting, career transitions, or ageing parents. The protocol stays: stabilise, honour, walk forward, and lean on brotherhood. Adjust the pace, not the standards.
          </p>
        </SectionShell>

        <SectionShell variant="panel" className="space-y-4 md:space-y-5 text-left">
          <h2 className="ic-heading-2 text-left">How Grief &amp; Honour Connect to the Iron Compass System</h2>
          <div className="space-y-3">
            <p className="ic-section-copy">Grief &amp; Honour supports:</p>
            <ul className="list-disc list-inside space-y-1 ic-section-copy">
              <li>Discipline &amp; Mindset: structure prevents collapse during pain</li>
              <li>Strength &amp; Health: stabilising the body keeps you functional</li>
              <li>Purpose &amp; Direction: forward motion resumes with honesty</li>
              <li>Identity &amp; Legacy: honour turns suffering into meaning</li>
              <li>Bonds: brotherhood shares the weight so you can heal</li>
            </ul>
            <p className="ic-section-copy">Pain without structure spreads; pain with honour strengthens the system.</p>
          </div>
        </SectionShell>

        <SectionShell variant="panel" className="space-y-4 md:space-y-5 text-left">
          <h2 className="ic-heading-2 text-left">How Iron Compass AI Extends This Domain</h2>
          <div className="space-y-3">
            <p className="ic-section-copy">This page sets the guardrails. The Toolkit and App guide you through them.</p>
            <p className="ic-section-copy">They provide:</p>
            <ul className="list-disc list-inside space-y-1 ic-section-copy">
              <li>Stabilisation checklists for sleep, food, and movement</li>
              <li>Honour ritual prompts and tracking</li>
              <li>Decision-delay reminders during acute grief</li>
              <li>Daily check-ins to prevent isolation</li>
              <li>Forward-planning micro-steps when you are ready</li>
            </ul>
            <p className="ic-section-copy">Grief is carried with structure instead of chaos.</p>
          </div>
        </SectionShell>

        <SectionShell variant="panel" className="space-y-4 md:space-y-5 text-center">
          <h2 className="ic-heading-2 mx-auto text-center">Start Your Rise</h2>
          <p className="ic-section-copy ic-section-copy--muted text-center max-w-2xl mx-auto">
            Start Your Rise → /start
            <br />
            Download Iron Compass AI → /download
          </p>
          <div className="ic-cta-row justify-center">
            <Link href="/start" className="ic-btn-primary text-xs sm:text-[0.72rem]">
              Start Your Rise
            </Link>
            <Link href="/download" className="ic-btn-ghost text-xs sm:text-[0.7rem]">
              Download Iron Compass AI
            </Link>
          </div>
        </SectionShell>
      </PageContainer>
    </PageShell>
  );
}
