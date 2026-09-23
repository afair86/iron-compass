export const PRACTICAL_TOOL_IDS = [
  "weekly-money-check",
  "commitment-planner",
  "prompt-builder",
  "quiet-check-in",
  "influence-check",
] as const;

export type PracticalToolId = (typeof PRACTICAL_TOOL_IDS)[number];

export function isPracticalToolId(value: unknown): value is PracticalToolId {
  return typeof value === "string" && (PRACTICAL_TOOL_IDS as readonly string[]).includes(value);
}
