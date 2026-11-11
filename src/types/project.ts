export type ProjectLinks = {
  live?: string;
  github?: string;
};

export type ProjectDetails = {
  overview?: string;
  challenge?: string;
  solution?: string;
  features?: string[];
};

export type Project = {
  slug: string;
  title: string;
  description: string;
  category: string;
  year: number;
  role: string;
  technologies: string[];
  image: string;
  links?: ProjectLinks;
  details?: ProjectDetails;
  featured?: boolean;
  order?: number;
};
