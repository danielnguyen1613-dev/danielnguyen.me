import { readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import type { Project } from "@/types/project";

const PROJECTS_DIR = path.join(process.cwd(), "src/data/projects");

function readProjectFile(fileName: string): Project {
  const filePath = path.join(PROJECTS_DIR, fileName);
  const raw = readFileSync(filePath, "utf8");
  return JSON.parse(raw) as Project;
}

export function projectHref(slug: string) {
  return `/projects/${slug}`;
}

export function getProjects(): Project[] {
  const files = readdirSync(PROJECTS_DIR).filter((file) =>
    file.endsWith(".json"),
  );

  return files
    .map(readProjectFile)
    .sort((a, b) => {
      const orderA = a.order ?? Number.MAX_SAFE_INTEGER;
      const orderB = b.order ?? Number.MAX_SAFE_INTEGER;
      if (orderA !== orderB) return orderA - orderB;
      return a.title.localeCompare(b.title);
    });
}

export function getProjectBySlug(slug: string): Project | undefined {
  return getProjects().find((project) => project.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const projects = getProjects();
  const index = projects.findIndex((project) => project.slug === slug);
  if (index < 0) return null;

  const project = projects[index]!;
  const previous = projects[(index - 1 + projects.length) % projects.length]!;
  const next = projects[(index + 1) % projects.length]!;

  return { project, previous, next, index };
}

export function getFeaturedProjects(limit = 3): Project[] {
  const projects = getProjects();
  const featured = projects.filter((project) => project.featured);
  return (featured.length > 0 ? featured : projects).slice(0, limit);
}

export function getProjectCategories(projects: Project[] = getProjects()) {
  return [...new Set(projects.map((project) => project.category))];
}
