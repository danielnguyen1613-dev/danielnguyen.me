import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ProjectDetailView } from "@/components/sections/portfolio/project-detail-view";
import {
  getAdjacentProjects,
  getProjects,
} from "@/lib/projects";
import { siteConfig } from "@/lib/site";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getAdjacentProjects(slug)?.project;

  if (!project) {
    return {
      title: "Project not found",
    };
  }

  const title = `${project.title} | ${siteConfig.name}`;
  const description = project.description;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      images: [
        {
          url: project.image,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [project.image],
    },
  };
}

function ProjectDetailFallback() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <div className="h-10 w-40 animate-pulse bg-surface-foreground/10" />
      <div className="h-9 w-2/3 max-w-md animate-pulse bg-surface-foreground/10" />
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(260px,340px)] lg:gap-8">
        <div className="aspect-[16/10] w-full animate-pulse bg-surface-foreground/10" />
        <div className="min-h-64 animate-pulse bg-surface-foreground/10" />
      </div>
    </div>
  );
}

async function ProjectPageContent({ params }: ProjectPageProps) {
  const { slug } = await params;
  const result = getAdjacentProjects(slug);

  if (!result) notFound();

  const t = await getTranslations("Experience");
  const { project, previous, next } = result;

  return (
    <ProjectDetailView
      project={project}
      previous={previous}
      next={next}
      labels={{
        back: t("backLabel"),
        previous: t("previousLabel"),
        next: t("nextLabel"),
        description: t("descriptionLabel"),
        technology: t("technologyLabel"),
        liveDemo: t("liveDemoLabel"),
        github: t("githubLabel"),
        overview: t("overviewLabel"),
        challenge: t("challengeLabel"),
        solution: t("solutionLabel"),
        features: t("featuresLabel"),
      }}
    />
  );
}

export default function ProjectPage({ params }: ProjectPageProps) {
  return (
    <main className="min-h-dvh bg-surface text-surface-foreground">
      <Suspense fallback={<ProjectDetailFallback />}>
        <ProjectPageContent params={params} />
      </Suspense>
    </main>
  );
}
