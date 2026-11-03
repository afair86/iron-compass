import ApprovedHome from "./components/ApprovedHome";
import { absoluteUrl, buildPageMetadata } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Iron Compass AI: Habit and Discipline App for Men",
  description:
    "Iron Compass AI is a habit and discipline app for men: a few daily habits, a journal and one next action, across ten life domains. Start free.",
  path: "/",
});

const appSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Iron Compass AI",
  applicationCategory: "LifestyleApplication",
  operatingSystem: "Web",
  url: absoluteUrl("/app"),
  description:
    "Daily habits, a journal and practical planning tools for men, organised across ten life domains. AI coaching on Core and Elite.",
  offers: [
    { "@type": "Offer", name: "Free", price: "0", priceCurrency: "AUD" },
    { "@type": "Offer", name: "Core monthly", price: "19.99", priceCurrency: "AUD" },
    { "@type": "Offer", name: "Core yearly", price: "199", priceCurrency: "AUD" },
    { "@type": "Offer", name: "Elite monthly", price: "34.99", priceCurrency: "AUD" },
    { "@type": "Offer", name: "Elite yearly", price: "349", priceCurrency: "AUD" },
  ],
};

export default function HomePage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
      <ApprovedHome />
    </main>
  );
}
