import { absoluteUrl } from "@/lib/site";

/** Structured data for the app. Prices must match the live plans; iPhone is not listed until it is on the App Store. */
export const appSoftwareSchema = {
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
