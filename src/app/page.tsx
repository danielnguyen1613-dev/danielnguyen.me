import { HeroBackground } from "@/components/layout/hero-background";
import { PortfolioShell } from "@/components/layout/portfolio-shell";
import { ProfileSidebar } from "@/components/layout/profile-sidebar";
import { AboutSection } from "@/components/sections/about-section";
import { BlogSection } from "@/components/sections/blog-section";
import { EducationSection } from "@/components/sections/education-section";
import { HomeSection } from "@/components/sections/home-section";
import { WorkProjectsSection } from "@/components/sections/work-projects-section";

type HomePageProps = {
  searchParams: Promise<{ category?: string | string[] }>;
};

export default function HomePage({ searchParams }: HomePageProps) {
  return (
    <PortfolioShell
      heroBackground={<HeroBackground />}
      profile={<ProfileSidebar connected className="h-full w-full" />}
      profileCompact={<ProfileSidebar compact />}
      sections={{
        home: <HomeSection />,
        about: <AboutSection />,
        education: <EducationSection />,
        workProjects: <WorkProjectsSection searchParams={searchParams} />,
        blog: <BlogSection />,
      }}
    />
  );
}
