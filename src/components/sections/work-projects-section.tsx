import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { ProjectCard } from "@/components/project-card";
import { PortfolioFlipGrid } from "@/components/sections/portfolio/portfolio-flip-grid";
import { SectionHeading } from "@/components/section-heading";
import { getHashForSection } from "@/lib/navigation";
import { getProjects, projectHref } from "@/lib/projects";
import { cn } from "@/lib/utils";

type WorkProjectsSectionProps = {
  searchParams: Promise<{ category?: string | string[] }>;
};

function resolveCategory(
  value: string | string[] | undefined,
  filters: string[],
) {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw) return undefined;
  return filters.includes(raw) ? raw : undefined;
}

function portfolioHref(category?: string) {
  const hash = getHashForSection("workProjects");
  if (!category) return `/${hash}`;
  return `/?category=${encodeURIComponent(category)}${hash}`;
}

export async function WorkProjectsSection({
  searchParams,
}: WorkProjectsSectionProps) {
  const t = await getTranslations("WorkProjects");
  const filters = t.raw("filters") as string[];
  const projects = getProjects();
  const params = await searchParams;
  const activeCategory = resolveCategory(params.category, filters);
  const allLabel = t("filterAll");

  return (
    <section className="flex flex-col gap-8 py-4 mt-8">
      <div>
        <SectionHeading
          lead={t("title")}
          accent={t("accent")}
          className="text-3xl sm:text-3xl font-bold"
        />
      </div>
      <div className="space-y-6">
        <nav aria-label="Portfolio filters">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            {[allLabel, ...filters].map((filter) => {
              const category = filter === allLabel ? undefined : filter;
              const isActive =
                category === undefined
                  ? !activeCategory
                  : activeCategory === category;

              return (
                <li key={filter}>
                  <Link
                    href={portfolioHref(category)}
                    scroll={false}
                    className={cn(
                      "transition-colors",
                      isActive
                        ? "font-medium text-surface-foreground"
                        : "text-surface-foreground/45 hover:text-surface-foreground/75",
                    )}
                  >
                    {filter}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <PortfolioFlipGrid activeCategory={activeCategory}>
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-y-8 lg:grid-cols-3">
            {projects.map((project) => (
              <li
                key={project.slug}
                data-flip-item
                data-flip-id={project.slug}
                data-category={project.category}
                className="min-w-0"
              >
                <ProjectCard
                  name={project.title}
                  image={project.image}
                  href={projectHref(project.slug)}
                />
              </li>
            ))}
          </ul>
        </PortfolioFlipGrid>
      </div>
    </section>
  );
}
