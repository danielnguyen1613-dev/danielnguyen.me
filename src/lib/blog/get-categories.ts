import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { parseBlogCategory } from "@/lib/blog/schema";
import { isSafeSegment } from "@/lib/blog/paths";
import type { BlogCategory } from "@/lib/blog/types";

export const CATEGORIES_DIR = path.join(process.cwd(), "src/data/categories");
const BLOG_ICON_BASE = "/images/blog";

function hashCategoryColor(slug: string) {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  }
  return `hsl(${hash % 360} 52% 38%)`;
}

function formatFallbackName(slug: string) {
  if (!slug) return slug;
  return slug.charAt(0).toUpperCase() + slug.slice(1);
}

function resolveCategoryIcon(icon: string) {
  if (
    icon.startsWith("/") ||
    icon.startsWith("http://") ||
    icon.startsWith("https://")
  ) {
    return icon;
  }
  return `${BLOG_ICON_BASE}/${icon}`;
}

function listCategoryFiles(): string[] {
  if (!existsSync(CATEGORIES_DIR)) return [];

  return readdirSync(CATEGORIES_DIR)
    .filter((file) => file.endsWith(".json") && !file.startsWith("."))
    .sort((a, b) => a.localeCompare(b));
}

function readCategoryFile(fileName: string): BlogCategory {
  const slug = fileName.replace(/\.json$/, "");

  if (!isSafeSegment(slug)) {
    throw new Error(
      `Invalid category slug "${slug}" in ${fileName}. Use kebab-case filenames.`,
    );
  }

  const filePath = path.join(CATEGORIES_DIR, fileName);
  const raw = JSON.parse(readFileSync(filePath, "utf8")) as unknown;
  const config = parseBlogCategory(raw, filePath);

  return {
    slug,
    name: config.name,
    icon: resolveCategoryIcon(config.icon),
    color: config.color,
    description: config.description,
  };
}

export function getCategories(): BlogCategory[] {
  return listCategoryFiles().map(readCategoryFile);
}

export function getCategorySlugs(): string[] {
  return getCategories().map((category) => category.slug);
}

export function getCategory(slug: string): BlogCategory | undefined {
  if (!isSafeSegment(slug)) return undefined;
  return getCategories().find((category) => category.slug === slug);
}

export function getCategoryColor(slug: string) {
  return getCategory(slug)?.color ?? hashCategoryColor(slug);
}

export function getCategoryName(slug: string) {
  return getCategory(slug)?.name ?? formatFallbackName(slug);
}
