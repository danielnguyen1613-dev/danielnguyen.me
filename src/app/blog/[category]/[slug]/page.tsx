import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { BlogContent } from "@/components/blog/blog-content";
import { BlogHeader } from "@/components/blog/blog-header";
import { getPost, getPostParams } from "@/lib/blog";
import { blogHref } from "@/lib/blog/paths";
import { siteConfig } from "@/lib/site";

type BlogPostPageProps = {
  params: Promise<{ category: string; slug: string }>;
};

export function generateStaticParams() {
  return getPostParams();
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const post = await getPost(category, slug);

  if (!post) {
    return {
      title: "Post not found",
    };
  }

  const title = `${post.title} | ${siteConfig.name}`;
  const description =
    post.description ?? `${post.title} — notes by ${post.author}.`;
  const url = blogHref(post.category, post.slug);

  return {
    title,
    description,
    authors: [{ name: post.author }],
    keywords: post.tags,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url,
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { category, slug } = await params;
  const post = await getPost(category, slug);

  if (!post) notFound();

  const t = await getTranslations("Blog");

  return (
    <main className="min-h-dvh bg-surface text-surface-foreground">
      <article className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <Link
          href="/#blog"
          className="inline-flex h-10 w-fit items-center gap-1.5 rounded-none border border-border/80 bg-surface-foreground/10 px-3 text-sm text-surface-foreground transition-colors hover:bg-surface-foreground/15"
        >
          <ChevronLeft className="size-4" aria-hidden />
          {t("back")}
        </Link>

        <BlogHeader post={post} />
        <BlogContent>{post.content}</BlogContent>
      </article>
    </main>
  );
}
