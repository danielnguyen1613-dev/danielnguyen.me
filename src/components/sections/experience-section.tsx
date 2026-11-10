import { getTranslations } from "next-intl/server";
import { SectionHeader } from "@/components/sections/section-header";

type JobItem = {
  company: string;
  role: string;
  period: string;
  summary: string;
};

type ProjectItem = {
  name: string;
  stack: string;
  summary: string;
};

export async function ExperienceSection() {
  const t = await getTranslations("Experience");
  const jobs = t.raw("jobs") as JobItem[];
  const projects = t.raw("projects") as ProjectItem[];

  return (
    <section className="flex flex-col gap-10 py-2">
      <SectionHeader eyebrow={t("eyebrow")} title={t("title")} intro={t("intro")} />

      <div className="space-y-6">
        <h3 className="font-heading text-lg font-semibold text-surface-foreground">
          {t("jobsTitle")}
        </h3>
        <ul className="space-y-6">
          {jobs.map((job) => (
            <li key={`${job.company}-${job.role}`} className="space-y-1 border-l border-primary/40 pl-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-heading text-base font-semibold text-surface-foreground">
                  {job.role}
                </p>
                <p className="text-xs tracking-wide text-surface-foreground/50">
                  {job.period}
                </p>
              </div>
              <p className="text-sm text-primary">{job.company}</p>
              <p className="text-sm leading-relaxed text-surface-foreground/65">
                {job.summary}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-6">
        <h3 className="font-heading text-lg font-semibold text-surface-foreground">
          {t("projectsTitle")}
        </h3>
        <ul className="space-y-5">
          {projects.map((project) => (
            <li key={project.name} className="space-y-1">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <p className="font-heading text-base font-semibold text-surface-foreground">
                  {project.name}
                </p>
                <p className="text-xs tracking-wide text-surface-foreground/50">
                  {project.stack}
                </p>
              </div>
              <p className="text-sm leading-relaxed text-surface-foreground/65">
                {project.summary}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
