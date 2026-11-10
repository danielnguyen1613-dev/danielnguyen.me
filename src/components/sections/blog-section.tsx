import { getTranslations } from "next-intl/server";
import { SectionHeader } from "@/components/sections/section-header";

type PostItem = {
  title: string;
  date: string;
  excerpt: string;
  tag: string;
};

export async function BlogSection() {
  const t = await getTranslations("Blog");
  const posts = t.raw("posts") as PostItem[];

  return (
    <section className="flex flex-col gap-10 py-2">
      <SectionHeader eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />

      <ul className="space-y-6">
        {posts.map((post) => (
          <li
            key={post.title}
            className="space-y-2 border-b border-white/10 pb-6 last:border-b-0 last:pb-0"
          >
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="text-xs font-medium tracking-wide text-primary">
                {post.tag}
              </span>
              <span className="text-xs text-surface-foreground/45">{post.date}</span>
            </div>
            <h3 className="font-heading text-xl font-semibold text-surface-foreground">
              {post.title}
            </h3>
            <p className="max-w-2xl text-sm leading-relaxed text-surface-foreground/65">
              {post.excerpt}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
