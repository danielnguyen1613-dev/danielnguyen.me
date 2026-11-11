"use client";

import {
  useEffect,
  useState,
  type ComponentProps,
  type ReactNode,
} from "react";
import Image from "next/image";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Globe,
  User,
  X,
} from "lucide-react";
import {
  DrawerClose,
  DrawerDescription,
  DrawerTitle,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import type { PortfolioProject } from "@/components/sections/portfolio/portfolio-projects";

export type PortfolioProjectDetailLabels = {
  close: string;
  previous: string;
  next: string;
  description: string;
  technology: string;
  share: string;
};

type PortfolioProjectDetailProps = {
  project: PortfolioProject;
  labels: PortfolioProjectDetailLabels;
  onPrevious: () => void;
  onNext: () => void;
};

const controlButtonClassName =
  "inline-flex size-10 items-center justify-center rounded-none border border-border/80 bg-foreground/5 text-surface-foreground transition-colors hover:bg-foreground/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-40";

function ControlButton({ className, ...props }: ComponentProps<"button">) {
  return (
    <button
      type="button"
      className={cn(controlButtonClassName, className)}
      {...props}
    />
  );
}

function SectionHeading({ children }: { children: ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <h3 className="shrink-0 font-heading text-base font-semibold text-surface-foreground">
        {children}
      </h3>
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

function ShareIconButton({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex size-9 items-center justify-center rounded-none border border-border/80 bg-foreground/5 text-surface-foreground/80 transition-colors hover:bg-foreground/10 hover:text-surface-foreground"
    >
      {children}
    </a>
  );
}

export function PortfolioProjectDetail({
  project,
  labels,
  onPrevious,
  onNext,
}: PortfolioProjectDetailProps) {
  const gallery =
    project.images && project.images.length > 0
      ? project.images
      : [project.image];
  const [activeImage, setActiveImage] = useState(0);
  const currentImage = gallery[Math.min(activeImage, gallery.length - 1)]!;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        onPrevious();
      }
      if (event.key === "ArrowRight") {
        event.preventDefault();
        onNext();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onNext, onPrevious]);

  const websiteHref =
    project.website && project.website !== "#"
      ? project.website
      : project.href !== "#"
        ? project.href
        : undefined;
  const websiteLabel = websiteHref
    ? websiteHref.replace(/^https?:\/\//, "").replace(/\/$/, "")
    : undefined;

  const shareTarget = websiteHref?.startsWith("http") ? websiteHref : "";

  return (
    <>
      <header className="mx-auto flex w-full max-w-6xl shrink-0 items-start justify-between gap-4 px-4 pt-5 sm:px-6 sm:pt-6 lg:px-8">
        <div className="min-w-0 space-y-1">
          <DrawerTitle className="font-heading text-2xl font-bold tracking-tight text-surface-foreground sm:text-3xl">
            {project.name}
          </DrawerTitle>
          <DrawerDescription className="sr-only">
            {project.summary ?? project.details ?? project.category}
          </DrawerDescription>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <ControlButton onClick={onPrevious} aria-label={labels.previous}>
            <ChevronLeft className="size-5" />
          </ControlButton>
          <ControlButton onClick={onNext} aria-label={labels.next}>
            <ChevronRight className="size-5" />
          </ControlButton>
          <DrawerClose
            className={controlButtonClassName}
            aria-label={labels.close}
          >
            <X className="size-5" />
          </DrawerClose>
        </div>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain px-4 pb-8 pt-5 sm:px-6 sm:pb-10 lg:px-8">
        <div className="mx-auto grid w-full max-w-6xl gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(260px,340px)] lg:items-start lg:gap-8">
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-foreground/10">
            <Image
              key={currentImage}
              src={currentImage}
              alt={project.name}
              fill
              sizes="(max-width: 1024px) 100vw, 70vw"
              className="object-cover"
              priority
            />

            {gallery.length > 1 ? (
              <div className="absolute bottom-3 right-3 flex items-center gap-1.5">
                {gallery.map((src, index) => (
                  <button
                    key={`${src}-${index}`}
                    type="button"
                    aria-label={`Image ${index + 1}`}
                    aria-current={index === activeImage}
                    onClick={() => setActiveImage(index)}
                    className={cn(
                      "size-2.5 rounded-full border border-surface-foreground/70 transition-colors",
                      index === activeImage
                        ? "bg-surface-foreground/80"
                        : "bg-transparent hover:bg-surface-foreground/40",
                    )}
                  />
                ))}
              </div>
            ) : null}
          </div>

          <aside className="rounded-sm bg-[#2a2a2a] p-5 text-surface-foreground sm:p-6">
            <div className="space-y-6">
              <section className="space-y-4">
                <SectionHeading>{labels.description}</SectionHeading>

                <ul className="space-y-2.5 text-sm text-surface-foreground/70">
                  {project.client ? (
                    <li className="flex items-center gap-3">
                      <User
                        className="size-4 shrink-0 text-emerald-500"
                        aria-hidden
                      />
                      <span>{project.client}</span>
                    </li>
                  ) : null}
                  {websiteHref && websiteLabel ? (
                    <li className="flex items-center gap-3">
                      <Globe
                        className="size-4 shrink-0 text-emerald-500"
                        aria-hidden
                      />
                      <a
                        href={websiteHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sky-400 transition-colors hover:text-sky-300"
                      >
                        {websiteLabel}
                      </a>
                    </li>
                  ) : null}
                  {project.date ? (
                    <li className="flex items-center gap-3">
                      <CalendarDays
                        className="size-4 shrink-0 text-emerald-500"
                        aria-hidden
                      />
                      <span>{project.date}</span>
                    </li>
                  ) : null}
                </ul>

                {project.details || project.summary ? (
                  <p className="text-sm leading-relaxed text-surface-foreground/65">
                    {project.details ?? project.summary}
                  </p>
                ) : null}
              </section>

              {project.technologies && project.technologies.length > 0 ? (
                <section className="space-y-3">
                  <SectionHeading>{labels.technology}</SectionHeading>
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

              <section className="space-y-3">
                <div className="flex flex-wrap items-center gap-3">
                  <div className="min-w-0 flex-1">
                    <SectionHeading>{labels.share}</SectionHeading>
                  </div>
                  <div className="flex items-center gap-2">
                    <ShareIconButton
                      href={
                        shareTarget
                          ? `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareTarget)}`
                          : "https://www.facebook.com/"
                      }
                      label="Facebook"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="size-3.5 fill-current"
                        aria-hidden
                      >
                        <path d="M14 8.5h2.5V5.5H14c-2.2 0-3.5 1.4-3.5 3.6V11H8.5v3H10.5V22h3.2v-8H16l.5-3h-2.8V9.3c0-.5.2-.8.8-.8z" />
                      </svg>
                    </ShareIconButton>
                    <ShareIconButton
                      href={
                        shareTarget
                          ? `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareTarget)}&text=${encodeURIComponent(project.name)}`
                          : "https://x.com/"
                      }
                      label="X"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="size-3.5 fill-current"
                        aria-hidden
                      >
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </ShareIconButton>
                    <ShareIconButton
                      href={
                        shareTarget
                          ? `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareTarget)}`
                          : "https://linkedin.com/"
                      }
                      label="LinkedIn"
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="size-3.5 fill-current"
                        aria-hidden
                      >
                        <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.24 8.25h4.52V24H.24V8.25zM8.34 8.25h4.33v2.14h.06c.6-1.14 2.08-2.34 4.28-2.34 4.58 0 5.42 3.01 5.42 6.93V24h-4.52v-7.75c0-1.85-.03-4.22-2.57-4.22-2.57 0-2.96 2.01-2.96 4.09V24H8.34V8.25z" />
                      </svg>
                    </ShareIconButton>
                  </div>
                </div>
              </section>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
