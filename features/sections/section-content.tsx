"use client";

import type { ReactNode } from "react";
import type { SectionId } from "@/lib/navigation";
import { AboutSection } from "@/features/sections/about-section";
import { BlogSection } from "@/features/sections/blog-section";
import { ContactSection } from "@/features/sections/contact-section";
import { EducationSection } from "@/features/sections/education-section";
import { ExperienceSection } from "@/features/sections/experience-section";
import { HomeSection } from "@/features/sections/home-section";
import { SectionViewport } from "@/features/sections/section-viewport";

type SectionContentProps = {
  activeSection: SectionId;
  onNavigate: (id: SectionId) => void;
};

function renderSection(
  id: SectionId,
  onNavigate: (id: SectionId) => void,
): ReactNode {
  switch (id) {
    case "home":
      return <HomeSection onViewExperience={() => onNavigate("experience")} />;
    case "about":
      return <AboutSection />;
    case "education":
      return <EducationSection />;
    case "experience":
      return <ExperienceSection />;
    case "blog":
      return <BlogSection />;
    case "contact":
      return <ContactSection />;
    default:
      return null;
  }
}

export function SectionContent({
  activeSection,
  onNavigate,
}: SectionContentProps) {
  return (
    <SectionViewport
      sectionId={activeSection}
      renderSection={(id) => renderSection(id, onNavigate)}
    />
  );
}
