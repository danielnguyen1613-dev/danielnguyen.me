import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { getCategorySlugs } from "@/lib/blog/get-categories";
import { BLOGS_DIR, isSafeSegment } from "@/lib/blog/paths";
import { parseBlogFrontmatter } from "@/lib/blog/schema";
import type { BlogPostMeta, BlogPostParams } from "@/lib/blog/types";

function listMdxFiles(category: string): string[] {
  const categoryDir = path.join(BLOGS_DIR, category);
  if (!existsSync(categoryDir)) return [];

  return readdirSync(categoryDir)
    .filter((file) => file.endsWith(".mdx") && !file.startsWith("."))
    .sort((a, b) => a.localeCompare(b));
}

function readPostMeta(category: string, fileName: string): BlogPostMeta {
  const slug = fileName.replace(/\.mdx$/, "");

  if (!isSafeSegment(slug)) {
    throw new Error(
      `Invalid blog slug "${slug}" in category "${category}". Use kebab-case filenames.`,
    );
  }

  const filePath = path.join(BLOGS_DIR, category, fileName);
  const raw = readFileSync(filePath, "utf8");
  const { data } = matter(raw);
  const frontmatter = parseBlogFrontmatter(data, filePath);

  return {
    ...frontmatter,
    category,
    slug,
  };
}

function compareByDateDesc(a: BlogPostMeta, b: BlogPostMeta) {
  // ISO date strings (YYYY-MM-DD) sort lexicographically without timezone drift.
  if (a.date === b.date) {
    return a.title.localeCompare(b.title);
  }
  return a.date < b.date ? 1 : -1;
}

export function getAllPosts(): BlogPostMeta[] {
  return getCategorySlugs()
    .flatMap((category) =>
      listMdxFiles(category).map((fileName) => readPostMeta(category, fileName)),
    )
    .sort(compareByDateDesc);
}

export function getPostsByCategory(category: string): BlogPostMeta[] {
  if (!isSafeSegment(category)) return [];

  const categories = getCategorySlugs();
  if (!categories.includes(category)) return [];

  return listMdxFiles(category)
    .map((fileName) => readPostMeta(category, fileName))
    .sort(compareByDateDesc);
}

export function getAllTags(posts: BlogPostMeta[] = getAllPosts()): string[] {
  const tags = new Set<string>();

  for (const post of posts) {
    for (const tag of post.tags) {
      tags.add(tag);
    }
  }

  return [...tags].sort((a, b) => a.localeCompare(b));
}

export function getPostParams(): BlogPostParams[] {
  return getAllPosts().map(({ category, slug }) => ({ category, slug }));
}

export function filterPosts(
  posts: BlogPostMeta[],
  {
    category,
    tag,
    query,
  }: {
    category?: string;
    tag?: string;
    query?: string;
  },
): BlogPostMeta[] {
  const normalizedQuery = query?.trim().toLowerCase();

  return posts.filter((post) => {
    if (category && post.category !== category) return false;
    if (tag && !post.tags.some((item) => item.toLowerCase() === tag.toLowerCase())) {
      return false;
    }
    if (!normalizedQuery) return true;

    const haystack = [
      post.title,
      post.description ?? "",
      post.thumbnailText ?? "",
      post.category,
      ...post.tags,
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(normalizedQuery);
  });
}
