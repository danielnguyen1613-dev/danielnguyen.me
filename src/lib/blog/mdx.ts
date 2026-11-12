import type { MDXComponents } from "mdx/types";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "@/components/blog/mdx-components";
import { parseBlogFrontmatter } from "@/lib/blog/schema";
import type { BlogFrontmatter } from "@/lib/blog/schema";

type CompileBlogMdxOptions = {
  source: string;
  filePath: string;
  components?: MDXComponents;
};

export async function compileBlogMdx({
  source,
  filePath,
  components = mdxComponents,
}: CompileBlogMdxOptions) {
  const { content, frontmatter } = await compileMDX<Record<string, unknown>>({
    source,
    components,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypePrettyCode,
            {
              theme: "github-dark-dimmed",
              keepBackground: false,
            },
          ],
        ],
      },
    },
  });

  return {
    content,
    frontmatter: parseBlogFrontmatter(frontmatter, filePath) satisfies BlogFrontmatter,
  };
}
