import Link from "next/link";
import PageShell from "@/app/components/PageShell";
import { buildPageMetadata } from "@/lib/site";
import { packSections } from "@/lib/freePack";
import { packDeliveryConfigured } from "@/lib/packRequest";
import PackFunnel from "./PackFunnel";
import "./free-pack.css";

export const dynamic = "force-dynamic";
export const metadata = buildPageMetadata({ title: "A Seven-Day Follow-Through Pack | Iron Compass AI", description: "Choose one responsibility, plan for difficult days and review the week. A free printable pack from Iron Compass AI, with no account required.", path: "/free-pack" });

export default function FreePackPage() {
  return <PageShell className="ic-public-page"><div className="ic-content-stack max-w-3xl pack-page">
    <section className="ic-panel ic-editorial-center space-y-5">
      <h1 className="ic-page-title">One responsibility. Seven days of practice.</h1>
      <p className="ic-section-copy">Bring one commitment into the week you actually have. This free pack gives you a clear next action, a smaller version for difficult days and a short weekly review.</p>
      <p>No perfect streak required. No account needed.</p>
      <Link href="#the-pack" className="ic-btn-primary">Use the pack now</Link>
    </section>
    <PackFunnel emailEnabled={packDeliveryConfigured()} providerName={process.env.PACK_CAMPAIGN_PROVIDER_NAME || ""} />
    <section id="the-pack" aria-labelledby="pack-worksheet-heading" className="ic-panel-outline space-y-6">
      <h2 id="pack-worksheet-heading" className="ic-section-heading">Your seven-day worksheet</h2>
      {packSections.map(section => <article key={section.title} className="space-y-3"><h3>{section.title}</h3><p>{section.copy}</p><p className="pack-prompt">{section.prompt}</p></article>)}
      <p>Use paper or the downloadable worksheet to keep your answers. These prompts are general practice, not a promise of a particular result.</p>
    </section>
  </div></PageShell>;
}
