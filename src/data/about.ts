import { siteConfig } from "@/lib/site";

export type PersonalInfoItem = {
  label: string;
  value: string;
  href?: string;
};

export type ExperienceItem = {
  period: string;
  title: string;
  company: string;
  description?: string | string[];
};

export type EducationItem = {
  year: string;
  degree: string;
  institution: string;
  gpa: string;
};

export type Skill = {
  name: string;
  level: number;
};

export type SkillGroup = {
  title: string;
  skills: Skill[];
};

export const personalInfo: PersonalInfoItem[] = [
  { label: "Experience", value: "6+ Years" },
  { label: "Location", value: "Vietnam" },
  { label: "Role", value: "Full-Stack / AI Engineer" },
  {
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    label: "Phone",
    value: "+84 389 047 082",
    href: "tel:+84389047082",
  },
];

export const experience: ExperienceItem[] = [
  {
    period: "2026 — Present",
    title: "Full-Stack Engineer",
    company: "Green Garden · Freelance",
    description:
      "Building and evolving a full-stack e-commerce product from the ground up, covering the customer experience, internal operations, backend systems, and AI-powered features.",
  },
  {
    period: "2025 — 2026",
    title: "Full-Stack Engineer",
    company: "WAS Insurance · Freelance",
    description:
      "Worked closely with business stakeholders to turn product requirements into production-ready web experiences and internal tools.",
  },
  {
    period: "2020 — 2025",
    title: "Senior Fullstack Developer",
    company: "TPS · KIC Automation Testing Platform",
    description:
      "Built and evolved a scalable automation testing platform used for test execution, monitoring, and result analysis.",
  },
  {
    period: "2020",
    title: "Frontend Developer",
    company: "TPS · PV Coating",
    description:
      "Developed and maintained web interfaces for internal business applications, focusing on reusable components, responsive experiences, and reliable interaction with backend services.",
  },
];

export const education: EducationItem[] = [
  {
    year: "2016 — 2020",
    degree: "Bachelor of Software Engineering",
    institution: "Nong Lam University",
    gpa: "3.34 / 4.0",
  },
];

export type Certificate = {
  title: string;
  issuer: string;
  mark: string[];
  summary?: string;
};

export const certificates: Certificate[] = [
  {
    title: "Webflow Certification",
    issuer: "Webflow",
    mark: ["WEBFLOW"],
    summary: "Professional certification",
  },
  {
    title: "Epic React",
    issuer: "Kent C. Dodds",
    mark: ["EPIC", "REACT"],
    summary: "Advanced React training focused on modern React development.",
  },
  {
    title: "UI/UX Digital Product Design",
    issuer: "Key Frame",
    mark: ["KEY", "FRAME"],
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    skills: [
      { name: "React / Next.js", level: 95 },
      { name: "TypeScript / JavaScript", level: 90 },
      { name: "Redux / Saga", level: 85 },
      { name: "TanStack Query", level: 88 },
      { name: "REST APIs", level: 90 },
      { name: "Tailwind CSS", level: 88 },
      { name: "Material UI", level: 82 },
      { name: "shadcn/ui", level: 85 },
    ],
  },
  {
    title: "Backend & Database",
    skills: [
      { name: "Python / FastAPI", level: 80 },
      { name: "PostgreSQL", level: 82 },
      { name: "SQLAlchemy", level: 78 },
      { name: "Alembic", level: 75 },
    ],
  },
  {
    title: "AI / RAG",
    skills: [{ name: "AI / RAG", level: 80 }],
  },
];
