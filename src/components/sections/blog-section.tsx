import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { BlogList } from "@/components/blog/blog-list";
import { SectionHeading } from "@/components/section-heading";
import { PortfolioFlipGrid } from "@/components/sections/portfolio/portfolio-flip-grid";
import { getAllPosts, getCategories } from "@/lib/blog";
import { formatCategoryLabel } from "@/lib/blog/format";
import { getHashForSection } from "@/lib/navigation";
import { cn } from "@/lib/utils";

type BlogSectionProps = {
  searchParams: Promise<{ blog?: string | string[] }>;
};

function resolveBlogCategory(
  value: string | string[] | undefined,
  categories: string[],
) {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw) return undefined;
  return categories.includes(raw) ? raw : undefined;
}

function blogSectionHref(category?: string) {
  const hash = getHashForSection("blog");
  if (!category) return `/${hash}`;
  return `/?blog=${encodeURIComponent(category)}${hash}`;
}

export async function BlogSection({ searchParams }: BlogSectionProps) {
  const t = await getTranslations("Blog");
  const posts = getAllPosts();
  const categories = getCategories();
  const params = await searchParams;
  const activeCategory = resolveBlogCategory(params.blog, categories);
  const allLabel = t("filterAll");

  return (
    <section className="flex flex-col gap-8 py-4 mt-8">
      <div>
        <SectionHeading
          lead={t("title")}
          className="text-3xl sm:text-3xl font-bold"
        />
      </div>

      <div className="space-y-6">
        {categories.length > 0 ? (
          <nav aria-label="Blog filters">
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
              {[allLabel, ...categories].map((filter) => {
                const category = filter === allLabel ? undefined : filter;
                const isActive =
                  category === undefined
                    ? !activeCategory
                    : activeCategory === category;

                return (
                  <li key={filter}>
                    <Link
                      href={blogSectionHref(category)}
                      scroll={false}
                      className={cn(
                        "transition-colors",
                        isActive
                          ? "font-medium text-surface-foreground"
                          : "text-surface-foreground/45 hover:text-surface-foreground/75",
                      )}
                    >
                      {category ? formatCategoryLabel(category) : filter}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        ) : null}

        <PortfolioFlipGrid activeCategory={activeCategory}>
          <BlogList posts={posts} emptyMessage={t("empty")} />
        </PortfolioFlipGrid>
      </div>
    </section>
  );
}
