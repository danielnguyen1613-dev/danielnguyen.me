"use client";

import { cloneElement, isValidElement, type ReactElement } from "react";
import {
  usePortfolioProjects,
  type PortfolioProject,
} from "@/components/sections/portfolio/portfolio-projects";

type PortfolioProjectCardProps = {
  project: PortfolioProject;
  children: ReactElement<{ onSelect?: () => void }>;
};

export function PortfolioProjectCard({
  project,
  children,
}: PortfolioProjectCardProps) {
  const { openProject } = usePortfolioProjects();

  if (!isValidElement(children)) return null;

  return cloneElement(children, {
    onSelect: () => openProject(project),
  });
}
