import Link from "next/link";

export default function MidCTA() {
  return (
    <section className="py-24 px-4">
      <div className="relative max-w-5xl mx-auto rounded-[32px] border border-iron-frame bg-iron-steel/80 p-10 md:p-16 glow-neon-blue overflow-hidden">
        <div className="absolute inset-y-6 inset-x-8 border border-iron-frame rounded-3xl opacity-60 pointer-events-none" />
        <div className="relative text-center space-y-6">
          <p className="text-xs tracking-mega text-iron-mist">IRON BROTHERHOOD</p>
          <h2 className="ic-metallic-h2">Forge Your Iron Core With Brothers 1188</h2>
          <p className="text-iron-mist text-lg max-w-3xl mx-auto">
            Iron Compass is where disciplined men harden their mind, body, and mission through relentless accountability, elite strategy, and AI-driven leverage.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link href="/start" className="ic-neon-cta text-xs">
              Enter The Brotherhood
            </Link>
            <Link
              href="/domains"
              className="px-10 py-4 rounded-full border border-iron-frame text-iron-bone font-semibold uppercase tracking-[0.3em] hover:bg-iron-frame/10"
            >
              Review The Playbook
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
