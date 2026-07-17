const categoryAccentMap: Record<string, string> = {
  "Financial Power": "ic-accent--gold",
  "AI Mastery": "ic-accent--cyan",
  Leadership: "ic-accent--red",
  Discipline: "ic-accent--ember",
  "Grief & Honour": "ic-accent--violet",
  "Strength & Health": "ic-accent--teal",
  Purpose: "ic-accent--blue",
  "Identity & Legacy": "ic-accent--blue",
  Dispatch: "ic-accent--blue",
};

export function getCategoryAccent(category?: string): string {
  if (!category) return "ic-accent--blue";
  return categoryAccentMap[category] ?? "ic-accent--blue";
}
