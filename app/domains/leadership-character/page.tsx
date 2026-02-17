import Link from "next/link";
import PageShell from "../../components/PageShell";
import { PageContainer, SectionShell, HeadingStack } from "../../components/LayoutPrimitives";
import { buildDomainMetadata, domainContentMap } from "../content";

const content = domainContentMap["leadership-character"];

export const metadata = buildDomainMetadata(content);

export default function LeadershipCharacterPage() {
	return (
		<PageShell>
			<PageContainer>
				<SectionShell variant="hero" className="space-y-6 text-left">
					<p className="ic-eyebrow">Iron Compass Domain</p>
					<h1 className="ic-page-title text-left">Leadership &amp; Character</h1>
					<p className="ic-section-copy ic-section-copy--muted max-w-3xl">
						Leadership is daily proof that your standards hold when people are watching. Character is the sum of those decisions. This domain forges calm authority, decisive communication, and steadiness that teams, families, and brothers rally around.
					</p>
					<div className="ic-cta-row">
						<Link href="/start" className="ic-btn-primary text-xs sm:text-[0.72rem]">
							Start Your Rise
						</Link>
						<Link href="/download" className="ic-btn-ghost text-xs sm:text-[0.7rem]">
							Download Iron Compass AI
						</Link>
					</div>
					<p className="ic-section-copy ic-section-copy--muted text-sm">Proven inside families, platoons, and fast-moving teams.</p>
				</SectionShell>

				<SectionShell variant="panel" className="space-y-4 md:space-y-5 text-left">
					<h2 className="ic-heading-2 text-left">Why Leadership &amp; Character Matter More Than Men Realise</h2>
					<p className="ic-section-copy">
						Rank is given. Leadership is proved. When pressure rises, people watch how you move: do you steady the room, make clear calls, and hold standards? Character is built in the small decisions that nobody celebrates; it breaks when ego or comfort takes over.
					</p>
					<p className="ic-section-copy">
						Iron Compass keeps leadership grounded in behaviour, not titles, and ties character to repeatable standards you can measure.
					</p>
				</SectionShell>

				<SectionShell variant="panel" className="space-y-4 md:space-y-5 text-left">
					<h2 className="ic-heading-2 text-left">The Modern Leadership Problem</h2>
					<p className="ic-section-copy">
						Many talk like leaders but fold when pressure hits. Communication drifts into sarcasm, decisions stall, and standards get delegated instead of modelled. Digital posturing replaces real presence. Trust erodes because behaviour is inconsistent.
					</p>
					<p className="ic-section-copy">
						Iron Compass prioritises calm aggression, clarity, and repeated proof over charisma.
					</p>
				</SectionShell>

				<SectionShell variant="panel" className="space-y-5 md:space-y-6 text-left">
					<HeadingStack title="Four Pillars of Leadership &amp; Character" center={false} className="space-y-2" />
					<div className="space-y-6 md:space-y-7">
						<div className="space-y-3">
							<h3 className="ic-heading-3 text-left">1. Example First</h3>
							<p className="ic-section-copy">
								People copy what you do, not what you post. Standards are contagious—so are excuses. You model the behaviour you expect, even when nobody is applauding.
							</p>
						</div>

						<div className="space-y-3">
							<h3 className="ic-heading-3 text-left">2. Command Calm</h3>
							<p className="ic-section-copy">
								Your nervous system is the room’s thermostat. Regulate yourself so others can borrow your steadiness. Calm is not passive; it is controlled aggression aimed at solutions.
							</p>
						</div>

						<div className="space-y-3">
							<h3 className="ic-heading-3 text-left">3. Decide Fast, Adjust Faster</h3>
							<p className="ic-section-copy">
								Leaders make the best call available, then refine with data. Indecision is worse than imperfect action. Speed with accountability builds trust.
							</p>
						</div>

						<div className="space-y-3">
							<h3 className="ic-heading-3 text-left">4. Protect the Standard</h3>
							<p className="ic-section-copy">
								Reward behaviour that matches the creed and confront what does not. Standards decay in silence. Guardrails, feedback, and consequences keep the culture clean.
							</p>
						</div>
					</div>
				</SectionShell>

				<SectionShell variant="panel" className="space-y-4 md:space-y-5 text-left">
					<h2 className="ic-heading-2 text-left">How Men Quietly Undermine Their Own Leadership</h2>
					<p className="ic-section-copy">
						Avoiding hard conversations, leading through mood swings, delegating standards, and overpromising under pressure. These erode credibility until followers comply from fear instead of respect—and eventually stop following at all.
					</p>
				</SectionShell>

				<SectionShell variant="panel" className="space-y-4 md:space-y-5 text-left">
					<h2 className="ic-heading-2 text-left">Leadership as Identity Support</h2>
					<p className="ic-section-copy">
						Leading yourself first makes your identity visible: dependable, clear, and stable. It strengthens Discipline, gives Purpose teeth, makes Financial decisions cleaner, and keeps Bonds healthy because people trust your presence.
					</p>
				</SectionShell>

				<SectionShell variant="panel" className="space-y-4 md:space-y-5 text-left">
					<h2 className="ic-heading-2 text-left">Practical Standards (Without Obsession)</h2>
					<p className="ic-section-copy">
						Write the leadership standard you expect from yourself and share it. Schedule one hard conversation weekly. Audit team or family cadence—does it reflect your values? Log daily reps of calm under pressure and clear decisions made.
					</p>
				</SectionShell>

				<SectionShell variant="panel" className="space-y-4 md:space-y-5 text-left">
					<h2 className="ic-heading-2 text-left">Leadership Across Life Phases</h2>
					<p className="ic-section-copy">
						Whether leading a young family, a small team, a platoon, or yourself through recovery, the posture stays: steady, decisive, and honest. Capacity and communication adjust to the season; standards do not.
					</p>
				</SectionShell>

				<SectionShell variant="panel" className="space-y-4 md:space-y-5 text-left">
					<h2 className="ic-heading-2 text-left">How Leadership &amp; Character Connect to the Iron Compass System</h2>
					<div className="space-y-3">
						<p className="ic-section-copy">Leadership &amp; Character supports:</p>
						<ul className="list-disc list-inside space-y-1 ic-section-copy">
							<li>Discipline &amp; Mindset: standards you model become standards others follow</li>
							<li>Strength &amp; Health: presence is reinforced by physical capability</li>
							<li>Purpose &amp; Direction: teams need clear aim and cadence</li>
							<li>Financial Power: leaders make calm, data-backed calls</li>
							<li>Identity &amp; Legacy: your reputation is built on witnessed behaviour</li>
						</ul>
						<p className="ic-section-copy">Leadership is the transmission belt between your standards and everyone you influence.</p>
					</div>
				</SectionShell>

				<SectionShell variant="panel" className="space-y-4 md:space-y-5 text-left">
					<h2 className="ic-heading-2 text-left">How Iron Compass AI Extends This Domain</h2>
					<div className="space-y-3">
						<p className="ic-section-copy">This page sets the creed. The Toolkit and App operationalise it.</p>
						<p className="ic-section-copy">They provide:</p>
						<ul className="list-disc list-inside space-y-1 ic-section-copy">
							<li>Leadership standards you can publish and track</li>
							<li>Decision logs and after-action reviews</li>
							<li>Communication frameworks for hard conversations</li>
							<li>Cadence planners for teams and families</li>
							<li>Calm-check prompts when stress spikes</li>
						</ul>
						<p className="ic-section-copy">Character moves from intention to visible proof.</p>
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
