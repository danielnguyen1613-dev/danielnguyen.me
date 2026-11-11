import { getTranslations } from "next-intl/server";
import { BlogCard } from "@/components/blog-card";
import { SectionHeading } from "@/components/section-heading";

type PostItem = {
  title: string;
  date: string;
  excerpt: string;
  tag: string;
  image: string;
};

export async function BlogSection() {
  const t = await getTranslations("Blog");
  const posts = t.raw("posts") as PostItem[];

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

      <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {posts.map((post) => (
          <li key={post.title} className="min-w-0">
            <BlogCard
              image={post.image}
              category={post.tag}
              date={post.date}
              title={post.title}
              imageAlt={post.title}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
