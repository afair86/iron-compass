import type { DomainSlug } from "../content";

export type DomainPillar = {
  title: string;
  body: string;
  bullets?: string[];
  outro?: string;
};

export type DomainNarrativeSection = {
  key: string;
  heading: string;
  paragraphs?: string[];
  pillars?: DomainPillar[];
  intro?: string;
  bullets?: string[];
  outro?: string;
};

export type DomainNarrative = {
  slug: DomainSlug;
  h1Title: string;
  heroDescription: string;
  socialProof: string;
  sections: DomainNarrativeSection[];
};

export const CLOSING_CTA_COPY =
  "Start the program or download the app. Pick one entry point and commit this week.";
