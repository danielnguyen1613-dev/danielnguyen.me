import { getTranslations } from "next-intl/server";
import { BlogList } from "@/components/blog/blog-list";
import { SectionHeading } from "@/components/section-heading";
import { getAllPosts } from "@/lib/blog";

export async function BlogSection() {
  const t = await getTranslations("Blog");
  const posts = getAllPosts();

  return (
    <section className="flex flex-col gap-10 py-2">
      <header className="space-y-3">
        <p className="text-sm font-medium tracking-wide text-primary">
          {t("eyebrow")}
        </p>
        <SectionHeading lead={t("title")} />
        <p className="max-w-2xl text-base leading-relaxed text-surface-foreground/65">
          {t("intro")}
        </p>
      </header>

      {posts.length > 0 ? (
        <BlogList posts={posts} emptyMessage={t("empty")} />
      ) : (
        <p className="text-sm text-surface-foreground/55">{t("empty")}</p>
      )}
    </section>
  );
}
