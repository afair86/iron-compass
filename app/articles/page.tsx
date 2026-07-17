import Script from "next/script";
import TopicHubView from "./components/TopicHubView";
import { griefArticles } from "@/lib/articleHubs";
import { absoluteUrl, buildPageMetadata } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Grief Guides for Men | Iron Compass AI",
  description:
    "Long-form guides on grief, loss, and rebuilding for men who need structure — not sympathy. Stoic frameworks, identity rebuilds, and practical steps.",
  path: "/articles",
});

export default function ArticlesHubPage() {
  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: griefArticles.map((article, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(article.path),
      name: article.title,
      description: article.description,
    })),
  };

  return (
    <>
      <Script
        id="ld-grief-articles-itemlist"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <TopicHubView
        eyebrow="Iron Compass Guides"
        title="Grief Guides for Men"
        description="Loss hits men differently — and most advice ignores that. These guides give you structure for carrying pain, rebuilding identity, and moving forward without collapsing or going numb."
        domainHref="/domains/grief-honour"
        domainLabel="Grief & Honour Domain"
        articles={griefArticles}
      />
    </>
  );
}
