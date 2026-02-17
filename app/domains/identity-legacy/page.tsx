import Link from "next/link";
import PageShell from "../../components/PageShell";
import { PageContainer, SectionShell, HeadingStack } from "../../components/LayoutPrimitives";
import { buildDomainMetadata, domainContentMap } from "../content";

const content = domainContentMap["identity-legacy"];

export const metadata = buildDomainMetadata(content);

export default function IdentityLegacyPage() {
	return (
		<PageShell>
			<PageContainer>
				<SectionShell variant="hero" className="space-y-6 text-left">
					<p className="ic-eyebrow">Iron Compass Domain</p>
					<h1 className="ic-page-title text-left">Identity &amp; Legacy</h1>
					<p className="ic-section-copy ic-section-copy--muted max-w-3xl">
						Identity is the standard you live out, not the stories you post. Legacy is that identity multiplied across decades and people. This domain makes sure your name and your behaviour match.
					</p>
					<div className="ic-cta-row">
						<Link href="/start" className="ic-btn-primary text-xs sm:text-[0.72rem]">
							Start Your Rise
						</Link>
						<Link href="/download" className="ic-btn-ghost text-xs sm:text-[0.7rem]">
							Download Iron Compass AI
						</Link>
					</div>
					<p className="ic-section-copy ic-section-copy--muted text-sm">Used by men writing legacies their sons can repeat.</p>
				</SectionShell>

				<SectionShell variant="panel" className="space-y-4 md:space-y-5 text-left">
					<h2 className="ic-heading-2 text-left">Why Identity &amp; Legacy Matter More Than Men Realise</h2>
					<p className="ic-section-copy">
						If your name and behaviour do not match, respect evaporates. Identity built on work, money, or followers collapses when those shift. Legacy is written in daily standards that withstand pressure and can be repeated by others.
					</p>
					<p className="ic-section-copy">
						Iron Compass ties identity to principles, roles, and proof, not vibes or public perception.
					</p>
				</SectionShell>

				<SectionShell variant="panel" className="space-y-4 md:space-y-5 text-left">
					<h2 className="ic-heading-2 text-left">The Modern Identity Problem</h2>
					<p className="ic-section-copy">
						Men borrow standards from the internet, let shame or success define them, and talk legacy while hiding from accountability. They drift because no clear principles or roles are named. Story replaces substance.
					</p>
					<p className="ic-section-copy">
						Iron Compass demands chosen principles, defined roles, and behaviour that proves them.
					</p>
				</SectionShell>

				<SectionShell variant="panel" className="space-y-5 md:space-y-6 text-left">
					<HeadingStack title="Four Pillars of Identity &amp; Legacy" center={false} className="space-y-2" />
					<div className="space-y-6 md:space-y-7">
						<div className="space-y-3">
							<h3 className="ic-heading-3 text-left">1. Principles</h3>
							<p className="ic-section-copy">
								Pick 3–5 non-negotiables and read them daily. Principles are the rails your behaviour runs on, not slogans. They survive mood swings and pressure.
							</p>
						</div>

						<div className="space-y-3">
							<h3 className="ic-heading-3 text-left">2. Roles</h3>
							<p className="ic-section-copy">
								Name the people and arenas you are responsible to—father, partner, operator, brother. Roles clarify duty and focus your standards.
							</p>
						</div>

						<div className="space-y-3">
							<h3 className="ic-heading-3 text-left">3. Standards</h3>
							<p className="ic-section-copy">
								Define acceptable behaviour before emotions vote. Standards make decisions easy: you either met them or you did not.
							</p>
						</div>

						<div className="space-y-3">
							<h3 className="ic-heading-3 text-left">4. Story</h3>
							<p className="ic-section-copy">
								Tell the truth about who you were, who you are, and who you will be. Story integrates wins, failures, and adjustments so shame or ego do not drive the narrative.
							</p>
						</div>
					</div>
				</SectionShell>

				<SectionShell variant="panel" className="space-y-4 md:space-y-5 text-left">
					<h2 className="ic-heading-2 text-left">How Men Quietly Undermine Their Own Identity</h2>
					<p className="ic-section-copy">
						Letting work or relationships define them, dragging regret as identity, copying other men’s standards, or hiding behind slogans instead of proof. These behaviours make identity brittle and legacy empty.
					</p>
				</SectionShell>

				<SectionShell variant="panel" className="space-y-4 md:space-y-5 text-left">
					<h2 className="ic-heading-2 text-left">Identity &amp; Legacy as System Support</h2>
					<p className="ic-section-copy">
						When principles, roles, and standards are clear, Discipline is easier, Purpose is sharper, Leadership is trusted, and Financial decisions align. Your body (Strength) carries a name worth protecting. Legacy is daily, not posthumous.
					</p>
				</SectionShell>

				<SectionShell variant="panel" className="space-y-4 md:space-y-5 text-left">
					<h2 className="ic-heading-2 text-left">Practical Standards (Without Obsession)</h2>
					<p className="ic-section-copy">
						Write a future-self letter quarterly. Run nightly audits: where did I act like the man I claim to be? Schedule role reviews. Craft a legacy sentence your family can repeat. Keep the list short so it stays lived.
					</p>
				</SectionShell>

				<SectionShell variant="panel" className="space-y-4 md:space-y-5 text-left">
					<h2 className="ic-heading-2 text-left">Identity Across Life Phases</h2>
					<p className="ic-section-copy">
						Career shifts, marriage, children, loss, and ageing all test identity. Principles stay, roles adapt, standards adjust to reality but remain written, and the story keeps updating with truth.
					</p>
				</SectionShell>

				<SectionShell variant="panel" className="space-y-4 md:space-y-5 text-left">
					<h2 className="ic-heading-2 text-left">How Identity &amp; Legacy Connect to the Iron Compass System</h2>
					<div className="space-y-3">
						<p className="ic-section-copy">Identity &amp; Legacy supports:</p>
						<ul className="list-disc list-inside space-y-1 ic-section-copy">
							<li>Discipline &amp; Mindset: your standards are tied to who you are, not how you feel</li>
							<li>Purpose &amp; Direction: mission flows from identity</li>
							<li>Leadership &amp; Character: people trust men whose names match their actions</li>
							<li>Strength &amp; Health: the body carries the reputation</li>
							<li>Financial Power: money amplifies the man you already are</li>
						</ul>
						<p className="ic-section-copy">When identity is clear, every domain aligns instead of competing.</p>
					</div>
				</SectionShell>

				<SectionShell variant="panel" className="space-y-4 md:space-y-5 text-left">
					<h2 className="ic-heading-2 text-left">How Iron Compass AI Extends This Domain</h2>
					<div className="space-y-3">
						<p className="ic-section-copy">This page defines the identity. The Toolkit and App make it visible and repeatable.</p>
						<p className="ic-section-copy">They provide:</p>
						<ul className="list-disc list-inside space-y-1 ic-section-copy">
							<li>Principle and role scripts you can review daily</li>
							<li>Nightly audits and accountability logging</li>
							<li>Legacy sentence builders and reminders</li>
							<li>Role-review cadence templates</li>
							<li>Story trackers to integrate wins and failures</li>
						</ul>
						<p className="ic-section-copy">Identity becomes proof, and legacy becomes daily practice.</p>
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
