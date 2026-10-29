import TopicHubView from "../components/TopicHubView";
import { financialHubLinks } from "@/lib/articleHubs";
import { buildPageMetadata } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Finance & Provision Guides for Men | Iron Compass AI",
  description:
    "Cash flow, buffers, and the plain work of providing. These journal guides sit with the Finance and Provision domain.",
  path: "/articles/financial-power",
});

export default function FinancialPowerHubPage() {
  return (
    <TopicHubView
      eyebrow="Finance & Provision"
      title="Money you can look at"
      description="These journal guides cover cash flow, buffers, and decisions you can make with the numbers in front of you. The life domain is Finance and Provision."
      domainHref="/domains/finance-provision"
      domainLabel="Finance & Provision"
      links={financialHubLinks}
      journalLabel="Browse all financial journal posts"
    />
  );
}
