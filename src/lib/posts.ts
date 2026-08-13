import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { marked } from "marked";

/**
 * File-based blog.
 *
 * Posts are plain markdown in src/content/blog. Adding one file publishes the
 * post, adds it to the sitemap, and wires up its metadata -- which is what makes
 * the monthly content cadence sustainable without a CMS to pay for or secure.
 */

export type PostMeta = {
  slug: string;
  title: string;
  /** <title> tag. Falls back to `title` when omitted. */
  metaTitle?: string;
  description: string;
  date: string;
  updated?: string;
  /** The query this post is written to answer. */
  targetKeyword: string;
  category: string;
  readingTime: number;
};

export type Post = PostMeta & { html: string };

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

function readPost(fileName: string): Post {
  const slug = fileName.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(BLOG_DIR, fileName), "utf8");
  const { data, content } = matter(raw);

  const words = content.split(/\s+/).length;

  return {
    slug,
    title: data.title as string,
    metaTitle: data.metaTitle as string | undefined,
    description: data.description as string,
    date: data.date as string,
    updated: data.updated as string | undefined,
    targetKeyword: data.targetKeyword as string,
    category: (data.category as string) ?? "Guides",
    readingTime: Math.max(1, Math.round(words / 225)),
    html: marked.parse(content, { async: false }),
  };
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".md"))
    .map(readPost)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}
