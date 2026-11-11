import AppValuePanel from "@/app/components/AppValuePanel";
import Link from "next/link";
import Script from "next/script";
import PageShell from "../components/PageShell";
import { buildPageMetadata } from "@/lib/site";
import { domainNavLinks } from "@/lib/domains";

export const metadata = buildPageMetadata({
  title: "Start with One Responsibility | Iron Compass AI",
  description:
    "Choose the responsibility that needs attention. Find a practical guide, set one clear action and make room for it in your week with Iron Compass AI.",
  path: "/start",
});

const domains = domainNavLinks;

export default function StartPage() {
  const steps = [
    {
      title: "Choose Your Domain",
      copy: "Choose the responsibility that needs attention: your health, your work, your money or the people who depend on you.",
    },
    {
      title: "Set Your Direction",
      copy: "Name one useful action and when you will do it. Keep it small enough to carry out on a difficult day.",
    },
    {
      title: "Build Your Daily Compass",
      copy: "Keep a daily habit, record what happened, and review the week. Adjust the plan without abandoning the responsibility.",
    },
  ];

  return (
    <PageShell className="ic-public-page">
      <div className="ic-content-stack max-w-3xl">
        <section className="ic-panel ic-align-center ic-editorial-center space-y-6">
          <h1 className="ic-section-title">Start Your Compass</h1>
          <p className="ic-section-copy ic-section-copy--muted text-base">
            Choose one responsibility. Set a habit you can keep today. Return at
            the end of the week and review what held.
          </p>
          <div className="ic-cta-pair">
            <a href="/app/auth" className="ic-btn-primary">
              Start free
            </a>
            <Link href="/domains" className="ic-btn-ghost">
              Explore the domains
            </Link>
          </div>
        </section>

        <section className="ic-panel-outline space-y-4">
          <header className="space-y-2 ic-align-center ic-editorial-center">
            <h2 className="ic-section-heading">
              Identity → Discipline → Purpose
            </h2>
          </header>
          <p className="ic-section-copy ic-section-copy--muted">
            Decide what you are responsible for, then give it a place in your
            day. The domains explain the standard; the app helps you keep a
            record of the habits and decisions behind it.
          </p>
        </section>

        <section className="space-y-6 ic-align-center">
          <header className="space-y-2 ic-align-center ic-editorial-center">
            <h2 className="ic-section-heading">Put it into practice</h2>
          </header>
          <ol className="space-y-6">
            {steps.map((step, index) => (
              <li
                key={step.title}
                className="ic-panel-muted flex gap-4 items-start text-left"
              >
                <span className="text-white text-xl font-semibold">
                  {index + 1}
                </span>
                <div className="space-y-2">
                  <h3 className="text-lg font-heading tracking-[0.3em] uppercase text-[var(--ic-text-heading)]">
                    {step.title}
                  </h3>
                  <p className="ic-section-copy ic-section-copy--muted">
                    {step.copy}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="ic-panel space-y-6 ic-align-center">
          <header className="space-y-2 ic-align-center ic-editorial-center">
            <h2 className="ic-section-heading ic-align-center">
              Choose where to begin
            </h2>
          </header>
          <div className="grid gap-4">
            {domains.map((domain) => (
              <Link
                key={domain.href}
                href={domain.href}
                className="ic-footer-pill"
              >
                {domain.label}
              </Link>
            ))}
          </div>
        </section>

        <section className="ic-panel ic-align-center ic-editorial-center space-y-4">
          <h2 className="ic-section-heading ic-align-center">
            Give it a place in this week
          </h2>
          <p className="ic-section-copy ic-section-copy--muted">
            Choose one action and a time you can keep. At the end of the week,
            look at what happened and decide what needs adjusting.
          </p>
        </section>

        <section id="common-questions" className="ic-panel-outline ic-align-center space-y-4">
          <h2 className="ic-section-heading">FAQ</h2>
          <div className="space-y-3 max-w-3xl mx-auto text-left">
            <div>
              <h3 className="font-heading tracking-[0.2em] uppercase text-[var(--ic-text-heading)] text-sm">
                Who is Iron Compass AI for?
              </h3>
              <p className="ic-section-copy ic-section-copy--muted text-sm">
                Men who want to carry their responsibilities with more
                discipline, steadiness and follow-through.
              </p>
            </div>
            <div>
              <h3 className="font-heading tracking-[0.2em] uppercase text-[var(--ic-text-heading)] text-sm">
                Do I need the app to start?
              </h3>
              <p className="ic-section-copy ic-section-copy--muted text-sm">
                No. Begin with the domain pages and the journal. You do not need
                an account.
              </p>
            </div>
            <div>
              <h3 className="font-heading tracking-[0.2em] uppercase text-[var(--ic-text-heading)] text-sm">
                Which domain should I pick first?
              </h3>
              <p className="ic-section-copy ic-section-copy--muted text-sm">
                Start with the responsibility you are most likely to neglect
                this week. Choose one domain and one action you can carry out
                today.
              </p>
            </div>
          </div>
          <div className="ic-cta-row pt-1">
            <Link href="/domains" className="ic-btn-primary text-[0.62rem]">
              Explore Domains
            </Link>
            <Link href="/blog" className="ic-btn-ghost text-[0.6rem]">
              Read the Journal
            </Link>
          </div>
        </section>

        <Script
          id="start-faq-ld"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "Who is Iron Compass AI for?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Men who want to carry their responsibilities with more discipline, steadiness and follow-through.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Do I need the app to start?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "No. Begin with the domain pages and the journal. You do not need an account.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Which domain should I pick first?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Start with the responsibility you are most likely to neglect this week. Choose one domain and one action you can carry out today.",
                  },
                },
              ],
            }),
          }}
        />
        <AppValuePanel />
      </div>
    </PageShell>
  );
}
