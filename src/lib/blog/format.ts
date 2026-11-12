import { getCategoryName } from "@/lib/blog/get-categories";

const displayDateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "2-digit",
  timeZone: "UTC",
});

/** Format an ISO date (YYYY-MM-DD) for display without local timezone shifts. */
export function formatBlogDate(date: string) {
  const [year, month, day] = date.split("-").map(Number);
  if (!year || !month || !day) return date;

  return displayDateFormatter.format(new Date(Date.UTC(year, month - 1, day)));
}

export function formatBlogTag(tag: string) {
  return tag.startsWith("#") ? tag : `#${tag}`;
}

export function formatCategoryLabel(category: string) {
  if (!category) return category;
  return getCategoryName(category);
}
