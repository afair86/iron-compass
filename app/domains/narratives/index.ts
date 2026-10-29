import type { DomainSlug } from "../content";
import { healthNarrative } from "./health";
import { disciplineMindsetNarrative } from "./discipline-mindset";
import { purposeDirectionNarrative } from "./purpose-direction";
import { leadershipCharacterNarrative } from "./leadership-character";
import { financialPowerNarrative } from "./financial-power";
import { aiMasteryNarrative } from "./ai-mastery";
import { griefHonourNarrative } from "./grief-honour";
import { identityNarrative } from "./identity-legacy";
import { resilienceNarrative } from "./resilience";
import { fallRiseNarrative } from "./fall-rise";
import { legacyNarrative } from "./legacy";
import type { DomainNarrative } from "./types";

export const domainNarratives: Record<DomainSlug, DomainNarrative> = {
  discipline: disciplineMindsetNarrative,
  identity: identityNarrative,
  "health-strength": healthNarrative,
  "bonds-connections": leadershipCharacterNarrative,
  "purpose-direction": purposeDirectionNarrative,
  "finance-provision": financialPowerNarrative,
  resilience: resilienceNarrative,
  "fall-rise": fallRiseNarrative,
  "grief-honour": griefHonourNarrative,
  legacy: legacyNarrative,
  "ai-mastery": aiMasteryNarrative,
};
