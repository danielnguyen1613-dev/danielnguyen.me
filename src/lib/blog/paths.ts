import path from "node:path";

export const BLOGS_DIR = path.join(process.cwd(), "blogs");

export function blogHref(category: string, slug: string) {
  return `/blog/${category}/${slug}`;
}

export function blogFilePath(category: string, slug: string) {
  return path.join(BLOGS_DIR, category, `${slug}.mdx`);
}

export function isSafeSegment(value: string) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/i.test(value);
}
