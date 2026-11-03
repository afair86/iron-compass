import Link from "next/link";
import PageShell from "../components/PageShell";
import { buildPageMetadata, productAppHref } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Pricing",
  description:
    "Free, Core, and Elite. Core is A$19.99 a month or A$199 a year, with a 7-day trial. Elite is A$34.99 a month or A$349 a year.",
  path: "/pricing",
});

const PLANS = [
  {
    name: "Free",
    price: "A$0",
    detail: "Habits, next action, a journal, your Standard and the toolkit guides. No interactive tools and no AI.",
  },
  {
    name: "Core",
    price: "A$19.99",
    detail: "A$199 a year. 7-day trial on the website, card required. AI coaching, AI journal reviews and five tools: Today’s preparation, Weekly awareness, Weekly review, Identity snapshot and Forecast.",
    highlight: "Most Popular",
  },
  {
    name: "Elite",
    price: "A$34.99",
    detail: "A$349 a year. Everything in Core, plus all eight tools, adding 90-day strategy, Comeback protocol and 90-day review. Our most advanced AI coaching.",
  },
];

export default function PricingPage() {
  const app = productAppHref();

  return (
    <PageShell>
      <div className="ic-content-stack max-w-3xl">
        <section className="ic-panel ic-editorial-center space-y-4">
          <p className="ic-eyebrow">Plans</p>
          <h1 className="ic-section-title">Free, Core, and Elite</h1>
          <p className="ic-section-copy">
            Core adds AI coaching and five tools. Elite adds all eight tools. Cancel any time. Your history stays if you move down. On iPhone, Apple shows the App Store price.
          </p>
        </section>
        <div className="ic-board-plans">
        {PLANS.map((plan) => (
          <section key={plan.name} className={`ic-board-plan${plan.highlight ? " ic-board-plan--core" : ""} space-y-3`}>
            <p className="ic-eyebrow" aria-hidden={!plan.highlight || undefined}>{plan.highlight || "\u00a0"}</p>
            <h2 className="ic-section-heading">{plan.name}</h2>
            <p className="ic-section-title">{plan.price}</p>
            <p className="ic-section-copy">{plan.detail}</p>
          </section>
        ))}
        </div>
        <Link href={`${app}/auth`} className="ic-btn-primary">
          Start
        </Link>
      </div>
    </PageShell>
  );
}
