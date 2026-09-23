import ApprovedHome from "./components/ApprovedHome";
import { buildPageMetadata } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Iron Compass AI — Life System for Disciplined Men",
  description:
    "Iron Compass AI helps men build strength, discipline and character—in the ordinary moments that shape their lives.",
  path: "/",
});

export default function HomePage() {
  return (
    <main>
      <ApprovedHome />
    </main>
  );
}
