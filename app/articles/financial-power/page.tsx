import TopicHubView from "../components/TopicHubView";
import { financialHubLinks } from "@/lib/articleHubs";
import { buildPageMetadata } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Financial Power Guides for Men | Iron Compass AI",
  description:
    "Cashflow systems, runway protection, and money discipline for men who want control — not chaos. Start with the guides that match your current pressure.",
  path: "/articles/financial-power",
});

export default function FinancialPowerHubPage() {
  return (
    <TopicHubView
      eyebrow="Financial Power Hub"
      title="Money Systems That Hold Under Pressure"
      description="Financial stress is rarely a math problem — it is a visibility and discipline problem. These journal guides cover cashflow command, buffer protection, and offense without gambling your runway."
      domainHref="/domains/financial-power"
      domainLabel="Financial Power Domain"
      links={financialHubLinks}
      journalLabel="Browse all financial journal posts"
    />
  );
}
