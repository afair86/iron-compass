import TopicHubView from "../components/TopicHubView";
import { aiMasteryHubLinks } from "@/lib/articleHubs";
import { buildPageMetadata } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Using AI as a Tool | Iron Compass AI",
  description:
    "Practical notes on using AI for planning and preparation. AI is a tool. It is not one of the ten life domains.",
  path: "/articles/ai-mastery",
});

export default function AiMasteryHubPage() {
  return (
    <TopicHubView
      eyebrow="A tool, not a domain"
      title="Use the tool. Keep the decision."
      description="These notes show how to use AI for drafting, sorting, and preparation. They are not a life domain. Responsibility still sits in the ten domains."
      domainHref="/domains/ai-mastery"
      domainLabel="AI as a tool"
      links={aiMasteryHubLinks}
      journalLabel="Browse all AI journal posts"
    />
  );
}
