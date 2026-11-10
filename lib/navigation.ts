import {
  BookOpen,
  Briefcase,
  GraduationCap,
  Home,
  Mail,
  User,
  type LucideIcon,
} from "lucide-react";

export type SectionId =
  | "home"
  | "about"
  | "experience"
  | "projects"
  | "blog"
  | "contact";

export type NavItem = {
  id: SectionId;
  href: string;
  labelKey: SectionId;
  icon: LucideIcon;
};

export const sectionNavItems: NavItem[] = [
  { id: "home", href: "#home", labelKey: "home", icon: Home },
  { id: "about", href: "#about", labelKey: "about", icon: User },
  {
    id: "experience",
    href: "#experience",
    labelKey: "experience",
    icon: GraduationCap,
  },
  { id: "projects", href: "#projects", labelKey: "projects", icon: Briefcase },
  { id: "blog", href: "#blog", labelKey: "blog", icon: BookOpen },
  { id: "contact", href: "#contact", labelKey: "contact", icon: Mail },
];
