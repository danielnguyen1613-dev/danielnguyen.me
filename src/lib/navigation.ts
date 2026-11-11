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
  | "education"
  | "experience"
  | "blog"
  | "contact";

export type NavItem = {
  id: SectionId;
  labelKey: SectionId;
  icon: LucideIcon;
};

export const sectionNavItems: NavItem[] = [
  { id: "home", labelKey: "home", icon: Home },
  { id: "about", labelKey: "about", icon: User },
  { id: "education", labelKey: "education", icon: GraduationCap },
  { id: "experience", labelKey: "experience", icon: Briefcase },
  { id: "blog", labelKey: "blog", icon: BookOpen },
  { id: "contact", labelKey: "contact", icon: Mail },
];

/** URL hashes — BreezyCV-style (`#about-me`, …). */
export const sectionHashById: Record<SectionId, string> = {
  home: "home",
  about: "about-me",
  education: "education",
  experience: "experience",
  blog: "blog",
  contact: "contact",
};

const sectionIdByHash = Object.fromEntries(
  Object.entries(sectionHashById).map(([id, hash]) => [hash, id]),
) as Record<string, SectionId>;

export function getHashForSection(id: SectionId) {
  return `#${sectionHashById[id]}`;
}

export function getSectionIdFromHash(hash: string): SectionId {
  const raw = hash.replace(/^#/, "").trim().toLowerCase();
  if (!raw) return "home";
  // Accept both `#about-me` and `#about`.
  if (raw === "about") return "about";
  return sectionIdByHash[raw] ?? "home";
}

export function readSectionFromLocation(fallback: SectionId = "home"): SectionId {
  if (typeof window === "undefined") return fallback;
  return getSectionIdFromHash(window.location.hash);
}

export function writeSectionHash(id: SectionId) {
  if (typeof window === "undefined") return;
  const nextHash = getHashForSection(id);
  if (window.location.hash === nextHash) return;
  // Keep pathname + search (e.g. ?category=) when only the section hash changes.
  const nextUrl = `${window.location.pathname}${window.location.search}${nextHash}`;
  window.history.pushState(null, "", nextUrl);
}

export function getSectionIndex(id: SectionId) {
  return sectionNavItems.findIndex((item) => item.id === id);
}

export function getAdjacentSection(
  id: SectionId,
  direction: -1 | 1,
): SectionId {
  const index = getSectionIndex(id);
  const nextIndex = Math.min(
    sectionNavItems.length - 1,
    Math.max(0, index + direction),
  );
  return sectionNavItems[nextIndex]?.id ?? id;
}
