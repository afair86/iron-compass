import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  return (
    <header className="w-full bg-gradient-to-b from-icBg/95 to-icSurface/90 border-b border-icCard/60 z-20 relative">
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-4 py-4" aria-label="Main navigation">
        {/* Logo + Wordmark */}
        <Link href="/" className="flex items-center gap-3 group" aria-label="Iron Compass Home">
          <span className="relative w-10 h-10 flex-shrink-0">
            <Image
              src="/iron-compass-logo.png"
              alt="Iron Compass Logo"
              fill
              sizes="40px"
              className="object-contain drop-shadow-lg"
              priority
            />
          </span>
          <span className="heading-font text-2xl md:text-3xl font-bold tracking-widest text-ic-text group-hover:text-ic-red transition-colors select-none">
            IRON <span className="text-icRed">COMPASS</span>
          </span>
        </Link>
        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-2 lg:gap-4 text-base font-medium items-center">
          <li>
            <Link href="/" className="px-3 py-2 rounded hover:text-ic-text hover:underline underline-offset-4 transition-colors text-ic-muted">Home</Link>
          </li>
          <li>
            <Link href="/about" className="px-3 py-2 rounded hover:text-ic-text hover:underline underline-offset-4 transition-colors text-ic-muted">About</Link>
          </li>
          <li>
            <Link href="/domains" className="px-3 py-2 rounded hover:text-ic-text hover:underline underline-offset-4 transition-colors text-ic-muted">Domains</Link>
          </li>
          <li>
            <Link href="/blog" className="px-3 py-2 rounded hover:text-ic-text hover:underline underline-offset-4 transition-colors text-ic-muted">Blog</Link>
          </li>
          <li>
            <Link href="/contact" className="px-3 py-2 rounded hover:text-ic-text hover:underline underline-offset-4 transition-colors text-ic-muted">Contact</Link>
          </li>
        </ul>
        {/* CTA Button */}
        <div className="hidden md:block ml-6">
          <Link href="/domains" className="heading-font text-base px-6 py-2 rounded-full bg-ic-red hover:bg-ic-redHover text-ic-text font-bold shadow-lg shadow-ic-redDark/40 transition-all">
            Start Your Rise
          </Link>
        </div>
        {/* TODO: Add mobile nav/hamburger here if needed */}
      </nav>
    </header>
  );
}
