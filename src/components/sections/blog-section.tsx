import { getTranslations } from "next-intl/server";
import { BlogCard } from "@/components/sections/blog-card";
import { SectionHeader } from "@/components/sections/section-header";

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
      <SectionHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        intro={t("intro")}
      />

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
