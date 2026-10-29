import Link from "next/link";
import ContactForm from "../components/ContactForm";
import PageShell from "../components/PageShell";
import PhotoFrame from "../components/brand/PhotoFrame";
import { pagePhotoAlts, pagePhotos } from "@/lib/sitePhotos";
import { PageContainer, SectionShell, HeadingStack } from "../components/LayoutPrimitives";
import { buildPageMetadata } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Contact Iron Compass",
  description: "Operations, support, and partnership channels for Iron Compass. Reach the team directly and expect a disciplined response.",
  path: "/contact",
});

const channels = [
  {
    label: "Member Support",
    body: "Questions about the site, the journal, or the domains. We read these daily.",
  },
  {
    label: "Security & Legal",
    body: "Report security concerns, request data exports, or send formal notices.",
  },
];

const responseStandards = [
  "Email is the way to reach us. Expect a reply within two business days.",
  "Operational updates and investor communication route through weekly briefings.",
  "We do not outsource member data or sell contact information—ever.",
];

export default function ContactPage() {
  return (
    <PageShell>
      <PageContainer>
        <SectionShell variant="hero" className="space-y-6">
          <PhotoFrame src={pagePhotos.contact} alt={pagePhotoAlts.contact} />
          <h1 className="ic-page-title">Contact &amp; Signal Channels</h1>
          <p className="ic-section-copy ic-section-copy--muted max-w-3xl mx-auto">
            Iron Compass responds with the same discipline we demand from members. Pick the channel that matches your mission, send a precise brief,
            and expect a direct answer within two business days.
          </p>
          <div className="ic-cta-row pt-2">
            <Link href="/domains" className="ic-btn-primary text-[0.62rem]">
              Read the domains
            </Link>
            <Link href="/blog" className="ic-btn-ghost text-[0.6rem]">
              Read the journal
            </Link>
          </div>
        </SectionShell>

        <SectionShell variant="panel" className="space-y-6">
          <HeadingStack eyebrow="Pick the right lane" title="Routes to reach us" />
          <div className="grid gap-6 md:grid-cols-2 items-stretch justify-items-center max-w-4xl mx-auto">
            {channels.map((channel) => (
              <article key={channel.label} className="ic-panel-muted flex flex-col gap-3 ic-align-center h-full w-full min-w-0 md:max-w-md">
                <h3 className="text-xs md:text-sm font-heading tracking-[0.18em] uppercase text-[var(--ic-text-heading)] mx-auto leading-tight">
                  {channel.label}
                </h3>
                <p className="ic-section-copy ic-section-copy--muted text-sm leading-relaxed mx-auto max-w-xs">{channel.body}</p>
              </article>
            ))}
          </div>
        </SectionShell>

        <SectionShell variant="outline" className="space-y-6">
          <HeadingStack eyebrow="Response standards" title="How we handle your message" />
          <ul className="space-y-3 text-sm mx-auto max-w-3xl">
            {responseStandards.map((line) => (
              <li key={line} className="ic-dot-list">
                <span>{line}</span>
              </li>
            ))}
          </ul>
        </SectionShell>

        <SectionShell variant="panel" className="flex flex-col gap-6 ic-align-center">
          <div className="space-y-2">
            <h2 className="ic-heading-2">Write to us.</h2>
            <p className="ic-section-copy ic-section-copy--muted text-sm">
              Send a short note and we will answer by email.
            </p>
          </div>
          <ContactForm />
        </SectionShell>
      </PageContainer>
    </PageShell>
  );
}
