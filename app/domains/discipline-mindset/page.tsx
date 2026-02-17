import Link from "next/link";
import PageShell from "../../components/PageShell";
import { PageContainer, SectionShell, HeadingStack } from "../../components/LayoutPrimitives";
import { buildDomainMetadata, domainContentMap } from "../content";

const content = domainContentMap["discipline-mindset"];

export const metadata = buildDomainMetadata(content);

export default function DisciplineMindsetPage() {
	return (
		<PageShell>
			<PageContainer>
				<SectionShell variant="hero" className="space-y-6 text-left">
					<p className="ic-eyebrow">Iron Compass Domain</p>
					<h1 className="ic-page-title text-left">Discipline &amp; Mindset</h1>
					<p className="ic-section-copy ic-section-copy--muted max-w-3xl">
						Discipline is reliable action on schedule. Mindset is the story that keeps you from drifting when life tilts. Together they form the operating system that makes sure every other domain stays alive even when you are tired, tempted, or under fire.
					</p>
					<div className="ic-cta-row">
						<Link href="/start" className="ic-btn-primary text-xs sm:text-[0.72rem]">
							Start Your Rise
						</Link>
						<Link href="/download" className="ic-btn-ghost text-xs sm:text-[0.7rem]">
							Download Iron Compass AI
						</Link>
					</div>
					<p className="ic-section-copy ic-section-copy--muted text-sm">Used by men who refuse to stay stuck.</p>
				</SectionShell>

				<SectionShell variant="panel" className="space-y-4 md:space-y-5 text-left">
					<h2 className="ic-heading-2 text-left">Why Discipline &amp; Mindset Matter More Than Men Realise</h2>
					<p className="ic-section-copy">
						Hard pushes are easy. Showing up every day is rare. Discipline makes execution predictable; mindset keeps the narrative from turning into self-sabotage when pressure hits. Without both, motivation dictates output, small setbacks spiral, and promises die quietly.
					</p>
					<p className="ic-section-copy">
						Iron Compass treats discipline as infrastructure—anchors, cadences, reviews—not as hype. Mindset is engineered language and perspective that keeps you calm and aggressive at the same time.
					</p>
				</SectionShell>

				<SectionShell variant="panel" className="space-y-4 md:space-y-5 text-left">
					<h2 className="ic-heading-2 text-left">The Modern Male Discipline Problem</h2>
					<p className="ic-section-copy">
						Most men run on spikes of motivation, social media challenges, and all-or-nothing sprints. Dopamine loops steal focus. Sleep and planning are optional. When stress rises, they negotiate with standards instead of protecting them. The result: missed reps, unstable confidence, and a life built on excuses.
					</p>
					<p className="ic-section-copy">
						Iron Compass builds a floor you cannot fall below, not a ceiling you occasionally touch.
					</p>
				</SectionShell>

				<SectionShell variant="panel" className="space-y-5 md:space-y-6 text-left">
					<HeadingStack title="Four Pillars of Discipline &amp; Mindset" center={false} className="space-y-2" />
					<div className="space-y-6 md:space-y-7">
						<div className="space-y-3">
							<h3 className="ic-heading-3 text-left">1. Anchor Stack</h3>
							<p className="ic-section-copy">
								Hydrate, move, plan, and review—whether or not you feel like it. Anchors are small, non-negotiable actions that fire every day to keep drift impossible. They are chosen for reliability, not excitement, so you can execute under fatigue and chaos.
							</p>
						</div>

						<div className="space-y-3">
							<h3 className="ic-heading-3 text-left">2. Three-Level Day</h3>
							<p className="ic-section-copy">
								Every day runs at survive, standard, or surge. Survive protects the floor, standard keeps the plan, surge pushes for advantage. You never skip the minimums, and you never confuse a bad day with no day.
							</p>
						</div>

						<div className="space-y-3">
							<h3 className="ic-heading-3 text-left">3. Narrative Control</h3>
							<p className="ic-section-copy">
								Stories either fuel action or drain it. Discipline fails when the story becomes panic, self-pity, or entitlement. Iron Compass replaces that with mission language, honest metrics, and rehearsed responses when temptation shows up.
							</p>
						</div>

						<div className="space-y-3">
							<h3 className="ic-heading-3 text-left">4. Proof Over Promises</h3>
							<p className="ic-section-copy">
								Talk does nothing. Proof is logged reps, completed minimums, and visible progress. You measure what you do, not what you intend. The logbook kills self-delusion and builds self-respect.
							</p>
						</div>
					</div>
				</SectionShell>

				<SectionShell variant="panel" className="space-y-4 md:space-y-5 text-left">
					<h2 className="ic-heading-2 text-left">How Men Quietly Undermine Their Own Discipline</h2>
					<p className="ic-section-copy">
						Waiting for motivation, living in 30-day challenges, letting cheap dopamine drain focus, and hiding from accountability. These habits feel harmless but erode standards until nothing fires when life tilts.
					</p>
				</SectionShell>

				<SectionShell variant="panel" className="space-y-4 md:space-y-5 text-left">
					<h2 className="ic-heading-2 text-left">Discipline as Identity Support</h2>
					<p className="ic-section-copy">
						Your name is proven by what you do when you do not feel like it. Discipline stabilises posture, confidence, and trust from others. It keeps Purpose moving, Strength protected, Leadership credible, and Financial Power consistent. Without it, every other domain stays theoretical.
					</p>
				</SectionShell>

				<SectionShell variant="panel" className="space-y-4 md:space-y-5 text-left">
					<h2 className="ic-heading-2 text-left">Practical Standards (Without Obsession)</h2>
					<p className="ic-section-copy">
						Daily anchors, minimum outputs, pre-scheduled planning, and weekly reviews. Delete one distraction loop each week. Script a nightly audit: what fired, what failed, what adjusts tomorrow. No theatrics—just consistent proof.
					</p>
				</SectionShell>

				<SectionShell variant="panel" className="space-y-4 md:space-y-5 text-left">
					<h2 className="ic-heading-2 text-left">Discipline Across Life Phases</h2>
					<p className="ic-section-copy">
						The stack adjusts when you are travelling, under newborn sleep, building a company, rehabbing injury, or navigating grief. Minimums change but never disappear. Standards flex; they do not break.
					</p>
				</SectionShell>

				<SectionShell variant="panel" className="space-y-4 md:space-y-5 text-left">
					<h2 className="ic-heading-2 text-left">How Discipline &amp; Mindset Connect to the Iron Compass System</h2>
					<div className="space-y-3">
						<p className="ic-section-copy">Discipline &amp; Mindset supports:</p>
						<ul className="list-disc list-inside space-y-1 ic-section-copy">
							<li>Strength &amp; Health: consistent training and recovery even on low days</li>
							<li>Purpose &amp; Direction: execute the plan instead of collecting ideas</li>
							<li>Leadership &amp; Character: model steadiness so others trust you</li>
							<li>Financial Power: behavioural order before financial order</li>
							<li>Identity &amp; Legacy: proof that your stated standards are real</li>
						</ul>
						<p className="ic-section-copy">Without this domain, every other promise is fragile.</p>
					</div>
				</SectionShell>

				<SectionShell variant="panel" className="space-y-4 md:space-y-5 text-left">
					<h2 className="ic-heading-2 text-left">How Iron Compass AI Extends This Domain</h2>
					<div className="space-y-3">
						<p className="ic-section-copy">This page sets the standard. The Toolkit and App make it automatic.</p>
						<p className="ic-section-copy">They provide:</p>
						<ul className="list-disc list-inside space-y-1 ic-section-copy">
							<li>Daily check-ins that protect anchors and minimums</li>
							<li>Narrative prompts to reset when stress spikes</li>
							<li>Weekly reviews that expose drift fast</li>
							<li>Habit logging and proof over promises</li>
							<li>Playbooks for survive, standard, and surge days</li>
						</ul>
						<p className="ic-section-copy">Discipline becomes infrastructure, not intention.</p>
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
