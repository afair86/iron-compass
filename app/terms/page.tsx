import PageShell from "../components/PageShell";

export const metadata = {
  title: "Terms of Use | Iron Compass",
  description: "Review the rules that govern your access to the Iron Compass platform, content, and services.",
};

const sections = [
  {
    title: "Acceptance of Terms",
    body:
      "By accessing the Iron Compass site, app, or any related services, you acknowledge these Terms of Use. If you disagree with any part of them, do not continue using the platform.",
  },
  {
    title: "Not Medical, Financial, or Mental Health Advice",
    body:
      "Iron Compass delivers self-improvement tools, training, and accountability systems. We are not a substitute for professional medical, financial, or mental health services. Always consult qualified professionals before acting on any plan.",
  },
  {
    title: "Eligibility & Responsible Use",
    body:
      "You must be of legal age in your jurisdiction and capable of entering binding agreements. Use the platform responsibly, maintain truthful information, and do not share access with anyone who would violate these standards.",
  },
  {
    title: "Accounts & Security",
    body:
      "You are responsible for safeguarding your credentials and notifying us immediately of any unauthorized access. We may suspend or terminate accounts that compromise system integrity or abuse our community.",
  },
  {
    title: "Paid Features",
    body:
      "Certain features or future offerings may require payment. Pricing, renewal terms, and refund policies will be posted at checkout. By purchasing, you agree to those additional terms.",
  },
  {
    title: "Intellectual Property",
    body:
      "All Iron Compass content, trademarks, and technology remain our property or that of our licensors. You receive a limited, revocable license to access the platform for personal use and may not reproduce or reverse-engineer it without written permission.",
  },
  {
    title: "Prohibited Conduct",
    body:
      "Do not attempt to exploit the platform, transmit harmful code, scrape our data, harass members, or use Iron Compass for illegal purposes. We reserve the right to investigate and take action when necessary.",
  },
  {
    title: "Limitation of Liability",
    body:
      "Iron Compass is provided on an \"as-is\" basis. To the fullest extent allowed by law, we disclaim warranties and are not liable for indirect, incidental, or consequential damages that arise from using the platform.",
  },
  {
    title: "Changes to These Terms",
    body:
      "We may update these Terms to reflect legal requirements or product changes. When we do, we will adjust the effective date and, when practical, notify you. Continued use after changes means you accept the updated Terms.",
  },
  {
    title: "Governing Law & Contact",
    body:
      "These Terms are governed by applicable Australian law, along with any mandatory local protections that apply to you. Questions can be sent to legal@ironcompass.ai, and we will respond with clear direction.",
  },
];

const commitments = [
  "Operate with integrity, honesty, and respect for other members.",
  "Follow lawful conduct inside and outside the product while representing Iron Compass.",
  "Protect access credentials and report suspicious activity immediately.",
  "Use the content for personal development—not to compete or resell.",
];

const companyPromises = [
  "Deliver the platform with reasonable uptime and support.",
  "Communicate changes to pricing, features, or policies with clarity.",
  "Protect member privacy following the standards in our Privacy Policy.",
  "Remove users or content that compromise safety, legality, or the community standard.",
];

export default function TermsPage() {
  return (
    <PageShell>
      <div className="ic-content-stack max-w-5xl">
        <section className="ic-panel text-center space-y-6">
          <h1 className="ic-section-title">Terms of Use</h1>
          <p className="ic-section-copy ic-section-copy--muted max-w-3xl mx-auto">
            Using Iron Compass means you accept these terms. They exist to keep the mission clean, guard the community, and set expectations between
            members and the company.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-2 text-center">
          <article className="ic-panel-muted space-y-3 text-center">
            <h2 className="ic-section-heading">Member Commitments</h2>
            <ul className="space-y-3 text-sm text-left mx-auto max-w-3xl">
              {commitments.map((item) => (
                <li key={item} className="ic-dot-list">
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
          <article className="ic-panel-muted space-y-3 text-center">
            <h2 className="ic-section-heading">What We Promise</h2>
            <ul className="space-y-3 text-sm text-left mx-auto max-w-3xl">
              {companyPromises.map((item) => (
                <li key={item} className="ic-dot-list">
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </section>

        <section className="space-y-6 text-center">
          {sections.map((section, index) => (
            <article key={section.title} className="ic-panel-outline space-y-3 text-center">
              <h2 className="ic-section-heading">Clause {String(index + 1).padStart(2, "0")}: {section.title}</h2>
              <p className="ic-section-copy ic-section-copy--muted text-sm leading-relaxed text-left mx-auto">{section.body}</p>
            </article>
          ))}
        </section>

        <section className="ic-panel space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="ic-section-heading">Reach the Legal Team</h2>
          </div>
          <p className="ic-section-copy ic-section-copy--muted text-sm">
            Email <a href="mailto:legal@ironcompass.ai" className="underline">legal@ironcompass.ai</a> for compliance questions, dispute notices, or
            clarifications. Include your account email, a summary of your concern, and supporting documentation so we can respond quickly.
          </p>
        </section>
      </div>
    </PageShell>
  );
}
