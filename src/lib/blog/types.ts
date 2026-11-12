import type { ReactNode } from "react";

export type BlogPostMeta = {
  title: string;
  author: string;
  tags: string[];
  date: string;
  thumbnailText?: string;
  description?: string;
  category: string;
  slug: string;
};

export type BlogPost = BlogPostMeta & {
  content: ReactNode;
};

export type BlogPostParams = {
  category: string;
  slug: string;
};
