import { z } from "zod";

function toIsoDateString(value: unknown): unknown {
  if (value instanceof Date && !Number.isNaN(value.valueOf())) {
    return value.toISOString().slice(0, 10);
  }

  if (typeof value === "string") {
    const trimmed = value.trim();
    // gray-matter may yield full ISO timestamps for unquoted dates.
    if (/^\d{4}-\d{2}-\d{2}T/.test(trimmed)) {
      return trimmed.slice(0, 10);
    }
    return trimmed;
  }

  return value;
}

const isoDateSchema = z.preprocess(
  toIsoDateString,
  z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "date must be YYYY-MM-DD"),
);

const tagSchema = z
  .string()
  .trim()
  .min(1, "tag must not be empty")
  .refine((tag) => !tag.startsWith("#"), {
    message: 'tags must not include "#"; add "#" only when rendering',
  });

export const blogFrontmatterSchema = z.object({
  title: z.string().trim().min(1, "title is required"),
  author: z.string().trim().min(1, "author is required"),
  tags: z.array(tagSchema).default([]),
  date: isoDateSchema,
  thumbnailText: z.string().trim().min(1).optional(),
  description: z.string().trim().min(1).optional(),
});

export type BlogFrontmatter = z.infer<typeof blogFrontmatterSchema>;

export const blogCategorySchema = z.object({
  name: z.string().trim().min(1, "name is required"),
  icon: z.string().trim().min(1, "icon is required"),
  color: z
    .string()
    .trim()
    .regex(/^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, "color must be a hex value"),
  description: z.string().trim().min(1, "description is required"),
});

export type BlogCategoryConfig = z.infer<typeof blogCategorySchema>;

function formatParseError(label: string, filePath: string, error: z.ZodError) {
  const details = error.issues
    .map((issue) => `${issue.path.join(".") || label}: ${issue.message}`)
    .join("; ");

  return `Invalid ${label} in ${filePath}: ${details}`;
}

export function parseBlogFrontmatter(
  raw: unknown,
  filePath: string,
): BlogFrontmatter {
  const result = blogFrontmatterSchema.safeParse(raw);

  if (!result.success) {
    throw new Error(formatParseError("frontmatter", filePath, result.error));
  }

  return result.data;
}

export function parseBlogCategory(
  raw: unknown,
  filePath: string,
): BlogCategoryConfig {
  const result = blogCategorySchema.safeParse(raw);

  if (!result.success) {
    throw new Error(formatParseError("category", filePath, result.error));
  }

  return result.data;
}
