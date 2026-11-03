import ApprovedHome from "./components/ApprovedHome";
import { appSoftwareSchema } from "@/lib/appSchema";
import { buildPageMetadata } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Iron Compass AI: Habit and Discipline App for Men",
  description:
    "Iron Compass AI is a habit and discipline app for men: a few daily habits, a journal and one next action, across ten life domains. Start free.",
  path: "/",
});

const appSchema = { "@context": "https://schema.org", ...appSoftwareSchema };

export default function HomePage() {
  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
      <ApprovedHome />
    </main>
  );
}
