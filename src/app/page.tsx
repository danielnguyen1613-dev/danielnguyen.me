import { HeroBackground } from "@/components/layout/hero-background";
import { PortfolioShell } from "@/components/layout/portfolio-shell";
import { ProfileSidebar } from "@/components/layout/profile-sidebar";
import { AboutSection } from "@/components/sections/about-section";
import { BlogSection } from "@/components/sections/blog-section";
import { ContactSection } from "@/components/sections/contact-section";
import { EducationSection } from "@/components/sections/education-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { HomeSection } from "@/components/sections/home-section";

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
        experience: <ExperienceSection searchParams={searchParams} />,
        blog: <BlogSection />,
        contact: <ContactSection />,
      }}
    />
  );
}
