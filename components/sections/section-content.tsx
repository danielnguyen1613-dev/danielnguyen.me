"use client";

import type { ReactNode } from "react";
import type { SectionId } from "@/components/sections/navigation";
import { AboutSection } from "@/components/sections/about-section";
import { BlogSection } from "@/components/sections/blog-section";
import { ContactSection } from "@/components/sections/contact-section";
import { EducationSection } from "@/components/sections/education-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { HomeSection } from "@/components/sections/home-section";
import { SectionViewport } from "@/components/sections/section-viewport";

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
