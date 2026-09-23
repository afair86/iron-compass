"use client";

import WeeklyMoneyWorksheet from "@/app/components/blog-tools/WeeklyMoneyWorksheet";
import CommitmentPlanner from "@/app/components/blog-tools/CommitmentPlanner";
import PromptBuilder from "@/app/components/blog-tools/PromptBuilder";
import QuietCheckIn from "@/app/components/blog-tools/QuietCheckIn";
import InfluenceCheck from "@/app/components/blog-tools/InfluenceCheck";
import type { PracticalToolId } from "@/lib/practicalToolIds";

const TOOLS: Record<PracticalToolId, React.ComponentType> = {
  "weekly-money-check": WeeklyMoneyWorksheet,
  "commitment-planner": CommitmentPlanner,
  "prompt-builder": PromptBuilder,
  "quiet-check-in": QuietCheckIn,
  "influence-check": InfluenceCheck,
};

export default function BlogPracticalTool({ id }: { id: PracticalToolId }) {
  const Tool = TOOLS[id];
  return <Tool />;
}
