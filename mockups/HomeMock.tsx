// /mockups/HomeMock.tsx
// TODO: Legacy homepage – candidate for deletion.
export default function HomeMock() {
  return (
    <section className="bg-icBg min-h-screen flex items-center justify-center">
      <div className="max-w-5xl w-full mx-auto px-4 pt-16 pb-16 lg:pt-24 lg:pb-24">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] items-start">
          {/* LEFT: Hero */}
          <div>
            <p className="heading-font text-xs text-icRed mb-3 tracking-[0.3em]">A SYSTEM FOR MEN</p>
            <h1 className="heading-font text-4xl sm:text-5xl lg:text-6xl text-icText mb-4">
              RISE BEYOND LIMITS
            </h1>
            <p className="text-base sm:text-lg text-icMuted mb-6">
              Iron Compass is a complete life system for men—designed to help you master strength, discipline, purpose, leadership, financial power, AI mastery, grief & honour, and identity & legacy. Forge your path, lead with integrity, and rise above the ordinary.
            </p>
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <a
                href="#"
                className="heading-font inline-flex items-center rounded-full bg-icRed px-6 py-2 text-sm font-semibold text-white shadow-lg shadow-icRedDark/40 hover:bg-icRedHover transition"
              >
                Explore the Eight Domains
              </a>
              <a
                href="#"
                className="text-sm text-icMuted hover:text-icText underline-offset-4 hover:underline"
              >
                Read the Journal
              </a>
            </div>
          </div>
          {/* RIGHT: Eight Domains Card */}
          <aside className="ic-card rounded-2xl p-6 sm:p-7 lg:p-8 bg-icCard border border-slate-700/70 shadow-lg">
            <h2 className="heading-font text-sm text-icRed mb-2">THE EIGHT DOMAINS</h2>
            <p className="text-sm text-icMuted mb-5">
              A complete, disciplined life requires mastery across eight domains. Iron Compass guides men to develop strength, discipline, purpose, leadership, financial power, AI mastery, grief & honour, and identity & legacy—so you can rise beyond limits and lead with purpose and integrity.
            </p>
            <div className="space-y-4 text-sm">
              {[
                { title: 'STRENGTH', desc: 'Physical & mental resilience.' },
                { title: 'DISCIPLINE & MINDSET', desc: 'Relentless self-mastery.' },
                { title: 'PURPOSE & DIRECTION', desc: 'Mission, vision, calling.' },
                { title: 'LEADERSHIP & CHARACTER', desc: 'Guiding self and others.' },
                { title: 'FINANCIAL POWER', desc: 'Autonomy & abundance.' },
                { title: 'AI MASTERY & OPTIMIZATION', desc: 'Technology leverage.' },
                { title: 'GRIEF & HONOUR', desc: 'Transforming loss into legacy.' },
                { title: 'IDENTITY & LEGACY', desc: 'Becoming the man you are meant to be.' },
              ].map((d) => (
                <div
                  key={d.title}
                  className="group block rounded-lg border border-slate-700/70 bg-slate-900/60 px-4 py-3 hover:border-icRedHover hover:bg-slate-900/90 transition"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="heading-font text-[11px] text-icText">{d.title}</span>
                    <span className="text-[10px] text-icRed opacity-0 group-hover:opacity-100 transition">Learn more →</span>
                  </div>
                  <p className="text-xs text-icMuted">{d.desc}</p>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
