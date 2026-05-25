import Link from "next/link";
import PageShell from "../components/PageShell";
import EmailCaptureForm from "../components/EmailCaptureForm";
import { buildPageMetadata } from "@/lib/site";
import { getAppStoreUrls, isSubscribeConfigured } from "@/lib/subscribe";

export const metadata = buildPageMetadata({
  title: "Download Iron Compass AI",
  description:
    "Get the Iron Compass app for disciplined execution, habit tracking, and daily standards. Join the waitlist or start the web program now.",
  path: "/download",
});

export default function DownloadPage() {
  const { ios, android } = getAppStoreUrls();
  const hasStoreLinks = Boolean(ios || android);
  const subscribeReady = isSubscribeConfigured();

  return (
    <PageShell>
      <div className="ic-content-stack max-w-3xl">
        <section className="ic-panel text-center space-y-6">
          <p className="ic-eyebrow">Iron Compass App</p>
          <h1 className="ic-section-title">Download Iron Compass AI</h1>
          <p className="ic-section-copy ic-section-copy--muted text-base max-w-2xl mx-auto">
            The native app is built for daily execution — anchors, reviews, domain tracking, and proof you can
            trust. Start the web program now while the app rolls out to your platform.
          </p>
        </section>

        {hasStoreLinks ? (
          <section className="ic-panel-outline space-y-4 text-center">
            <h2 className="ic-section-heading">Get the app</h2>
            <div className="ic-cta-row justify-center pt-2">
              {ios ? (
                <a href={ios} className="ic-btn-primary text-[0.62rem]" rel="noopener noreferrer" target="_blank">
                  Download for iOS
                </a>
              ) : null}
              {android ? (
                <a href={android} className="ic-btn-ghost text-[0.6rem]" rel="noopener noreferrer" target="_blank">
                  Download for Android
                </a>
              ) : null}
            </div>
          </section>
        ) : (
          <section className="ic-panel-outline space-y-5 text-center">
            <h2 className="ic-section-heading">Join the app waitlist</h2>
            <p className="ic-section-copy ic-section-copy--muted max-w-xl mx-auto">
              {subscribeReady
                ? "Leave your email. We will notify you when Iron Compass AI is ready for your device."
                : "App store links are coming soon. Use the web program below to start building standards now."}
            </p>
            {subscribeReady ? (
              <div className="max-w-xl mx-auto">
                <EmailCaptureForm source="download" buttonLabel="Join Waitlist" successMessage="You're on the waitlist." />
              </div>
            ) : null}
          </section>
        )}

        <section className="ic-panel text-center space-y-5">
          <h2 className="ic-section-heading">Start the web program</h2>
          <p className="ic-section-copy ic-section-copy--muted max-w-xl mx-auto">
            You do not need the app to begin. Choose your domain, set your standards, and start executing this
            week.
          </p>
          <div className="ic-cta-row justify-center pt-1">
            <Link href="/start" className="ic-btn-primary text-[0.62rem]">
              Start Your Rise
            </Link>
            <Link href="/domains" className="ic-btn-ghost text-[0.6rem]">
              Explore Domains
            </Link>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
