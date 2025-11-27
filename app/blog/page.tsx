
import Link from 'next/link';
import { getAllPosts } from '@/lib/blog';


export const metadata = {
  title: 'Iron Compass Journal',
  description: 'The official Iron Compass blog. Insights, guides, and stories on discipline, purpose, strength, and more.',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <main className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="heading-font text-3xl font-bold mb-4 text-ic-text tracking-widest">Iron Compass Journal</h1>
      <p className="text-icMuted mb-8">Insights, guides, and stories on discipline, purpose, strength, and more. Explore the latest from Iron Compass.</p>
      <div className="flex flex-wrap gap-4 mb-8">
        <Link href="/domains/discipline" className="heading-font text-icRed hover:underline underline-offset-4 font-bold">Explore Discipline & Mindset</Link>
        <Link href="/" className="heading-font text-icRed hover:underline underline-offset-4 font-bold">Back to Home</Link>
      </div>
      <ul className="space-y-8">
        {posts.map((post) => (
          <li key={post.slug} className="border-b border-icCard pb-6">
            <h2 className="heading-font text-lg font-bold mb-1 text-ic-text">
              <Link href={`/blog/${post.slug}`} className="hover:underline text-icRed">
                {post.title}
              </Link>
            </h2>
            <p className="text-icMuted text-sm mb-1">{post.date}</p>
            {post.description && (
              <p className="text-icMuted mb-2">{post.description}</p>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
