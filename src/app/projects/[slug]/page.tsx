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

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const result = getAdjacentProjects(slug);

  if (!result) notFound();

  const t = await getTranslations("Experience");
  const { project, previous, next } = result;

  return (
    <main className="min-h-dvh bg-surface text-surface-foreground">
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
    </main>
  );
}
