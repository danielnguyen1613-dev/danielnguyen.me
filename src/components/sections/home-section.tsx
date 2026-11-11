import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { getHashForSection } from "@/lib/navigation";
import { getFeaturedProjects, projectHref } from "@/lib/projects";

export async function HomeSection() {
  const t = await getTranslations("Home");
  const stack = t.raw("stack") as string[];
  const projects = getFeaturedProjects(3);

  return (
    <section className="flex min-h-full flex-col justify-center gap-12 py-4">
      <div className="mt-8 space-y-8">
        <SectionHeading
          lead={t("title")}
          accent={t("accent")}
          className="text-3xl sm:text-3xl font-bold"
        />

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.8fr)_minmax(0,1fr)] lg:gap-12">
          <p className="text-base text-surface-foreground">
            {t.rich("bio", {
              hl: (chunks) => (
                <span className="text-primary">{chunks}</span>
              ),
            })}
          </p>

          <p className="flex flex-wrap content-start items-center gap-x-2.5 gap-y-1 text-sm leading-relaxed text-primary">
            {stack.map((item, index) => (
              <span key={item} className="inline-flex items-center gap-x-2">
                  <span
                    aria-hidden="true"
                    className="text-base leading-none text-surface-foreground/35"
                  >
                    ·
                  </span>
                {item}
              </span>
            ))}
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <SectionHeading
            lead={t("projectsTitle")}
            className="text-xl sm:text-xl font-bold"
          />
          <a
            href={getHashForSection("experience")}
            className="mt-2 inline-flex items-center gap-1.5 text-sm text-surface-foreground/55 transition-colors hover:text-primary"
          >
            {t("viewMore")}
            <ArrowRight className="size-4" strokeWidth={1.75} />
          </a>
        </div>

        <ul className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-6">
          {projects.map((project) => (
            <li key={project.slug} className="mt-4 min-w-0">
              <ProjectCard
                name={project.title}
                image={project.image}
                href={projectHref(project.slug)}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
