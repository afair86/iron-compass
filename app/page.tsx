import Link from "next/link";
import Hero from "./components/Hero";
import DomainsSection from "./components/DomainsSection";
import Subscribe from "./components/Subscribe";
import Footer from "./components/Footer";

export default function HomePage() {
  return (
    <main className="ic-page-shell text-[var(--ic-text-main)]">
      <Hero />
      <DomainsSection />

      <section className="px-4 pb-20">
        <div className="ic-philosophy-card max-w-4xl mx-auto text-center space-y-6">
          <h2 className="ic-home-heading text-[clamp(2rem,4vw,3rem)] tracking-[0.16em]">The Iron Compass Philosophy</h2>
          <p className="ic-section-copy text-center mx-auto">
            At Iron Compass, we believe every man is called to rise above mediocrity. Our system is built on timeless principles—discipline,
            strength, purpose, and integrity—combined with modern tools for a rapidly changing world.
          </p>
          <p className="ic-section-copy text-center mx-auto">
            We guide you to lead yourself and others, to build unshakeable character, and to achieve financial and personal freedom. With AI
            mastery and optimization, you&rsquo;ll unlock new levels of performance and fulfillment.
          </p>
          <p className="ic-section-copy text-center mx-auto">This is more than self-improvement. It&rsquo;s a brotherhood, a mission, and a way of life.</p>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="ic-mission-card max-w-5xl mx-auto text-center space-y-5">
          <h2 className="ic-home-heading text-[clamp(1.8rem,3.6vw,2.6rem)]">Ready To Begin Your Rise?</h2>
          <p className="text-lg max-w-2xl mx-auto">
            Commit to disciplined execution. Build steel resolve. Lead with purpose.
          </p>
          <div className="ic-neon-divider" />
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center pt-2">
            <Link href="/domains" className="ic-cta-glow text-[0.6rem]">
              Start Your Rise
            </Link>
            <Link href="/domains" className="ic-ghost-btn text-[0.6rem]">
              Explore The Domains
            </Link>
          </div>
          <p className="text-sm text-[var(--ic-text-muted)] tracking-[0.1em]">
            Trusted by 18,000+ men rebuilding disciplined lives since 2025.
          </p>
        </div>
      </section>

      <Subscribe />
      <Footer />
    </main>
  );
}
