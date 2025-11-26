import Link from 'next/link';

export default function FinancePage() {
  return (
    <main className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-center">Financial Power</h1>
      <p className="text-gray-300 mb-8 text-center">
        Achieve financial stability and growth. This page will soon feature tools and advice for building financial strength.
      </p>
      <nav className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
        <Link href="/domains" className="text-primary-400 hover:underline font-medium text-center">&larr; Back to Domains</Link>
        <Link href="/" className="text-primary-400 hover:underline font-medium text-center">Home</Link>
      </nav>
    </main>
  );
}
