
import "./globals.css";
import "../styles/iron-compass.css";
import type { Metadata } from "next";
import Script from "next/script";
import { Oswald, Inter } from "next/font/google";
import Navbar from "./components/Navbar";

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
const siteTitle = 'Iron Compass';
const siteDescription = 'Rise Beyond Limits – Iron Compass: A life system for men.';
const siteUrl = 'https://ironcompassai.com';
const defaultOgImage = `${siteUrl}/iron-compass-logo.png`;

export const metadata: Metadata = {
  title: siteTitle,
  description: siteDescription,
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: siteUrl,
    siteName: siteTitle,
    type: 'website',
    images: [defaultOgImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: [defaultOgImage],
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
                  url: siteUrl,
                  description: siteDescription,
                  potentialAction: {
                    "@type": "SearchAction",
                    target: `${siteUrl}/blog?q={search_term_string}`,
                    "query-input": "required name=search_term_string",
                  },
                },
                {
                  "@type": "Organization",
                  name: siteTitle,
                  url: siteUrl,
                  logo: defaultOgImage,
                },
              ],
            }),
          }}
        />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
