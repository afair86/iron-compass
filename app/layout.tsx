
import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';

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
  // Get the current year for the footer
  const currentYear = new Date().getFullYear();

  return (
    <html lang="en" className="h-full">
      <body className="min-h-screen flex flex-col bg-gray-950 text-gray-100 font-sans">
        {/* Site Header */}
        <header className="w-full border-b border-gray-800">
          <nav className="container mx-auto flex items-center justify-between px-4 py-4">
            {/* Logo */}
            <Link href="/" className="text-2xl font-bold tracking-wide">
              Iron Compass
            </Link>
            {/* Navigation Links */}
            <ul className="flex space-x-4 text-sm font-medium">
              <li>
                <Link href="/" className="hover:text-primary-400 transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary-400 transition-colors">About</Link>
              </li>
              <li>
                <Link href="/domains" className="hover:text-primary-400 transition-colors">Domains</Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-primary-400 transition-colors">Blog</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary-400 transition-colors">Contact</Link>
              </li>
            </ul>
          </nav>
        </header>

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
