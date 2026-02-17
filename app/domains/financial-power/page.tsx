import Link from "next/link";
import PageShell from "../../components/PageShell";
import { PageContainer, SectionShell, HeadingStack } from "../../components/LayoutPrimitives";
import { buildDomainMetadata, domainContentMap } from "../content";

const content = domainContentMap["financial-power"];

export const metadata = buildDomainMetadata(content);

export default function FinancialPowerPage() {
	return (
		<PageShell>
			<PageContainer>
				<SectionShell variant="hero" className="space-y-6 text-left">
					<p className="ic-eyebrow">Iron Compass Domain</p>
					<h1 className="ic-page-title text-left">Financial Power</h1>
					<p className="ic-section-copy ic-section-copy--muted max-w-3xl">
						Financial Power removes chaos from money so you can lead family, work, and mission without panic. It is built through standards, skill, and deliberate planning—not hype or shortcuts.
					</p>
					<div className="ic-cta-row">
						<Link href="/start" className="ic-btn-primary text-xs sm:text-[0.72rem]">
							Start Your Rise
						</Link>
						<Link href="/download" className="ic-btn-ghost text-xs sm:text-[0.7rem]">
							Download Iron Compass AI
						</Link>
					</div>
					<p className="ic-section-copy ic-section-copy--muted text-sm">Men worldwide use this domain to remove financial chaos.</p>
				</SectionShell>

				<SectionShell variant="panel" className="space-y-4 md:space-y-5 text-left">
					<h2 className="ic-heading-2 text-left">Why Financial Power Matters More Than Men Realise</h2>
					<p className="ic-section-copy">
						Money is behaviour. Without structure, income leaks, buffers vanish, and every setback becomes panic. Financial calm lets you think, lead, and stay aggressive when others freeze.
					</p>
					<p className="ic-section-copy">
						Iron Compass treats money as a system—clarity, buffers, skill, and long games—not as luck or stress.
					</p>
				</SectionShell>

				<SectionShell variant="panel" className="space-y-4 md:space-y-5 text-left">
					<h2 className="ic-heading-2 text-left">The Modern Money Problem</h2>
					<p className="ic-section-copy">
						Avoiding numbers until crisis hits, emotional spending, jumping jobs without a plan, and living without buffers. Many men measure status, not stability, and burn cash on coping instead of building skill. When downturns come, they have no margin and no plan.
					</p>
					<p className="ic-section-copy">
						Iron Compass replaces hope with process.
					</p>
				</SectionShell>

				<SectionShell variant="panel" className="space-y-5 md:space-y-6 text-left">
					<HeadingStack title="Four Pillars of Financial Power" center={false} className="space-y-2" />
					<div className="space-y-6 md:space-y-7">
						<div className="space-y-3">
							<h3 className="ic-heading-3 text-left">1. Reality First</h3>
							<p className="ic-section-copy">
								Know your numbers weekly—income, expenses, debt, buffers. Reality kills fear and tells you what to fix. You cannot lead money you refuse to look at.
							</p>
						</div>

						<div className="space-y-3">
							<h3 className="ic-heading-3 text-left">2. Earn the Raise</h3>
							<p className="ic-section-copy">
								Increase value through skill, reliability, and leadership. Income grows when your output and trustworthiness grow. Aggression is paired with competence.
							</p>
						</div>

						<div className="space-y-3">
							<h3 className="ic-heading-3 text-left">3. Protect the Buffer</h3>
							<p className="ic-section-copy">
								Cash cushions buy calm and strategic aggression. Buffers keep you from desperate decisions and let you play offense when others retreat.
							</p>
						</div>

						<div className="space-y-3">
							<h3 className="ic-heading-3 text-left">4. Play Long Games</h3>
							<p className="ic-section-copy">
								Invest in assets, skills, and relationships that compound. Shortcuts and hype die; long games compound into stability and freedom.
							</p>
						</div>
					</div>
				</SectionShell>

				<SectionShell variant="panel" className="space-y-4 md:space-y-5 text-left">
					<h2 className="ic-heading-2 text-left">How Men Quietly Undermine Their Own Finances</h2>
					<p className="ic-section-copy">
						Swiping to cope, avoiding statements, chasing shiny jobs, and ignoring buffers. Small leaks become crises; panic replaces planning.
					</p>
				</SectionShell>

				<SectionShell variant="panel" className="space-y-4 md:space-y-5 text-left">
					<h2 className="ic-heading-2 text-left">Financial Power as Identity Support</h2>
					<p className="ic-section-copy">
						Money decisions reveal character: honesty with numbers, patience with growth, and courage to invest. Financial calm supports Purpose, fuels Strength, reinforces Leadership credibility, and protects family Bonds.
					</p>
				</SectionShell>

				<SectionShell variant="panel" className="space-y-4 md:space-y-5 text-left">
					<h2 className="ic-heading-2 text-left">Practical Standards (Without Obsession)</h2>
					<p className="ic-section-copy">
						Run a weekly money review. Automate transfers to a buffer. Schedule skill-building for income. Remove one emotional spending trigger. Keep a simple plan you actually follow.
					</p>
				</SectionShell>

				<SectionShell variant="panel" className="space-y-4 md:space-y-5 text-left">
					<h2 className="ic-heading-2 text-left">Financial Power Across Life Phases</h2>
					<p className="ic-section-copy">
						Starting out, scaling, providing for a family, or rebuilding after setback—buffers, skill, and long games stay, but amounts and timelines adapt. Standards flex with income level; discipline does not.
					</p>
				</SectionShell>

				<SectionShell variant="panel" className="space-y-4 md:space-y-5 text-left">
					<h2 className="ic-heading-2 text-left">How Financial Power Connects to the Iron Compass System</h2>
					<div className="space-y-3">
						<p className="ic-section-copy">Financial Power supports:</p>
						<ul className="list-disc list-inside space-y-1 ic-section-copy">
							<li>Discipline &amp; Mindset: behaviour creates cash-flow order</li>
							<li>Purpose &amp; Direction: money funds the mission</li>
							<li>Leadership &amp; Character: calm decisions under pressure</li>
							<li>Identity &amp; Legacy: resources amplify the man you are</li>
							<li>Strength &amp; Health: financial buffers reduce stress load</li>
						</ul>
						<p className="ic-section-copy">Financial chaos infects every domain; structure strengthens all of them.</p>
					</div>
				</SectionShell>

				<SectionShell variant="panel" className="space-y-4 md:space-y-5 text-left">
					<h2 className="ic-heading-2 text-left">How Iron Compass AI Extends This Domain</h2>
					<div className="space-y-3">
						<p className="ic-section-copy">This page sets the standards. The Toolkit and App operationalise money with discipline.</p>
						<p className="ic-section-copy">They provide:</p>
						<ul className="list-disc list-inside space-y-1 ic-section-copy">
							<li>Weekly money reviews and checklists</li>
							<li>Income-skill plans and tracking</li>
							<li>Buffer automation reminders</li>
							<li>Spending trigger audits and guardrails</li>
							<li>Long-game planning templates</li>
						</ul>
						<p className="ic-section-copy">Stress is replaced by structure and strategic aggression.</p>
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
