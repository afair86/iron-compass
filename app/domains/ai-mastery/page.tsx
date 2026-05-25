import { buildDomainMetadata, domainContentMap } from "../content";
import DomainPageView from "../components/DomainPageView";
import { domainNarratives } from "../narratives";

const slug = "ai-mastery" as const;
const content = domainContentMap[slug];

export const metadata = buildDomainMetadata(content);

export default function AiMasteryPage() {
  return <DomainPageView narrative={domainNarratives[slug]} slug={slug} />;
}
