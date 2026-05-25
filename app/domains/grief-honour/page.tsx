import { buildDomainMetadata, domainContentMap } from "../content";
import DomainPageView from "../components/DomainPageView";
import { domainNarratives } from "../narratives";

const slug = "grief-honour" as const;
const content = domainContentMap[slug];

export const metadata = buildDomainMetadata(content);

export default function GriefHonourPage() {
  return <DomainPageView narrative={domainNarratives[slug]} slug={slug} />;
}
