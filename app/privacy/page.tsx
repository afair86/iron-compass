import PageShell from "../components/PageShell";

export const metadata = {
  title: "Privacy Policy | Iron Compass",
  description: "Understand how Iron Compass collects, uses, and safeguards your information across the platform.",
};

const highlights = [
  {
    title: "Data Minimalism",
    body: "We collect only the information required to operate Iron Compass securely and improve the product.",
  },
  {
    title: "Zero Data Sales",
    body: "We never sell member data. Trusted infrastructure partners help us operate but cannot repurpose your information.",
  },
  {
    title: "Secure by Design",
    body: "Encryption in transit, access controls, and recurring audits keep sensitive data under disciplined guard.",
  },
];

const sections = [
  {
    title: "Information We Collect",
    body:
      "We collect the details you share with us, such as account credentials, preference settings, and usage analytics. This includes device data, log files, and limited diagnostic information so we can secure the platform and improve performance.",
  },
  {
    title: "How We Use Your Information",
    body:
      "Your information powers core functions: delivering content, personalizing your dashboard, protecting the service, and communicating essential updates. We do not sell your personal data, but we may work with carefully selected service providers who help us operate and support Iron Compass.",
  },
  {
    title: "Legal Basis",
    body:
      "We process data under legitimate interests, contractual necessity, and where required, consent. Our approach aligns with applicable Australian law, as well as broader global privacy standards that govern ethical handling of personal information.",
  },
  {
    title: "Cookies & Tracking",
    body:
      "Iron Compass uses cookies, local storage, and similar tracking tools to maintain sessions, remember preferences, and measure product health. You can manage cookies in your browser, but disabling them may limit certain secure features.",
  },
  {
    title: "Data Security",
    body:
      "We apply layered safeguards including encryption in transit, access controls, and routine security reviews. No system is perfect, but we treat your information with the same seriousness we expect when trusting another man with our mission.",
  },
  {
    title: "Data Retention",
    body:
      "We retain personal data only for as long as it supports active accounts, complies with legal obligations, or resolves disputes. When information is no longer needed, we delete or anonymize it using commercially reasonable methods.",
  },
  {
    title: "Your Rights",
    body:
      "Depending on your jurisdiction, you may request access, correction, deletion, or restriction of your data. Submit a request and we will respond within a reasonable period, subject to verification and applicable law.",
  },
  {
    title: "Contact",
    body:
      "Questions or privacy concerns can be directed to privacy@ironcompass.ai. We will review every request and respond with clarity about the steps we take to protect your information.",
  },
];

const rights = [
  "Request confirmation of whether we hold personal data about you.",
  "Ask for corrections when details change or contain inaccuracies.",
  "Request deletion where law allows, or restrict processing in limited cases.",
  "Export key data to another service in a commonly used format.",
];

export default function PrivacyPage() {
  return (
    <PageShell>
      <div className="ic-content-stack max-w-5xl">
        <section className="ic-panel text-center space-y-6">
          <h1 className="ic-section-title">Privacy Policy</h1>
          <p className="ic-section-copy ic-section-copy--muted max-w-3xl mx-auto">
            We treat your data with the same seriousness we require inside the Iron Compass brotherhood. Minimal collection, transparent use, disciplined
            safeguards.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-3 text-center">
          {highlights.map((item) => (
            <article key={item.title} className="ic-panel-muted space-y-3 text-center">
              <h3 className="ic-section-heading">{item.title}</h3>
              <p className="ic-section-copy ic-section-copy--muted text-sm">{item.body}</p>
            </article>
          ))}
        </section>

        <section className="space-y-6 text-center">
          {sections.map((section, index) => (
            <article key={section.title} className="ic-panel-outline space-y-3 text-center">
              <h2 className="ic-section-heading">Section {String(index + 1).padStart(2, "0")}: {section.title}</h2>
              <p className="ic-section-copy ic-section-copy--muted text-sm leading-relaxed text-left mx-auto">{section.body}</p>
            </article>
          ))}
        </section>

        <section className="ic-panel space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="ic-section-heading">Exercise Your Data Rights</h2>
          </div>
          <ul className="space-y-3 text-sm text-left mx-auto max-w-3xl">
            {rights.map((item) => (
              <li key={item} className="ic-dot-list">
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="ic-section-copy ic-section-copy--muted text-sm">
            Email privacy requests to <a className="underline" href="mailto:privacy@ironcompass.ai">privacy@ironcompass.ai</a>. We respond within 30 days,
            subject to verification requirements and applicable law.
          </p>
        </section>
      </div>
    </PageShell>
  );
}
