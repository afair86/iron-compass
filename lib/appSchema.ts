import { absoluteUrl } from "@/lib/site";

/** Structured data for the app. Prices must match the live plans; iPhone is not listed until it is on the App Store. */
export const appSoftwareSchema = {
  "@type": "SoftwareApplication",
  "@id": absoluteUrl("/#software"),
  name: "Iron Compass AI",
  applicationCategory: "LifestyleApplication",
  operatingSystem: "Web",
  url: absoluteUrl("/app"),
  publisher: { "@id": absoluteUrl("/#organization") },
  description:
    "A practical discipline and planning app for men, grounded in Stoicism. Daily habits, private reflection and planning across ten life domains, with AI coaching on Core and Elite.",
  offers: [
    { "@type": "Offer", name: "Free", price: "0", priceCurrency: "AUD" },
    { "@type": "Offer", name: "Core monthly", price: "19.99", priceCurrency: "AUD" },
    { "@type": "Offer", name: "Core yearly", price: "199", priceCurrency: "AUD" },
    { "@type": "Offer", name: "Elite monthly", price: "34.99", priceCurrency: "AUD" },
    { "@type": "Offer", name: "Elite yearly", price: "349", priceCurrency: "AUD" },
  ],
};
