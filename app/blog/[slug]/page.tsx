
import { getPostBySlug, getAllPosts } from '@/lib/blog';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';

type Props = { params: { slug: string } };


export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts
    .filter((post) => post.slug && typeof post.slug === 'string' && post.slug.trim() !== '')
    .map((post) => ({ slug: post.slug }));
}


export async function generateMetadata({ params }: Props) {
  const slug = params?.slug;
  if (!slug || typeof slug !== 'string') {
    return { title: 'Post Not Found', description: '' };
  }
  const post = getPostBySlug(slug);
  return {
    title: post.meta.title,
    description: post.meta.description || '',
  };
}


export default async function BlogPostPage({ params }: Props) {
  const slug = params?.slug;
  if (!slug || typeof slug !== 'string') {
    return (
      <main className="max-w-2xl mx-auto py-12 px-4">
        <h1 className="text-3xl font-extrabold mb-2">Post Not Found</h1>
        <nav className="mt-8 flex gap-4">
          <Link href="/blog" className="text-primary-400 hover:underline">&larr; Back to Blog</Link>
          <Link href="/" className="text-primary-400 hover:underline">Home</Link>
        </nav>
      </main>
    );
  }
  const post = getPostBySlug(slug);
  return (
    <main className="max-w-2xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-extrabold mb-2">{post.meta.title}</h1>
      <div className="flex items-center gap-4 text-gray-400 text-sm mb-6">
        <span>{post.meta.date}</span>
        {post.meta.category && (
          <span className="px-2 py-0.5 bg-gray-800 rounded text-xs font-medium">{post.meta.category}</span>
        )}
      </div>
      <article className="prose prose-invert">
        <MDXRemote source={post.content} components={{ Link }} />
      </article>
      <nav className="mt-8 flex gap-4">
        <Link href="/blog" className="text-primary-400 hover:underline">&larr; Back to Blog</Link>
        <Link href="/" className="text-primary-400 hover:underline">Home</Link>
      </nav>
    </main>
  );
}
