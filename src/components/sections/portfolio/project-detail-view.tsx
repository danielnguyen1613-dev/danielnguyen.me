import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Globe,
  User,
} from "lucide-react";
import { SectionHeading } from "@/components/section-heading";
import { projectHref } from "@/lib/projects";
import type { Project } from "@/types/project";
import { cn } from "@/lib/utils";

const detailHeadingClassName = "text-base font-semibold sm:text-base";

export type ProjectDetailLabels = {
  back: string;
  previous: string;
  next: string;
  description: string;
  technology: string;
  liveDemo: string;
  github: string;
  overview: string;
  challenge: string;
  solution: string;
  features: string;
};

type ProjectDetailViewProps = {
  project: Project;
  previous: Project;
  next: Project;
  labels: ProjectDetailLabels;
};

function NavIconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="inline-flex size-10 items-center justify-center rounded-none border border-border/80 bg-surface-foreground/10 text-surface-foreground transition-colors hover:bg-surface-foreground/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
    >
      {children}
    </Link>
  );
}

export function ProjectDetailView({
  project,
  previous,
  next,
  labels,
}: ProjectDetailViewProps) {
  const liveHref = project.links?.live;
  const githubHref = project.links?.github;
  const websiteLabel = liveHref
    ? liveHref.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : undefined;

  const detailSections = [
    {
      key: "overview",
      label: labels.overview,
      body: project.details?.overview,
    },
    {
      key: "challenge",
      label: labels.challenge,
      body: project.details?.challenge,
    },
    {
      key: "solution",
      label: labels.solution,
      body: project.details?.solution,
    },
  ].filter((section) => Boolean(section.body));

  return (
    <article className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <header className="flex items-start justify-between gap-4">
        <div className="min-w-0 space-y-3">
          <Link
            href="/#experience"
            className="inline-flex h-10 items-center gap-1.5 rounded-none border border-border/80 bg-surface-foreground/10 px-3 text-sm text-surface-foreground transition-colors hover:bg-surface-foreground/15"
          >
            <ChevronLeft className="size-4" aria-hidden />
            {labels.back}
          </Link>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-surface-foreground sm:text-3xl mt-8">
            {project.title}
          </h1>
        </div>

        <nav
          aria-label="Project navigation"
          className="flex shrink-0 items-center gap-2"
        >
          <NavIconLink
            href={projectHref(previous.slug)}
            label={`${labels.previous}: ${previous.title}`}
          >
            <ChevronLeft className="size-5" />
          </NavIconLink>
          <NavIconLink
            href={projectHref(next.slug)}
            label={`${labels.next}: ${next.title}`}
          >
            <ChevronRight className="size-5" />
          </NavIconLink>
        </nav>
      </header>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(260px,300px)] lg:items-start lg:gap-6">
        <div className="flex min-w-0 flex-col gap-8">
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-foreground/10">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 1024px) 100vw, 70vw"
              className="object-cover"
              priority
            />
          </div>

          {detailSections.length > 0 || project.details?.features?.length ? (
            <div className="flex w-full flex-col gap-8 mt-8">
              {detailSections.map((section) => (
                <section key={section.key} className="space-y-3">
                  <SectionHeading
                    lead={section.label}
                    as="h3"
                    className={detailHeadingClassName}
                  />
                  <p className="text-sm leading-relaxed text-surface-foreground/70 sm:text-base">
                    {section.body}
                  </p>
                </section>
              ))}

              {project.details?.features &&
              project.details.features.length > 0 ? (
                <section className="space-y-3">
                  <SectionHeading
                    lead={labels.features}
                    as="h3"
                    className={detailHeadingClassName}
                  />
                  <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-surface-foreground/70 sm:text-base">
                    {project.details.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </section>
              ) : null}
            </div>
          ) : null}
        </div>

        <aside className="bg-surface-foreground/8 p-5 text-surface-foreground sm:p-6">
          <div className="space-y-6">
            <section className="space-y-4">
              <SectionHeading
                lead={labels.description}
                as="h3"
                className={detailHeadingClassName}
              />

              <ul className="space-y-2.5 text-sm text-surface-foreground/70">
                <li className="flex items-center gap-3">
                  <User
                    className="size-4 shrink-0 text-primary"
                    aria-hidden
                  />
                  <span>{project.role}</span>
                </li>
                {liveHref && websiteLabel ? (
                  <li className="flex items-center gap-3">
                    <Globe
                      className="size-4 shrink-0 text-primary"
                      aria-hidden
                    />
                    <a
                      href={liveHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sky-400 transition-colors hover:text-sky-300"
                    >
                      {websiteLabel}
                    </a>
                  </li>
                ) : null}
                <li className="flex items-center gap-3">
                  <CalendarDays
                    className="size-4 shrink-0 text-primary"
                    aria-hidden
                  />
                  <span>{project.year}</span>
                </li>
              </ul>

              <p className="text-sm leading-relaxed text-surface-foreground/65">
                {project.description}
              </p>
            </section>

            {project.technologies.length > 0 ? (
              <section className="space-y-3">
                <SectionHeading
                  lead={labels.technology}
                  as="h3"
                  className={detailHeadingClassName}
                />
                <ul className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-none border border-border/70 bg-surface-foreground/10 px-2.5 py-1 text-xs tracking-wide text-surface-foreground/75"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <section className="flex flex-col gap-2">
              {liveHref ? (
                <a
                  href={liveHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "inline-flex items-center justify-center gap-2 border border-primary bg-primary px-4 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
                  )}
                >
                  {labels.liveDemo}
                  <ArrowUpRight className="size-4" aria-hidden />
                </a>
              ) : null}
            </section>
          </div>
        </aside>
      </div>
    </article>
  );
}
