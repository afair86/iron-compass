import ApprovedHome from "./components/ApprovedHome";
import { appSoftwareSchema } from "@/lib/appSchema";
import { buildPageMetadata } from "@/lib/site";

export const metadata = {
  ...buildPageMetadata({
  title: "Iron Compass AI | Discipline, Direction and Follow-Through",
  description:
    "Bring order to your days with Iron Compass AI. Practical Stoicism, daily discipline and private reflection to help you follow through on what matters.",
  path: "/",
  }),
  // Public ownership proof for the existing free Ahrefs workspace; no tracking script.
  other: {
    "ahrefs-site-verification": "2440bda7ebeb1f4194f5c4b3e590acaaf335d503bd66df9fabf65948dda51df0",
  },
};

const appSchema = { "@context": "https://schema.org", ...appSoftwareSchema };

export default function HomePage() {
  return (
    <main id="main-content" tabIndex={-1}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
      <ApprovedHome />
    </main>
  );
}
