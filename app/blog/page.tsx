
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
      <h1 className="text-3xl font-extrabold mb-4">Iron Compass Journal</h1>
      <p className="text-gray-300 mb-8">Insights, guides, and stories on discipline, purpose, strength, and more. Explore the latest from Iron Compass.</p>
      <ul className="space-y-8">
        {posts.map((post) => (
          <li key={post.slug} className="border-b border-gray-800 pb-6">
            <h2 className="text-xl font-bold mb-1">
              <Link href={`/blog/${post.slug}`} className="hover:underline text-primary-400">
                {post.title}
              </Link>
            </h2>
            <p className="text-gray-400 text-sm mb-1">{post.date}</p>
            {post.description && (
              <p className="text-gray-300 mb-2">{post.description}</p>
            )}
          </li>
        ))}
      </ul>
    </main>
  );
}
