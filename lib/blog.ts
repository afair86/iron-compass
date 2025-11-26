
// lib/blog.ts
// Blog helper utilities for Iron Compass
// Reads MDX files from /content/blog and provides functions to get post metadata and content.

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

// TypeScript type for blog post metadata (frontmatter)
export type PostMeta = {
  slug: string;         // URL-friendly identifier for the post
  title: string;        // Post title
  date: string;         // Publication date (YYYY-MM-DD)
  category?: string;    // Optional category/tag
  description?: string; // Optional summary for SEO and previews
};

// Directory where blog posts are stored
const postsDirectory = path.join(process.cwd(), 'content', 'blog');

/**
 * Reads all .mdx files in /content/blog, parses their frontmatter,
 * and returns an array of PostMeta sorted by date (newest first).
 */
export function getAllPosts(): PostMeta[] {
  // Get all files in the blog directory
  const fileNames = fs.readdirSync(postsDirectory);

  // Filter for .mdx files only
  const mdxFiles = fileNames.filter((file) => file.endsWith('.mdx'));

  // Map each file to its PostMeta, filter out posts with missing title or date
  const posts = mdxFiles.map((fileName) => {
    const slug = fileName.replace(/\.mdx$/, '');
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);
    if (!data.title || !data.date) return undefined;
    const meta: PostMeta = {
      slug,
      title: data.title,
      date: data.date,
      category: data.category,
    };
    if (data.description) meta.description = data.description;
    return meta;
  }).filter(Boolean) as PostMeta[];

  // Sort posts by date (newest first)
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

/**
 * Loads a single post by its slug.
 * Returns an object with { meta, content }.
 * - meta: PostMeta (frontmatter)
 * - content: string (MDX content without frontmatter)
 */
export function getPostBySlug(slug: string): { meta: PostMeta; content: string } {
  const fullPath = path.join(postsDirectory, `${slug}.mdx`);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Blog post not found: ${slug}`);
  }
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  if (!data.title || !data.date) {
    throw new Error(`Blog post frontmatter missing title or date: ${slug}`);
  }
  const meta: PostMeta = {
    slug,
    title: data.title,
    date: data.date,
    category: data.category,
  };
  if (data.description) meta.description = data.description;
  return { meta, content };
}
