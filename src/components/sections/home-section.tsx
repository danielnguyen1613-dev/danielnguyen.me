import { ArrowRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { getHashForSection } from "@/lib/navigation";
import { getFeaturedProjects, projectHref } from "@/lib/projects";
import { cn } from "@/lib/utils";

type ProcessStep = {
  label: string;
  title: string;
  description: string;
};

export async function HomeSection() {
  const t = await getTranslations("Home");
  const stack = t.raw("stack") as string[];
  const projects = getFeaturedProjects(3);
  const processSteps = t.raw("howIWork.steps") as ProcessStep[];

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
            {stack.map((item) => (
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
            href={getHashForSection("workProjects")}
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

      <div
        aria-label={t("howIWork.title")}
        className="mt-2 flex flex-col gap-6"
      >
        <header className="max-w-3xl space-y-3">
          <SectionHeading
            as="h2"
            lead={t("howIWork.title")}
            className="text-xl sm:text-xl font-bold"
          />
          <p className="max-w-xl text-base leading-relaxed text-surface-foreground/50">
            {t("howIWork.intro")}
          </p>
        </header>

        <ol className="grid grid-cols-1 gap-y-8 md:grid-cols-4 md:gap-x-6 md:gap-y-0">
          {processSteps.map((step, index) => (
            <li
              key={step.label}
              className={cn(
                "group relative flex flex-col gap-12",
                "border-t border-surface-foreground/12 first:border-t-0 md:border-t-0",
                index > 0 &&
                  "md:before:absolute md:before:top-3 md:before:bottom-3 md:before:-left-3 md:before:w-px md:before:bg-surface-foreground/12",
              )}
            >
              <p
                className={cn(
                  "font-mono text-[12px] tracking-[0.14em] text-surface-foreground/50 uppercase sm:text-[13px]",
                  "transition-colors duration-300 ease-out",
                  "group-hover:text-surface-foreground/75",
                )}
              >
                {step.label}
              </p>

              <p className="max-w-[28ch] text-sm leading-relaxed text-surface-foreground/80">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
