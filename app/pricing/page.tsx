import Link from "next/link";
import PageShell from "../components/PageShell";
import PhotoFrame from "../components/brand/PhotoFrame";
import { pagePeoplePhotoAlts, pagePeoplePhotos } from "@/lib/sitePhotos";
import { buildPageMetadata, productAppHref } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Iron Compass AI Pricing | Free, Core and Elite Plans",
  description:
    "Free, Core, and Elite. Core is A$19.99 a month or A$199 a year, with a 7-day trial. Elite is A$34.99 a month or A$349 a year.",
  path: "/pricing",
});

const PLANS = [
  {
    name: "Free",
    price: "A$0",
    detail:
      "Habits, next action, a journal, your Standard and the toolkit guides. No interactive tools and no AI.",
  },
  {
    name: "Core",
    price: "A$19.99",
    detail:
      "A$199 a year. 7-day trial on the website, card required. AI coaching, AI journal reviews and five tools: Today’s preparation, Weekly awareness, Weekly review, Identity snapshot and Forecast.",
    highlight: "Daily coaching and planning",
  },
  {
    name: "Elite",
    price: "A$34.99",
    detail:
      "A$349 a year. Everything in Core, plus all eight tools, adding 90-day strategy, Comeback protocol and 90-day review. Our most advanced AI coaching.",
  },
];

export default function PricingPage() {
  const app = productAppHref();

  return (
    <PageShell className="ic-public-page">
      <div className="ic-content-stack max-w-3xl">
        <section className="ic-pricing-hero">
          <div className="ic-pricing-hero__copy space-y-4">
            <h1 className="ic-section-title">Free, Core, and Elite</h1>
            <p className="ic-display-subtitle">
              Start free. Add the tools when your week needs them.
            </p>
            <p className="ic-section-copy">
              Core adds AI coaching and five tools. Elite adds all eight tools.
              Cancel any time. Your history stays if you move down. On iPhone,
              Apple shows the App Store price.
            </p>
            <div className="ic-cta-pair">
              <a href={`${app}/auth`} className="ic-btn-primary">
                Start free
              </a>
              <a href="#plans" className="ic-btn-ghost">
                Compare plans
              </a>
            </div>
            <p>
              <Link href="/download" className="ic-app-value__guide">
                See the app before you choose a plan
              </Link>
            </p>
          </div>
          <div className="ic-pricing-hero__portrait">
            <PhotoFrame
              className="ic-pricing-hero__photo"
              src={pagePeoplePhotos.pricing}
              alt={pagePeoplePhotoAlts.pricing}
              showMark={false}
              fit="cover"
              position="center"
            />
            <p className="ic-family-caption">
              <Link href="/about#founder-full">
                Adam, founder, with his children.
              </Link>
            </p>
          </div>
        </section>
        <section id="plans" className="ic-band ic-editorial-center">
          <div className="ic-board-plans">
            {PLANS.map((plan) => (
              <section
                key={plan.name}
                className={`ic-board-plan${plan.highlight ? " ic-board-plan--core" : ""} space-y-3`}
              >
                <p
                  className="ic-eyebrow"
                  aria-hidden={!plan.highlight || undefined}
                >
                  {plan.highlight || "\u00a0"}
                </p>
                <h2 className="ic-section-heading">{plan.name}</h2>
                <p className="ic-section-title">{plan.price}</p>
                <p className="ic-section-copy">
                  {plan.name === "Free" ? "Free account" : "per month · AUD"}
                </p>
                <p className="ic-section-copy">{plan.detail}</p>
                <div className="ic-plan-action">
                  <a
                    className={
                      plan.name === "Core" ? "ic-btn-primary" : "ic-btn-ghost"
                    }
                    href={`${app}/${plan.name === "Free" ? "auth" : "pricing"}`}
                  >
                    {plan.name === "Free"
                      ? "Start free"
                      : `View ${plan.name} in the app`}
                  </a>
                </div>
              </section>
            ))}
          </div>
          <div className="ic-cta-pair">
            <a href={`${app}/auth`} className="ic-btn-primary">
              Start free
            </a>
            <Link href="/domains" className="ic-btn-ghost">
              Explore the domains
            </Link>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
