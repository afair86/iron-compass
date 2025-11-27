

import './globals.css';
import type { Metadata } from 'next';
import { Oswald, Inter } from 'next/font/google';
import Header from './components/Header';

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
export const metadata: Metadata = {
  title: 'Iron Compass',
  description: 'Rise Beyond Limits – Iron Compass: A life system for men.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const currentYear = new Date().getFullYear();

  return (
    <html lang="en" className={`h-full ${oswald.variable} ${inter.variable}`}> 
      <body className="min-h-screen flex flex-col bg-ic-bg text-ic-text antialiased font-body">
        {/* Global Header */}
        <Header />

        {/* Main Content */}
        <main className="flex-1 container mx-auto px-4 py-8">
          {children}
        </main>

        {/* Site Footer */}
        <footer className="w-full border-t border-gray-800 py-4 text-center text-xs text-gray-400">
          © {currentYear} Iron Compass – Rise Beyond Limits
        </footer>
      </body>
    </html>
  );
}
