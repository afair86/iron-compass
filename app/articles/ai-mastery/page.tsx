import TopicHubView from "../components/TopicHubView";
import { aiMasteryHubLinks } from "@/lib/articleHubs";
import { buildPageMetadata } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "AI Mastery Guides for Men | Iron Compass AI",
  description:
    "Practical AI workflows for busy men: daily loops, discipline support, and automations that keep you in command — not dependent on the tool.",
  path: "/articles/ai-mastery",
});

export default function AiMasteryHubPage() {
  return (
    <TopicHubView
      eyebrow="AI Mastery Hub"
      title="AI Leverage Without Losing Your Edge"
      description="AI should reduce friction, not replace judgment. These guides show how to build daily loops, automations, and learning systems that compound — while keeping standards human-controlled."
      domainHref="/domains/ai-mastery"
      domainLabel="AI Mastery Domain"
      links={aiMasteryHubLinks}
      journalLabel="Browse all AI journal posts"
    />
  );
}
