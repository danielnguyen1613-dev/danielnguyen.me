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

export function parseBlogFrontmatter(
  raw: unknown,
  filePath: string,
): BlogFrontmatter {
  const result = blogFrontmatterSchema.safeParse(raw);

  if (!result.success) {
    const details = result.error.issues
      .map((issue) => `${issue.path.join(".") || "frontmatter"}: ${issue.message}`)
      .join("; ");

    throw new Error(`Invalid frontmatter in ${filePath}: ${details}`);
  }

  return result.data;
}
