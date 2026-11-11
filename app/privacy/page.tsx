import PageShell from "../components/PageShell";
import { buildPageMetadata } from "@/lib/site";

export const metadata = buildPageMetadata({
  title: "Privacy Policy | Iron Compass AI",
  description: "Understand how Iron Compass AI collects, uses, and safeguards your information across the platform.",
  path: "/privacy",
});

const highlights = [
  {
    "title": "Your Choice",
    "body": "Choose whether relevant personal context goes to OpenAI for coaching. Change that choice in Account."
  },
  {
    "title": "One Account",
    "body": "Your saved entries, progress and subscription access belong to the same member across app and website."
  },
  {
    "title": "Clear Controls",
    "body": "Manage reminders, export account data and request account deletion."
  }
];

const sections = [
  {
    "title": "Optional Starter-Pack Emails and Measurement",
    "body": "The free starter pack can be used without an email address or account. When email delivery is enabled, a separate opt-in requests the pack and three follow-up notes over eight days. We record your email, the exact consent version, the request time and confirmation with the sending service named beside the form. The sequence starts only after email confirmation, ends after the third follow-up and does not automatically enrol you in an ongoing newsletter. Unsubscribing stops remaining notes. Suppression records prevent further unwanted messages. Resend sends these emails; an isolated Upstash store in Sydney holds encrypted email addresses, consent, confirmation and delivery reservations. A keyed hash supports duplicate prevention without putting your address in a link. Encrypted addresses are removed when you unsubscribe or finish the sequence; abandoned requests are cleared by the daily cleanup after 30 days. Minimal consent and suppression records remain to prevent repeat sending. A daily keyed IP hash is used only to limit abuse and expires after a day. Confirmation and unsubscribe links contain signed access tokens: do not forward them. There is no email open or click tracking. We do not use your journal, worksheet answers or guide preference for these emails. Optional pack-page measurement is separate: when enabled and you allow it, Google Analytics receives a fixed pack-page address, button variant and actions such as downloads or app-link clicks, along with technical connection information processed by Google. No email, worksheet content, guide preference or full query/referrer is included in our measurement events. You can stop measurement on the pack page. The sending service, account retention settings and collection must be reviewed before activation."
  },
  {
    "title": "Account and Profile Information",
    "body": "We collect account details such as your email, password hash, subscription status, and the time and version of consent choices. Depending on the setup you complete, you may also provide your name, phone number, roles, schedule, goals, domain ratings, preferences and health information. Your phone number is not included in AI coaching prompts."
  },
  {
    "title": "Journal, Habits and Progress",
    "body": "We keep the entries, habits, logs, commitments, planning answers and coaching results you save so that you can use your account across the app and website. Health and exercise records, financial goals and other personal details you choose to enter may form part of this information."
  },
  {
    "title": "AI Coaching and Your Choice",
    "body": "AI coaching uses OpenAI. Before personal context is sent, you choose Allow AI coaching or Continue without AI. Account registration or accepting this policy does not turn AI sharing on. Relevant journal history, goals, habits, commitments, progress and setup answers such as roles, schedule and sleep or energy ratings may be sent with your request. Setup health notes, health concerns and training limits are excluded. Details you put directly in a journal or coaching request are part of that request. You can turn AI sharing off in Account. This stops new requests after the change is confirmed; it does not undo requests already sent or remove saved results. Basic journaling, habits and saved results remain available without AI sharing."
  },
  {
    "title": "Purchases and Subscription Access",
    "body": "Native iPhone purchases use Apple and RevenueCat. Web payments use Stripe where offered. Product, purchase, subscription and member identifiers confirm the plan available to your account across devices. RevenueCat also uses purchase information for subscription analytics. We do not store full payment card numbers."
  },
  {
    "title": "Optional Voice Entry",
    "body": "Speak entry starts when you choose it and grant microphone and speech access. iPhone uses Apple speech recognition, preferring on-device processing when available; otherwise Apple may process the audio. The web uses your browser speech service, which may process audio outside your device. Iron Compass AI does not upload audio to its server or OpenAI or save an audio recording. Recognised words appear in an editable draft. Saving an entry and requesting AI coaching are separate actions. You can type instead or change permissions in device settings."
  },
  {
    "title": "Optional Reminders",
    "body": "When you enable reminders, we use your device push token, member reference, platform, notification preferences, reminder times and time zone to deliver them. Delivery metadata may include destination and delivery status. iPhone reminders use Apple Push Notification service; web push uses Firebase where configured. You can manage reminders and device notification permissions."
  },
  {
    "title": "How Information Is Used",
    "body": "We use information to authenticate your account, deliver and personalise features, synchronise data and access, process purchases, prevent fraud, support members, and maintain reliability and security. Usage records help us understand feature use. Technical error and device information supports diagnostics. We do not sell your personal information. Marketing communications require a separate opt-in where applicable."
  },
  {
    "title": "Providers and International Processing",
    "body": "Hosting and database providers operate the service. Apple, RevenueCat and Stripe support purchases; OpenAI supports coaching you allow; Apple and Firebase support notifications. Your browser or Apple may process optional speech recognition. Providers may process information outside your country, including in the United States. Their policies explain their data handling. We may also disclose information where required by law."
  },
  {
    "title": "Retention and Deletion",
    "body": "Your entries and account records remain while your account is active. A successful account deletion removes your account and associated records from the active app database. If deletion fails, the app reports the failure so you can retry or contact us. This does not immediately erase backups, security logs or records held by payment and AI providers, which have separate retention periods; billing records may need to be kept for legal obligations. We do not promise one deletion deadline for every provider and backup. OpenAI requests use store:false to avoid stored completion application history; this does not disable separate provider safety or abuse-monitoring retention or delete results saved in your Iron Compass AI account."
  },
  {
    "title": "Security and Your Choices",
    "body": "The service uses HTTPS and password hashing. Access to production systems is restricted. You can review AI sharing in Account, manage reminder and microphone permissions, export account data and request account deletion. Contact us for access, correction, deletion or other privacy requests, including information about retained records."
  },
  {
    "title": "Minimum Age and Policy Updates",
    "body": "The service is intended for people aged 16 or older, or a higher minimum where required in your country. It is not directed at children under 16. This policy is version 2026-10-30. Material changes are reflected in the policy version and consent choices where required."
  },
  {
    "title": "Contact",
    "body": "Iron Compass AI is operated by HumanFirst Technologies, an Australian sole-trader business, ABN 96 226 474 355. Send privacy, security or account requests through the contact page. Include enough information for us to identify the account, without sending passwords or payment-card details."
  }
];

const rights = [
  "Request confirmation of whether we hold personal data about you.",
  "Ask for corrections when details change or contain inaccuracies.",
  "Request deletion where law allows, or restrict processing in limited cases.",
  "Export key data to another service in a commonly used format.",
];

export default function PrivacyPage() {
  return (
    <PageShell className="ic-public-page">
      <div className="ic-content-stack max-w-5xl">
        <section className="ic-panel ic-align-center ic-editorial-center space-y-6">
          <h1 className="ic-section-title">Privacy Policy</h1>
          <p className="ic-section-copy ic-section-copy--muted max-w-3xl mx-auto">
            Iron Compass AI is operated by HumanFirst Technologies, an Australian sole-trader business, ABN 96 226 474 355. We treat your data with the
            same seriousness we require inside the Iron Compass AI brotherhood. This policy covers the website, web app and iPhone app. Version 2026-10-30.
          </p>
        </section>

        <section className="grid gap-6 md:grid-cols-3 ic-align-center">
          {highlights.map((item) => (
            <article key={item.title} className="ic-panel-muted space-y-3 ic-align-center">
              <h2 className="ic-section-heading">{item.title}</h2>
              <p className="ic-section-copy ic-section-copy--muted text-sm">{item.body}</p>
            </article>
          ))}
        </section>

        <section className="space-y-6 ic-align-center">
          {sections.map((section, index) => (
            <article key={section.title} className="ic-panel-outline space-y-3 ic-align-center">
              <h2 className="ic-section-heading">Section {String(index + 1).padStart(2, "0")}: {section.title}</h2>
              <p className="ic-section-copy ic-section-copy--muted text-sm leading-relaxed mx-auto">{section.body}</p>
            </article>
          ))}
        </section>

        <section className="ic-panel space-y-4 ic-align-center">
          <div className="space-y-2">
            <h2 className="ic-section-heading">Exercise Your Data Rights</h2>
          </div>
          <ul className="space-y-3 text-sm mx-auto max-w-3xl">
            {rights.map((item) => (
              <li key={item} className="ic-dot-list">
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p className="ic-section-copy ic-section-copy--muted text-sm">
            Send privacy requests through the <a className="underline" href="/contact">contact page</a>. We respond within 30 days, subject to
            verification requirements and applicable law.
          </p>
        </section>
      </div>
    </PageShell>
  );
}
