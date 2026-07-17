
import "./globals.css";
import "../styles/iron-compass.css";
import type { Metadata } from "next";
import Script from "next/script";
import { Oswald, Inter } from "next/font/google";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { DEFAULT_OG_IMAGE, SITE_NAME, SITE_URL } from "@/lib/site";

// Font setup
const oswald = Oswald({
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
const siteTitle = `${SITE_NAME} — Life System for Disciplined Men`;
const siteDescription =
  "Discipline, strength, purpose, money, and AI leverage — a structured operating system for men 30–45. Built for the US, Europe, and Australia.";

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
    <html lang="en" className={`h-full ${oswald.variable} ${inter.variable}`}>
      <body className="antialiased">
        <Script
          id="ld-website-org"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  name: siteTitle,
                  url: SITE_URL,
                  description: siteDescription,
                },
                {
                  "@type": "Organization",
                  name: siteTitle,
                  url: SITE_URL,
                  logo: DEFAULT_OG_IMAGE,
                },
              ],
            }),
          }}
        />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
