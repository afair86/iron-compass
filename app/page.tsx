import ApprovedHome from "./components/ApprovedHome";
import { appSoftwareSchema } from "@/lib/appSchema";
import { buildPageMetadata } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Habit Tracker & Discipline App for Men | Iron Compass AI",
  description:
    "Build a practical Stoic routine with Iron Compass AI: habit tracking, a private journal and clear next actions across ten life domains. Start free on the web.",
  path: "/",
});

const appSchema = { "@context": "https://schema.org", ...appSoftwareSchema };

export default function HomePage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
      <ApprovedHome />
    </main>
  );
}
