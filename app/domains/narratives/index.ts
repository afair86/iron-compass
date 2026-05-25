import type { DomainSlug } from "../content";
import { healthNarrative } from "./health";
import { disciplineMindsetNarrative } from "./discipline-mindset";
import { purposeDirectionNarrative } from "./purpose-direction";
import { leadershipCharacterNarrative } from "./leadership-character";
import { financialPowerNarrative } from "./financial-power";
import { aiMasteryNarrative } from "./ai-mastery";
import { griefHonourNarrative } from "./grief-honour";
import { identityLegacyNarrative } from "./identity-legacy";
import type { DomainNarrative } from "./types";

export const domainNarratives: Record<DomainSlug, DomainNarrative> = {
  health: healthNarrative,
  "discipline-mindset": disciplineMindsetNarrative,
  "purpose-direction": purposeDirectionNarrative,
  "leadership-character": leadershipCharacterNarrative,
  "financial-power": financialPowerNarrative,
  "ai-mastery": aiMasteryNarrative,
  "grief-honour": griefHonourNarrative,
  "identity-legacy": identityLegacyNarrative,
};
