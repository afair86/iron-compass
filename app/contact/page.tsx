import Link from "next/link";
import PageShell from "../components/PageShell";
import { PageContainer, SectionShell, HeadingStack } from "../components/LayoutPrimitives";

export const metadata = {
  title: "Contact Iron Compass",
  description: "Operations, support, and partnership channels for Iron Compass. Reach the team directly and expect a disciplined response.",
};

const channels = [
  {
    label: "Member Support",
    address: "support@ironcompass.ai",
    body: "Account help, billing clarity, or app issues. Monitored daily with priority to active members.",
  },
  {
    label: "Security & Legal",
    address: "legal@ironcompass.ai",
    body: "Report security concerns, request data exports, or send formal notices. Encryption preferred.",
  },
];

const responseStandards = [
  "Support tickets inside the app get priority over email threads.",
  "Operational updates and investor communication route through weekly briefings.",
  "We do not outsource member data or sell contact information—ever.",
];

export default function ContactPage() {
  return (
    <PageShell>
      <PageContainer>
        <SectionShell variant="hero" className="space-y-6 text-center">
          <h1 className="ic-page-title text-center mx-auto">Contact &amp; Signal Channels</h1>
          <p className="ic-section-copy ic-section-copy--muted max-w-3xl mx-auto">
            Iron Compass responds with the same discipline we demand from members. Pick the channel that matches your mission, send a precise brief,
            and expect a direct answer within two business days.
          </p>
          <div className="ic-cta-row pt-2">
            <Link href="/start" className="ic-btn-primary text-[0.62rem]">
              Become a Member
            </Link>
            <Link href="/domains" className="ic-btn-ghost text-[0.6rem]">
              Review Domains
            </Link>
          </div>
        </SectionShell>

        <SectionShell variant="panel" className="space-y-6 text-center">
          <HeadingStack eyebrow="Pick the right lane" title="Routes to reach us" />
          <div className="grid gap-6 md:grid-cols-2 items-stretch justify-items-center max-w-4xl mx-auto">
            {channels.map((channel) => (
              <article key={channel.label} className="ic-panel-muted flex flex-col gap-3 text-center h-full w-full min-w-0 md:max-w-md">
                <h3 className="text-xs md:text-sm font-heading tracking-[0.18em] uppercase text-[var(--ic-text-heading)] mx-auto leading-tight">
                  {channel.label}
                </h3>
                <a
                  href={`mailto:${channel.address}`}
                  className="text-base md:text-lg font-heading tracking-[0.12em] uppercase text-white leading-6 text-center break-words mx-auto"
                >
                  {channel.address}
                </a>
                <p className="ic-section-copy ic-section-copy--muted text-sm leading-relaxed mx-auto max-w-xs">{channel.body}</p>
              </article>
            ))}
          </div>
        </SectionShell>

        <SectionShell variant="outline" className="space-y-6 text-center">
          <HeadingStack eyebrow="Response standards" title="How we handle your message" />
          <ul className="space-y-3 text-sm text-left mx-auto max-w-3xl">
            {responseStandards.map((line) => (
              <li key={line} className="ic-dot-list">
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </SectionShell>

        <SectionShell variant="panel" className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 text-center">
          <div className="space-y-2">
            <h2 className="ic-heading-2">Message us inside the Iron Compass app.</h2>
            <p className="ic-section-copy ic-section-copy--muted text-sm">
              Live chat is staffed during Australian business hours with weekend monitoring for mission-critical issues.
            </p>
          </div>
          <Link href="/start" className="ic-btn-primary text-[0.62rem] self-center">
            Open the App
          </Link>
        </SectionShell>
      </PageContainer>
    </PageShell>
  );
}
