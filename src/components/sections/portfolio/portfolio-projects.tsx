"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  Drawer,
  DrawerContent,
} from "@/components/ui/drawer";
import {
  PortfolioProjectDetail,
  type PortfolioProjectDetailLabels,
} from "@/components/sections/portfolio/portfolio-project-detail";

export type PortfolioProject = {
  name: string;
  image: string;
  href: string;
  category: string;
  summary?: string;
  details?: string;
  client?: string;
  website?: string;
  date?: string;
  technologies?: string[];
  images?: string[];
};

type PortfolioProjectsContextValue = {
  openProject: (project: PortfolioProject) => void;
};

const PortfolioProjectsContext =
  createContext<PortfolioProjectsContextValue | null>(null);

export function usePortfolioProjects() {
  const context = useContext(PortfolioProjectsContext);
  if (!context) {
    throw new Error(
      "usePortfolioProjects must be used within PortfolioProjects.",
    );
  }
  return context;
}

type PortfolioProjectsProps = {
  children: ReactNode;
  projects: PortfolioProject[];
  activeCategory?: string;
  labels: PortfolioProjectDetailLabels;
};

export function PortfolioProjects({
  children,
  projects,
  activeCategory,
  labels,
}: PortfolioProjectsProps) {
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const visibleProjects = useMemo(
    () =>
      activeCategory
        ? projects.filter((project) => project.category === activeCategory)
        : projects,
    [projects, activeCategory],
  );

  const selected =
    selectedName == null
      ? null
      : (projects.find((project) => project.name === selectedName) ?? null);

  const navigate = useCallback(
    (direction: -1 | 1) => {
      if (!selectedName || visibleProjects.length === 0) return;

      const currentIndex = visibleProjects.findIndex(
        (project) => project.name === selectedName,
      );
      const fromIndex = currentIndex >= 0 ? currentIndex : 0;
      const nextIndex =
        (fromIndex + direction + visibleProjects.length) %
        visibleProjects.length;
      const nextProject = visibleProjects[nextIndex];
      if (nextProject) setSelectedName(nextProject.name);
    },
    [selectedName, visibleProjects],
  );

  return (
    <PortfolioProjectsContext.Provider
      value={{
        openProject: (project) => {
          setSelectedName(project.name);
          setOpen(true);
        },
      }}
    >
      {children}

      <Drawer
        open={open}
        onOpenChange={setOpen}
        onOpenChangeComplete={(nextOpen) => {
          if (!nextOpen) setSelectedName(null);
        }}
      >
        <DrawerContent className="inset-0 h-dvh max-h-dvh w-full max-w-none rounded-none border-0 bg-surface text-surface-foreground data-[swipe-direction=down]:rounded-none data-[swipe-axis=y]:[--drawer-content-max-height:100dvh] [--drawer-content-height:100dvh]">
          {selected ? (
            <PortfolioProjectDetail
              key={selected.name}
              project={selected}
              labels={labels}
              onPrevious={() => navigate(-1)}
              onNext={() => navigate(1)}
            />
          ) : null}
        </DrawerContent>
      </Drawer>
    </PortfolioProjectsContext.Provider>
  );
}
