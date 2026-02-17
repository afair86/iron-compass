import Link from "next/link";
import PageShell from "../../components/PageShell";
import { PageContainer, SectionShell, HeadingStack } from "../../components/LayoutPrimitives";
import { buildDomainMetadata, domainContentMap } from "../content";

const content = domainContentMap["ai-mastery"];

export const metadata = buildDomainMetadata(content);

export default function AiMasteryPage() {
	return (
		<PageShell>
			<PageContainer>
				<SectionShell variant="hero" className="space-y-6 text-left">
					<p className="ic-eyebrow">Iron Compass Domain</p>
					<h1 className="ic-page-title text-left">AI Mastery &amp; Life Optimization</h1>
					<p className="ic-section-copy ic-section-copy--muted max-w-3xl">
						AI Mastery is disciplined leverage. You design decision support, automation, and creative speed so your standards execute faster without losing integrity. Technology serves the mission, not the other way around.
					</p>
					<div className="ic-cta-row">
						<Link href="/start" className="ic-btn-primary text-xs sm:text-[0.72rem]">
							Start Your Rise
						</Link>
						<Link href="/download" className="ic-btn-ghost text-xs sm:text-[0.7rem]">
							Download Iron Compass AI
						</Link>
					</div>
					<p className="ic-section-copy ic-section-copy--muted text-sm">Applied by builders pairing aggression with automation.</p>
				</SectionShell>

				<SectionShell variant="panel" className="space-y-4 md:space-y-5 text-left">
					<h2 className="ic-heading-2 text-left">Why AI Mastery Matters More Than Men Realise</h2>
					<p className="ic-section-copy">
						Leverage wins. Men who integrate AI for planning, decision support, and creative output move faster with less wasted energy. Those who ignore it fall behind or misuse it and lose trust. Mastery means you stay human-first while multiplying your output.
					</p>
					<p className="ic-section-copy">
						Iron Compass treats AI as disciplined infrastructure—not a toy and not a crutch.
					</p>
				</SectionShell>

				<SectionShell variant="panel" className="space-y-4 md:space-y-5 text-left">
					<h2 className="ic-heading-2 text-left">The Modern AI Problem</h2>
					<p className="ic-section-copy">
						Most men collect tools instead of building workflows. They let AI think for them, forget security, and never document what works. Fear of experimentation or blind outsourcing both cost time and credibility.
					</p>
					<p className="ic-section-copy">
						Iron Compass builds a small, disciplined stack with guardrails.
					</p>
				</SectionShell>

				<SectionShell variant="panel" className="space-y-5 md:space-y-6 text-left">
					<HeadingStack title="Four Pillars of AI Mastery" center={false} className="space-y-2" />
					<div className="space-y-6 md:space-y-7">
						<div className="space-y-3">
							<h3 className="ic-heading-3 text-left">1. Human First</h3>
							<p className="ic-section-copy">
								You make the call—AI accelerates the path. Judgment, ethics, and mission stay human. AI augments your decision-making; it never replaces it.
							</p>
						</div>

						<div className="space-y-3">
							<h3 className="ic-heading-3 text-left">2. Small Stack</h3>
							<p className="ic-section-copy">
								Master a few tools and integrate them deeply. Sprawl kills reliability. A tight stack is faster, safer, and easier to improve.
							</p>
						</div>

						<div className="space-y-3">
							<h3 className="ic-heading-3 text-left">3. Document the Wins</h3>
							<p className="ic-section-copy">
								Store prompts, results, and lessons so leverage compounds. What works today becomes tomorrow’s playbook for you and your team.
							</p>
						</div>

						<div className="space-y-3">
							<h3 className="ic-heading-3 text-left">4. Ethical Guardrails</h3>
							<p className="ic-section-copy">
								Protect privacy, honour NDAs, and keep trust. Security and integrity come before speed. You never trade your name for convenience.
							</p>
						</div>
					</div>
				</SectionShell>

				<SectionShell variant="panel" className="space-y-4 md:space-y-5 text-left">
					<h2 className="ic-heading-2 text-left">How Men Quietly Undermine Their Own Leverage</h2>
					<p className="ic-section-copy">
						Tool-hopping, copy-pasting without thinking, leaking sensitive data, and refusing to share workflows. These habits waste time and erode trust. Without standards, AI becomes noise instead of leverage.
					</p>
				</SectionShell>

				<SectionShell variant="panel" className="space-y-4 md:space-y-5 text-left">
					<h2 className="ic-heading-2 text-left">AI Mastery as Identity Support</h2>
					<p className="ic-section-copy">
						Disciplined leverage signals competence and responsibility. It frees time for Purpose, compounds Financial Power, and keeps Leadership credible because you respect security and people. Your name stays intact while your output grows.
					</p>
				</SectionShell>

				<SectionShell variant="panel" className="space-y-4 md:space-y-5 text-left">
					<h2 className="ic-heading-2 text-left">Practical Standards (Without Obsession)</h2>
					<p className="ic-section-copy">
						Design a daily AI briefing for planning and review. Automate one repetitive workflow each week. Log prompts and results. Teach your team or family the stack so leverage multiplies. Keep a security checklist.
					</p>
				</SectionShell>

				<SectionShell variant="panel" className="space-y-4 md:space-y-5 text-left">
					<h2 className="ic-heading-2 text-left">AI Mastery Across Life Phases</h2>
					<p className="ic-section-copy">
						Whether building a business, balancing family, deploying, or studying, leverage adapts. Tools stay small, workflows stay documented, and security stays strict. The aim: more time, better decisions, same standards.
					</p>
				</SectionShell>

				<SectionShell variant="panel" className="space-y-4 md:space-y-5 text-left">
					<h2 className="ic-heading-2 text-left">How AI Mastery Connects to the Iron Compass System</h2>
					<div className="space-y-3">
						<p className="ic-section-copy">AI Mastery supports:</p>
						<ul className="list-disc list-inside space-y-1 ic-section-copy">
							<li>Purpose &amp; Direction: leverage aims at the mission</li>
							<li>Discipline &amp; Mindset: automation protects anchors and reviews</li>
							<li>Financial Power: efficiency increases output and opportunity</li>
							<li>Leadership &amp; Character: secure, ethical use builds trust</li>
							<li>Identity &amp; Legacy: innovation matched with integrity strengthens your name</li>
						</ul>
						<p className="ic-section-copy">Leverage without standards erodes the system; leverage with standards multiplies it.</p>
					</div>
				</SectionShell>

				<SectionShell variant="panel" className="space-y-4 md:space-y-5 text-left">
					<h2 className="ic-heading-2 text-left">How Iron Compass AI Extends This Domain</h2>
					<div className="space-y-3">
						<p className="ic-section-copy">This page sets the principles. The Toolkit and App deliver the workflows.</p>
						<p className="ic-section-copy">They provide:</p>
						<ul className="list-disc list-inside space-y-1 ic-section-copy">
							<li>Daily AI briefings and planning prompts</li>
							<li>Automation playbooks and checklists</li>
							<li>Prompt libraries with results and lessons</li>
							<li>Security guardrails and red-line reminders</li>
							<li>Team sharing so leverage multiplies</li>
						</ul>
						<p className="ic-section-copy">AI turns into disciplined leverage, not noise.</p>
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
