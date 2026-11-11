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
import { projectHref } from "@/lib/projects";
import type { Project } from "@/types/project";
import { cn } from "@/lib/utils";

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

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <h2 className="shrink-0 font-heading text-base font-semibold text-surface-foreground">
        {children}
      </h2>
      <span
        aria-hidden
        className="h-px min-w-8 flex-1 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle, color-mix(in srgb, var(--surface-foreground) 55%, transparent) 1px, transparent 1px)",
          backgroundSize: "6px 1px",
          backgroundRepeat: "repeat-x",
          backgroundPosition: "center",
        }}
      />
    </div>
  );
}

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
      className="inline-flex size-10 items-center justify-center rounded-none border border-border/80 bg-foreground/5 text-surface-foreground transition-colors hover:bg-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50"
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
    <article className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <header className="flex items-start justify-between gap-4">
        <div className="min-w-0 space-y-3">
          <Link
            href="/#experience"
            className="inline-flex items-center gap-1.5 text-sm text-surface-foreground/60 transition-colors hover:text-surface-foreground"
          >
            <ChevronLeft className="size-4" aria-hidden />
            {labels.back}
          </Link>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-surface-foreground sm:text-3xl">
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

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(260px,340px)] lg:items-start lg:gap-8">
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

        <aside className="rounded-sm bg-[#2a2a2a] p-5 text-surface-foreground sm:p-6">
          <div className="space-y-6">
            <section className="space-y-4">
              <SectionLabel>{labels.description}</SectionLabel>

              <ul className="space-y-2.5 text-sm text-surface-foreground/70">
                <li className="flex items-center gap-3">
                  <User
                    className="size-4 shrink-0 text-emerald-500"
                    aria-hidden
                  />
                  <span>{project.role}</span>
                </li>
                {liveHref && websiteLabel ? (
                  <li className="flex items-center gap-3">
                    <Globe
                      className="size-4 shrink-0 text-emerald-500"
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
                    className="size-4 shrink-0 text-emerald-500"
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
                <SectionLabel>{labels.technology}</SectionLabel>
                <ul className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <li
                      key={tech}
                      className="rounded-none border border-border/70 bg-[#222222] px-2.5 py-1 text-xs tracking-wide text-surface-foreground/75"
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
                    "inline-flex items-center justify-center gap-2 border border-border/80 bg-foreground/5 px-4 py-2.5 text-sm font-medium text-surface-foreground transition-colors hover:bg-foreground/10",
                  )}
                >
                  {labels.liveDemo}
                  <ArrowUpRight className="size-4" aria-hidden />
                </a>
              ) : null}
              {githubHref ? (
                <a
                  href={githubHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-border/80 bg-transparent px-4 py-2.5 text-sm font-medium text-surface-foreground/80 transition-colors hover:bg-foreground/5 hover:text-surface-foreground"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="size-4 fill-current"
                    aria-hidden
                  >
                    <path d="M12 .3a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.02c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.2.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.81 1.1.81 2.23v3.3c0 .32.22.7.82.58A12 12 0 0 0 12 .3z" />
                  </svg>
                  {labels.github}
                </a>
              ) : null}
            </section>
          </div>
        </aside>
      </div>

      {detailSections.length > 0 || project.details?.features?.length ? (
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
          {detailSections.map((section) => (
            <section key={section.key} className="space-y-3">
              <SectionLabel>{section.label}</SectionLabel>
              <p className="text-sm leading-relaxed text-surface-foreground/70 sm:text-base">
                {section.body}
              </p>
            </section>
          ))}

          {project.details?.features && project.details.features.length > 0 ? (
            <section className="space-y-3">
              <SectionLabel>{labels.features}</SectionLabel>
              <ul className="list-disc space-y-2 pl-5 text-sm leading-relaxed text-surface-foreground/70 sm:text-base">
                {project.details.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      ) : null}

      <footer className="flex flex-col gap-3 border-t border-border/60 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href={projectHref(previous.slug)}
          className="group inline-flex min-w-0 items-center gap-2 text-sm text-surface-foreground/70 transition-colors hover:text-surface-foreground"
        >
          <ChevronLeft className="size-4 shrink-0" aria-hidden />
          <span className="truncate">
            <span className="block text-xs text-surface-foreground/45">
              {labels.previous}
            </span>
            {previous.title}
          </span>
        </Link>
        <Link
          href={projectHref(next.slug)}
          className="group inline-flex min-w-0 items-center justify-end gap-2 text-right text-sm text-surface-foreground/70 transition-colors hover:text-surface-foreground sm:ml-auto"
        >
          <span className="truncate">
            <span className="block text-xs text-surface-foreground/45">
              {labels.next}
            </span>
            {next.title}
          </span>
          <ChevronRight className="size-4 shrink-0" aria-hidden />
        </Link>
      </footer>
    </article>
  );
}
