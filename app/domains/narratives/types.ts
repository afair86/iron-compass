import type { DomainSlug } from "../content";

export type DomainImage = {
  src: string;
  alt: string;
};

export type DomainNarrativeSection = {
  key: string;
  heading: string;
  paragraphs: string[];
  image?: DomainImage;
};

export type DomainPractice = {
  heading: string;
  lead: string;
  steps: string[];
};

export type DomainNarrative = {
  slug: DomainSlug;
  h1Title: string;
  heroDescription: string;
  opening: string[];
  sections: DomainNarrativeSection[];
  practice: DomainPractice;
  further: string[];
};
