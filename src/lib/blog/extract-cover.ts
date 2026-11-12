/**
 * Resolve the first image URL from MDX/markdown body content.
 * Supports markdown images and plain <img> tags.
 */
export function extractFirstImage(content: string): string | undefined {
  const markdownMatch = content.match(
    /!\[[^\]]*]\(\s*<?([^)\s>]+)>?(?:\s+(?:"[^"]*"|'[^']*'))?\s*\)/,
  );
  if (markdownMatch?.[1]) return markdownMatch[1];

  const htmlMatch = content.match(/<img\b[^>]*\bsrc=["']([^"']+)["'][^>]*>/i);
  if (htmlMatch?.[1]) return htmlMatch[1];

  return undefined;
}
