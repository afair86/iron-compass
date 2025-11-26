import Link from 'next/link';

export default function LeadershipPage() {
  return (
    <main className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-center">Leadership &amp; Character</h1>
      <p className="text-gray-300 mb-8 text-center">
        Lead with integrity and inspire others. This page will soon feature resources for building leadership skills and strong character.
      </p>
      <nav className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
        <Link href="/domains" className="text-primary-400 hover:underline font-medium text-center">&larr; Back to Domains</Link>
        <Link href="/" className="text-primary-400 hover:underline font-medium text-center">Home</Link>
      </nav>
    </main>
  );
}
