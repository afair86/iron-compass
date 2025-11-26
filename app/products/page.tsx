export const metadata = {
  title: "Iron Compass Toolkits",
  description:
    "Digital toolkits and systems to help men build discipline, strength, purpose, and leadership. Calm, trustworthy, and built for long-term growth.",
};
import Link from 'next/link';

const products = [
  {
    name: 'Iron Compass Life OS',
    desc: 'A complete digital operating system for mastering every domain of your life. Track habits, goals, and progress in one place.',
  },
  {
    name: 'Daily Challenge Toolkit',
    desc: 'A set of daily challenges to build discipline, resilience, and momentum. Level up every day with actionable tasks.',
  },
  {
    name: 'Leadership & Character Pack',
    desc: 'Resources and exercises to help you lead with integrity and inspire those around you. Become a man of value.',
  },
  {
    name: 'Financial Strength Toolkit',
    desc: 'Tools and templates for building financial stability, tracking spending, and growing your wealth.',
  },
  {
    name: 'AI Advantage Toolkit',
    desc: 'Leverage AI to optimize your routines, learning, and productivity. Stay ahead in a rapidly changing world.',
  },
];

export default function ProductsPage() {
  return (
    <main className="max-w-4xl mx-auto py-12 px-4">
      {/* Page Title */}
      <h1 className="text-3xl md:text-4xl font-extrabold mb-6 text-center">Iron Compass Toolkits</h1>
      <p className="text-gray-300 mb-10 text-center max-w-2xl mx-auto">
        Iron Compass toolkits are digital resources designed for men who want to build discipline, strength, purpose, leadership, and financial stability. Each toolkit is part of a long-term system—not a quick fix or hype. Our products are crafted to support your growth in every domain, with clarity and integrity.
      </p>

      {/* Products Grid */}
      <section>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <div key={product.name} className="bg-gray-900 rounded-lg p-6 border border-gray-800 shadow flex flex-col justify-between">
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-400 mb-4">{product.desc}</p>
              <span className="inline-block bg-yellow-700 text-yellow-200 text-xs font-bold px-3 py-1 rounded self-start">Coming soon</span>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center mt-12 flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/" className="text-primary-400 hover:underline font-medium">&larr; Home</Link>
        <Link href="/blog" className="text-primary-400 hover:underline font-medium">Go to Blog &rarr;</Link>
      </section>
    </main>
  );
}
