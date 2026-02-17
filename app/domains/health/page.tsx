import Link from "next/link";
import PageShell from "../../components/PageShell";
import { HeadingStack, PageContainer, SectionShell } from "../../components/LayoutPrimitives";

export const metadata = {
	title: "Strength & Health | Iron Compass AI",
	description: "Build capacity, energy, and long-term resilience so your body stays reliable under every load.",
};

export default function StrengthHealthPage() {
	return (
		<PageShell>
			<PageContainer>
				<SectionShell variant="hero" className="space-y-6 text-left">
					<p className="ic-eyebrow">Iron Compass Domain</p>
					<h1 className="ic-page-title text-left">Strength &amp; Health</h1>
					<p className="ic-section-copy ic-section-copy--muted max-w-3xl">
						Strength and health are not aesthetic trophies; they are functional requirements. This domain builds capacity, energy, and resilience so your body stays reliable when life gets heavy.
					</p>
					<div className="ic-cta-row">
						<Link href="/start" className="ic-btn-primary text-xs sm:text-[0.72rem]">
							Start Your Rise
						</Link>
						<Link href="/download" className="ic-btn-ghost text-xs sm:text-[0.7rem]">
							Download Iron Compass AI
						</Link>
					</div>
					<p className="ic-section-copy ic-section-copy--muted text-sm">Built to keep thousands of men capable under pressure.</p>
				</SectionShell>

				<SectionShell variant="panel" className="space-y-4 md:space-y-5 text-left">
					<h2 className="ic-heading-2 text-left">Why Strength &amp; Health Matter More Than Men Realise</h2>
					<p className="ic-section-copy">
						Strength without energy is useless. Many men train hard but live exhausted; that is not discipline, it is mismanagement. Recovery is part of training—sleep discipline, nervous system regulation, breathing, mobility, and deliberate downshifting. Without it, strength becomes brittle, motivation swings, injuries stack up, and clarity fades.
					</p>
					<p className="ic-section-copy">
						Iron Compass treats recovery as training, not weakness. A man who recovers well can train consistently, think clearly, regulate emotion, and endure pressure longer.
					</p>
				</SectionShell>

				<SectionShell variant="panel" className="space-y-4 md:space-y-5 text-left">
					<h2 className="ic-heading-2 text-left">The Modern Male Health Problem</h2>
					<p className="ic-section-copy">
						Most men live in bursts—hard pushes followed by crashes, caffeine in place of sleep, and sporadic training without recovery. Pain signals are ignored, stress leaks into the body, and eating becomes reactive. The result is brittle strength and fading capacity right when life demands more.
					</p>
					<p className="ic-section-copy">
						Iron Compass removes the theatrics. The aim is to stay capable every week, not just in highlight reels.
					</p>
				</SectionShell>

				<SectionShell variant="panel" className="space-y-5 md:space-y-6 text-left">
					<HeadingStack title="Four Pillars of Strength &amp; Health" center={false} className="space-y-2" />
					<div className="space-y-6 md:space-y-7">
						<div className="space-y-3">
							<h3 className="ic-heading-3 text-left">1. Capacity Under Load</h3>
							<p className="ic-section-copy">
								Physical capacity is the ability to lift, carry, move, brace, absorb force, and tolerate repeated stress. It covers strength, cardiovascular capacity, mobility, coordination, and structural integrity. Capacity is not about personal records; it is about reliability under repeated load. A man with capacity can work long days without collapse, train without constant injury, remain present with his family, and absorb stress without snapping. Capacity creates margin. Margin creates stability.
							</p>
						</div>

						<div className="space-y-3">
							<h3 className="ic-heading-3 text-left">2. Energy &amp; Recovery</h3>
							<p className="ic-section-copy">
								Strength that drains your energy is not strength. Recovery includes sleep discipline, nervous system regulation, breathing, mobility, and deliberate downshifting. Without recovery, strength becomes brittle, motivation fluctuates, injuries accumulate, and clarity fades.
							</p>
							<ul className="list-disc list-inside space-y-1 ic-section-copy">
								<li>Sleep discipline and nervous system regulation</li>
								<li>Breathing, mobility, and deliberate downshifting</li>
								<li>Consistency that prevents brittle strength and mood swings</li>
							</ul>
							<p className="ic-section-copy">
								Iron Compass treats recovery as non-negotiable so you can think clearly, regulate emotion, and stay in the fight longer.
							</p>
						</div>

						<div className="space-y-3">
							<h3 className="ic-heading-3 text-left">3. Fuel &amp; Body Composition</h3>
							<p className="ic-section-copy">
								Food is not morality; it is information and fuel. The aim is to eat enough to recover, maintain stable energy, avoid emotional extremes, and respect long-term health markers. Iron Compass rejects rigid dieting, constant restriction, binge-restrict cycles, and identity-based eating. The goal is body composition that supports function, not image. A body that is under-fuelled or unstable cannot carry responsibility well.
							</p>
						</div>

						<div className="space-y-3">
							<h3 className="ic-heading-3 text-left">4. Longevity &amp; Injury Management</h3>
							<p className="ic-section-copy">
								Strength that shortens your life is not strength. Longevity is joint health, connective tissue care, intelligent load management, early injury response, and age-appropriate progression. Many men confuse pain tolerance with toughness, but real toughness is staying functional for decades. Long-term men train differently: they prioritise continuity over intensity.
							</p>
						</div>
					</div>
				</SectionShell>

				<SectionShell variant="panel" className="space-y-4 md:space-y-5 text-left">
					<h2 className="ic-heading-2 text-left">How Men Quietly Undermine Their Own Health</h2>
					<p className="ic-section-copy">
						Most decline is not sudden; it builds through habits like ignoring pain signals, pushing through fatigue as proof of worth, chasing novelty instead of consistency, training hard while recovering poorly, and letting stress leak into the body unchecked. Those behaviours feel productive in the moment, but they quietly destroy long-term capacity. Strength is not about proving anything; it is about remaining capable.
					</p>
				</SectionShell>

				<SectionShell variant="panel" className="space-y-4 md:space-y-5 text-left">
					<h2 className="ic-heading-2 text-left">Strength as Identity Support</h2>
					<p className="ic-section-copy">
						Physical standards shape posture, presence, confidence, stress tolerance, and self-respect. When the body is neglected, the mind compensates with noise, discipline turns fragile, and emotional regulation weakens. When the body is trained and stable, clarity improves, discipline strengthens, and confidence is grounded. Strength &amp; Health directly supports Discipline, Identity, Purpose, Bonds, and recovery after failure. The body is the foundation everything else stands on.
					</p>
				</SectionShell>

				<SectionShell variant="panel" className="space-y-4 md:space-y-5 text-left">
					<h2 className="ic-heading-2 text-left">Practical Standards (Without Obsession)</h2>
					<p className="ic-section-copy">
						Iron Compass does not promote extremes. Men operating in this system aim for consistent weekly training, daily movement, non-negotiable sleep standards, food that supports recovery, and an early response to pain or injury. No theatrics. No punishment. No performative toughness. The execution details are handled by the system—not guesswork.
					</p>
				</SectionShell>

				<SectionShell variant="panel" className="space-y-4 md:space-y-5 text-left">
					<h2 className="ic-heading-2 text-left">Strength Across Life Phases</h2>
					<p className="ic-section-copy">
						Strength adapts as life changes. It looks different when you are rebuilding after failure, managing chronic stress, raising children, working long hours, recovering from injury, or ageing. Iron Compass does not collapse under phase changes; it adjusts while maintaining standards. That prevents the cycle of starting over, quitting, rebuilding, and breaking again.
					</p>
				</SectionShell>

				<SectionShell variant="panel" className="space-y-4 md:space-y-5 text-left">
					<h2 className="ic-heading-2 text-left">How Strength &amp; Health Connect to the Iron Compass System</h2>
					<div className="space-y-3">
						<p className="ic-section-copy">Strength &amp; Health supports:</p>
						<ul className="list-disc list-inside space-y-1 ic-section-copy">
							<li>Discipline: consistency under fatigue</li>
							<li>Identity: physical standards shape self-image</li>
							<li>Purpose: energy enables forward motion</li>
							<li>Bonds: presence requires capacity</li>
							<li>Fall &amp; Rise: recovery starts in the body</li>
						</ul>
						<p className="ic-section-copy">A compromised body makes every domain harder.</p>
					</div>
				</SectionShell>

				<SectionShell variant="panel" className="space-y-4 md:space-y-5 text-left">
					<h2 className="ic-heading-2 text-left">How Iron Compass AI Extends This Domain</h2>
					<div className="space-y-3">
						<p className="ic-section-copy">This page sets the framework. The Iron Compass Toolkit and App handle execution.</p>
						<p className="ic-section-copy">They provide:</p>
						<ul className="list-disc list-inside space-y-1 ic-section-copy">
							<li>Structure without rigidity</li>
							<li>Consistency without burnout</li>
							<li>Recovery awareness</li>
							<li>Energy tracking</li>
							<li>Injury-conscious guidance</li>
							<li>Long-term progression</li>
						</ul>
						<p className="ic-section-copy">This is where principles become behaviour.</p>
					</div>
				</SectionShell>

				<SectionShell variant="panel" className="space-y-4 md:space-y-5 text-center">
					<h2 className="ic-heading-2 mx-auto text-center">Start Your Rise</h2>
					<p className="ic-section-copy ic-section-copy--muted text-center max-w-2xl mx-auto">
						Start Your Rise → /start
						<br />
						Download Iron Compass AI → /download
					</p>
					<div className="ic-cta-row justify-center">
						<Link href="/start" className="ic-btn-primary text-xs sm:text-[0.72rem]">
							Start Your Rise
						</Link>
						<Link href="/download" className="ic-btn-ghost text-xs sm:text-[0.7rem]">
							Download Iron Compass AI
						</Link>
					</div>
				</SectionShell>
			</PageContainer>
		</PageShell>
	);
}

