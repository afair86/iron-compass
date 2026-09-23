import Link from "next/link";
import PageShell from "../components/PageShell";
import EmailCaptureForm from "../components/EmailCaptureForm";
import { buildPageMetadata } from "@/lib/site";
import { getAppStoreUrls, isSubscribeConfigured } from "@/lib/subscribe";

export const metadata = buildPageMetadata({
  title: "Download Iron Compass AI",
  description:
    "The Iron Compass app is not available to download yet. Read the domains and the journal while you wait.",
  path: "/download",
});

export default function DownloadPage() {
  const { ios, android } = getAppStoreUrls();
  const hasStoreLinks = Boolean(ios || android);
  const subscribeReady = isSubscribeConfigured();

  return (
    <PageShell>
      <div className="ic-content-stack max-w-3xl">
        <section className="ic-panel ic-align-center space-y-6">
          <p className="ic-eyebrow">Iron Compass App</p>
          <h1 className="ic-section-title">Download Iron Compass AI</h1>
          <p className="ic-section-copy ic-section-copy--muted text-base max-w-2xl mx-auto">
            The app is not ready to download yet. The domains and the journal are here now, and you can use them
            without an account.
          </p>
        </section>

        {hasStoreLinks ? (
          <section className="ic-panel-outline space-y-4 ic-align-center">
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
          <section className="ic-panel-outline space-y-5 ic-align-center">
            <h2 className="ic-section-heading">Join the app waitlist</h2>
            <p className="ic-section-copy ic-section-copy--muted max-w-xl mx-auto">
              {subscribeReady
                ? "Leave your email. We will notify you when Iron Compass AI is ready for your device."
                : "Store links are not available yet. The reading on this site is ready whenever you are."}
            </p>
            {subscribeReady ? (
              <div className="max-w-xl mx-auto">
                <EmailCaptureForm source="download" buttonLabel="Join Waitlist" successMessage="You're on the waitlist." />
              </div>
            ) : null}
          </section>
        )}

        <section className="ic-panel ic-align-center space-y-5">
          <h2 className="ic-section-heading">Read while you wait</h2>
          <p className="ic-section-copy ic-section-copy--muted max-w-xl mx-auto">
            Eight domains, practical exercises, and the journal. Nothing to install.
          </p>
          <div className="ic-cta-row justify-center pt-1">
            <Link href="/domains" className="ic-btn-primary text-[0.62rem]">
              Explore the domains
            </Link>
            <Link href="/blog" className="ic-btn-ghost text-[0.6rem]">
              Read the journal
            </Link>
          </div>
        </section>
      </div>
    </PageShell>
  );
}
