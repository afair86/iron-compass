import Link from "next/link";

export default function Hero() {
  return (
    <section className="ic-hero-shell" aria-labelledby="hero-title">
      <div className="ic-hero-card ic-grain space-y-7 md:space-y-8">
        <div className="ic-stack-sm items-center text-center">
          <h1 id="hero-title" className="ic-page-title ic-home-heading text-center mx-auto">
            Rise Beyond Limits
          </h1>
          <p className="text-base md:text-lg text-[var(--ic-text-main)] ic-measure mx-auto leading-relaxed text-center">
            Unlock disciplined momentum with the same systems we use inside the Iron Compass app—modern AI leverage wrapped around timeless masculine standards.
          </p>
          <p className="text-sm text-[var(--ic-text-muted)] ic-measure-tight mx-auto text-center">
            A man&rsquo;s life is forged in discipline, tested in adversity, and defined by the strength of his purpose.
          </p>
        </div>

        <div className="ic-divider" />

        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
          <Link href="/domains" className="ic-btn-primary text-xs sm:text-[0.72rem]">
            Start Your Rise
          </Link>
          <Link href="/domains" className="ic-btn-ghost text-xs sm:text-[0.7rem]">
            Explore The Domains
          </Link>
        </div>
      </div>
    </section>
  );
}
