import TopicHubView from "./components/TopicHubView";
import { griefArticles } from "@/lib/articleHubs";
import { buildPageMetadata } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Grief and Rebuilding Guides for Men | Iron Compass AI",
  description:
    "Practical guides for men carrying grief, rebuilding after divorce or finding direction after loss. Stoic principles, daily actions and a weekly review.",
  path: "/articles",
});

export default function ArticlesHubPage() {
  return (
    <>
      <TopicHubView
        eyebrow="Iron Compass AI Guides"
        title="Grief and rebuilding guides for men"
        description="Practical ways to carry loss, honour what mattered and rebuild after life changes. Read at your own pace, keep the responsibilities you can carry and choose a useful next step."
        domainHref="/domains/grief-honour"
        domainLabel="Grief & Honour Domain"
        articles={griefArticles}
      />
    </>
  );
}
