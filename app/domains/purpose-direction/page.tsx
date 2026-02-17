import Link from "next/link";
import PageShell from "../../components/PageShell";
import { PageContainer, SectionShell, HeadingStack } from "../../components/LayoutPrimitives";
import { buildDomainMetadata, domainContentMap } from "../content";

const content = domainContentMap["purpose-direction"];

export const metadata = buildDomainMetadata(content);

export default function PurposeDirectionPage() {
	return (
		<PageShell>
			<PageContainer>
				<SectionShell variant="hero" className="space-y-6 text-left">
					<p className="ic-eyebrow">Iron Compass Domain</p>
					<h1 className="ic-page-title text-left">Purpose &amp; Direction</h1>
					<p className="ic-section-copy ic-section-copy--muted max-w-3xl">
						Purpose is selected, not discovered. Direction translates that choice into targets, calendars, and reviews so drift dies and progress compounds. This domain makes sure every hour aims at a mission that still matters when life tilts.
					</p>
					<div className="ic-cta-row">
						<Link href="/start" className="ic-btn-primary text-xs sm:text-[0.72rem]">
							Start Your Rise
						</Link>
						<Link href="/download" className="ic-btn-ghost text-xs sm:text-[0.7rem]">
							Download Iron Compass AI
						</Link>
					</div>
					<p className="ic-section-copy ic-section-copy--muted text-sm">Trusted by operators aligning every hour with mission.</p>
				</SectionShell>

				<SectionShell variant="panel" className="space-y-4 md:space-y-5 text-left">
					<h2 className="ic-heading-2 text-left">Why Purpose &amp; Direction Matter More Than Men Realise</h2>
					<p className="ic-section-copy">
						Without a chosen mission, discipline has nowhere to aim and momentum scatters. Purpose provides the why; direction provides the path. Together they shut down distraction, indecision, and drift.
					</p>
					<p className="ic-section-copy">
						Iron Compass turns ambition into a map—North Star, quarterly targets, and weekly reviews—so action compounds instead of resets.
					</p>
				</SectionShell>

				<SectionShell variant="panel" className="space-y-4 md:space-y-5 text-left">
					<h2 className="ic-heading-2 text-left">The Modern Purpose Problem</h2>
					<p className="ic-section-copy">
						Men drown in options, chase novelty, and let other people’s urgency hijack the calendar. They confuse busyness with progress, collect ideas without committing, and make emotional decisions that derail the quarter. Mission statements stay in journals while the week gets stolen by noise.
					</p>
					<p className="ic-section-copy">
						Iron Compass insists on one North Star, measurable targets, and reviews that force honesty.
					</p>
				</SectionShell>

				<SectionShell variant="panel" className="space-y-5 md:space-y-6 text-left">
					<HeadingStack title="Four Pillars of Purpose &amp; Direction" center={false} className="space-y-2" />
					<div className="space-y-6 md:space-y-7">
						<div className="space-y-3">
							<h3 className="ic-heading-3 text-left">1. North Star</h3>
							<p className="ic-section-copy">
								One sentence that still matters after hardship. It anchors decisions, priorities, and sacrifices. Without it, every opportunity looks equal and you scatter energy.
							</p>
						</div>

						<div className="space-y-3">
							<h3 className="ic-heading-3 text-left">2. Pillar Selection</h3>
							<p className="ic-section-copy">
								Choose the three to four arenas that move everything else. Say no to the rest. Focus converts potential into distance.
							</p>
						</div>

						<div className="space-y-3">
							<h3 className="ic-heading-3 text-left">3. Target Translation</h3>
							<p className="ic-section-copy">
								Attach metrics, dates, and proof of work to every objective. Vague goals collapse under pressure; quantified targets survive mood swings.
							</p>
						</div>

						<div className="space-y-3">
							<h3 className="ic-heading-3 text-left">4. Cadence Reviews</h3>
							<p className="ic-section-copy">
								Weekly and quarterly reviews expose drift early. You adjust the route before you crash. Reviews keep the mission alive when distractions multiply.
							</p>
						</div>
					</div>
				</SectionShell>

				<SectionShell variant="panel" className="space-y-4 md:space-y-5 text-left">
					<h2 className="ic-heading-2 text-left">How Men Quietly Undermine Their Direction</h2>
					<p className="ic-section-copy">
						Collecting courses, chasing feelings, letting inboxes and meetings set the agenda, and refusing to kill distractions. These patterns feel productive but keep you parked at zero.
					</p>
				</SectionShell>

				<SectionShell variant="panel" className="space-y-4 md:space-y-5 text-left">
					<h2 className="ic-heading-2 text-left">Purpose as Identity Support</h2>
					<p className="ic-section-copy">
						When you choose a mission and prove it with a calendar, confidence stabilises. Leadership gains clarity, financial decisions align, and family sees consistency instead of chaos. Purpose makes identity visible.
					</p>
				</SectionShell>

				<SectionShell variant="panel" className="space-y-4 md:space-y-5 text-left">
					<h2 className="ic-heading-2 text-left">Practical Standards (Without Obsession)</h2>
					<p className="ic-section-copy">
						Write or refine your North Star. Map quarterly targets with dates and metrics. Guard a weekly review block. Audit commitments with one filter: does this move the mission? Delete one obligation that does not.
					</p>
				</SectionShell>

				<SectionShell variant="panel" className="space-y-4 md:space-y-5 text-left">
					<h2 className="ic-heading-2 text-left">Direction Across Life Phases</h2>
					<p className="ic-section-copy">
						The map adapts whether you are single, raising kids, scaling a business, changing careers, or rebuilding after loss. Targets adjust; the mission remains. Reviews keep you honest when circumstances shift.
					</p>
				</SectionShell>

				<SectionShell variant="panel" className="space-y-4 md:space-y-5 text-left">
					<h2 className="ic-heading-2 text-left">How Purpose &amp; Direction Connect to the Iron Compass System</h2>
					<div className="space-y-3">
						<p className="ic-section-copy">Purpose &amp; Direction supports:</p>
						<ul className="list-disc list-inside space-y-1 ic-section-copy">
							<li>Discipline &amp; Mindset: standards need a mission to aim at</li>
							<li>Strength &amp; Health: energy is directed, not wasted</li>
							<li>Leadership &amp; Character: people follow those who know where they are going</li>
							<li>Financial Power: money choices align with the mission</li>
							<li>Identity &amp; Legacy: your name is tied to a chosen direction</li>
						</ul>
						<p className="ic-section-copy">A drifting mission weakens every domain.</p>
					</div>
				</SectionShell>

				<SectionShell variant="panel" className="space-y-4 md:space-y-5 text-left">
					<h2 className="ic-heading-2 text-left">How Iron Compass AI Extends This Domain</h2>
					<div className="space-y-3">
						<p className="ic-section-copy">This page sets the mission. The Toolkit and App execute it.</p>
						<p className="ic-section-copy">They provide:</p>
						<ul className="list-disc list-inside space-y-1 ic-section-copy">
							<li>North Star scripting and storage</li>
							<li>Quarterly target builders with metrics</li>
							<li>Weekly review cadence with prompts</li>
							<li>Calendar alignment and commitment audits</li>
							<li>Decision filters that protect the mission</li>
						</ul>
						<p className="ic-section-copy">Direction stops being theory and becomes schedule.</p>
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
