
import "./globals.css";
import "../styles/iron-compass.css";
import "../styles/ic-system.css";
import "../styles/board.css";
import "../styles/app-theme.css";
import "../styles/site-layout.css";
import "../styles/editorial.css";
import "../styles/semantic-actions.css";
import "../styles/public-editorial.css";
import type { Metadata } from "next";
import { Montserrat, Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { DEFAULT_OG_IMAGE, ORGANIZATION_LOGO, SITE_NAME, SITE_URL, serializeJsonLd } from "@/lib/site";

// Font setup
const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-heading',
  display: 'swap',
});
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-body',
  display: 'swap',
});

// SEO metadata for the site
const siteTitle = `${SITE_NAME} — Habit and Discipline App for Men`;
const siteDescription =
  "Build daily discipline around the responsibilities you carry. Habits, a journal, practical Stoic guides and AI coaching across ten life domains.";

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: 'website',
    images: [DEFAULT_OG_IMAGE],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: [DEFAULT_OG_IMAGE],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`h-full ${montserrat.variable} ${inter.variable}`}>
      <body className="antialiased">
        <script
          id="ld-website-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": `${SITE_URL}/#website`,
                  name: siteTitle,
                  url: SITE_URL,
                  description: siteDescription,
                },
                {
                  "@type": "Organization",
                  "@id": `${SITE_URL}/#organization`,
                  name: SITE_NAME,
                  url: SITE_URL,
                  logo: ORGANIZATION_LOGO,
                  image: DEFAULT_OG_IMAGE,
                  founder: { "@type": "Person", name: "Adam", jobTitle: "Founder" },
                },
              ],
            }),
          }}
        />
        <a className="ic-skip-link" href="#main-content">Skip to content</a>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
