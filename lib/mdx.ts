import { MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';

export async function parseMDX(content: string): Promise<MDXRemoteSerializeResult> {
  return serialize(content, { parseFrontmatter: true });
}
