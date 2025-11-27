// /mockups/DashboardMock.tsx
export default function DashboardMock() {
  return (
    <div className="bg-icBg min-h-screen flex flex-col">
      {/* Top nav */}
      <header className="bg-icSurface px-6 py-4 flex items-center justify-between shadow">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-icCard flex items-center justify-center heading-font text-icRed text-xl">IC</div>
          <span className="heading-font text-lg text-icText tracking-widest">IRON COMPASS</span>
        </div>
        <nav className="flex gap-6">
          <a href="#" className="heading-font text-xs text-icMuted hover:text-icRed transition">Dashboard</a>
          <a href="#" className="heading-font text-xs text-icMuted hover:text-icRed transition">Habits</a>
          <a href="#" className="heading-font text-xs text-icMuted hover:text-icRed transition">Domains</a>
        </nav>
      </header>
      {/* Main content */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 py-10 grid gap-8 md:grid-cols-3">
        {/* Example panels */}
        <section className="ic-card rounded-xl p-6 flex flex-col">
          <h2 className="heading-font text-base text-icRed mb-2">TODAY’S ORDERS</h2>
          <ul className="text-icText text-sm space-y-2">
            <li>✔️ 5am Wakeup</li>
            <li>✔️ Cold Shower</li>
            <li>❗ 1hr Deep Work</li>
            <li>❗ Strength Training</li>
          </ul>
        </section>
        <section className="ic-card rounded-xl p-6 flex flex-col">
          <h2 className="heading-font text-base text-icRed mb-2">HABITS</h2>
          <ul className="text-icText text-sm space-y-2">
            <li>Discipline: 7/7</li>
            <li>Sleep: 6/7</li>
            <li>Reading: 5/7</li>
          </ul>
        </section>
        <section className="ic-card rounded-xl p-6 flex flex-col">
          <h2 className="heading-font text-base text-icRed mb-2">SIX DOMAINS</h2>
          <ul className="text-icText text-sm space-y-2">
            <li>Strength</li>
            <li>Discipline & Mindset</li>
            <li>Purpose & Direction</li>
            <li>Leadership & Character</li>
            <li>Financial Power</li>
            <li>AI Mastery & Life Optimization</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
