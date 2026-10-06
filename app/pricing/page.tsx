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
    detail: "Habits, One Move, a basic Journal, and one Challenge. No intelligence layer.",
  },
  {
    name: "Core",
    price: "A$19.99",
    detail: "A$199 a year. 7-day trial, card required. The full operating system: standards, habits, Journal, Ledger, reviews, and Ask.",
    highlight: "Most Popular",
  },
  {
    name: "Elite",
    price: "A$34.99",
    detail: "A$349 a year. Everything in Core, plus Strategy, Prediction, and the Annual Review.",
  },
];

export default function PricingPage() {
  const app = productAppHref();

  return (
    <PageShell>
      <div className="ic-content-stack max-w-3xl">
        <section className="ic-panel space-y-4">
          <p className="ic-eyebrow">Plans</p>
          <h1 className="ic-section-title">Free, Core, and Elite</h1>
          <p className="ic-section-copy">
            Core is the complete product. Elite adds depth. Cancel any time. Your history stays if you move down.
          </p>
        </section>
        <div className="ic-board-plans">
        {PLANS.map((plan) => (
          <section key={plan.name} className={`ic-board-plan${plan.highlight ? " ic-board-plan--core" : ""} space-y-3`}>
            {plan.highlight ? <p className="ic-eyebrow">{plan.highlight}</p> : null}
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
