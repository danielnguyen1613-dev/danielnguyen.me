import { readFileSync } from "node:fs";
import { cacheLife, cacheTag } from "next/cache";
import { compileBlogMdx } from "@/lib/blog/mdx";
import { blogFilePath, isSafeSegment } from "@/lib/blog/paths";
import type { BlogPost } from "@/lib/blog/types";

export async function getPost(
  category: string,
  slug: string,
): Promise<BlogPost | null> {
  "use cache";
  cacheTag(`blog:${category}:${slug}`);
  cacheLife("max");

  if (!isSafeSegment(category) || !isSafeSegment(slug)) {
    return null;
  }

  const filePath = blogFilePath(category, slug);
  let source: string;

  try {
    source = readFileSync(filePath, "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return null;
    }
    throw error;
  }

  const { content, frontmatter } = await compileBlogMdx({
    source,
    filePath,
  });

  return {
    ...frontmatter,
    category,
    slug,
    content,
  };
}
