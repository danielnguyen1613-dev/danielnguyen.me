export type Service = {
  id: string;
  number: string;
  title: string;
  description: string;
  technologies: string[];
};

export const webDevelopmentService: Service = {
  id: "web-development",
  number: "01",
  title: "Web Development",
  description:
    "Build modern, responsive and production-ready web applications.",
  technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
};

export const aiRagService: Service = {
  id: "ai-rag",
  number: "02",
  title: "AI & RAG Solutions",
  description:
    "Build AI-powered features such as intelligent chatbots, document search, RAG systems and LLM integrations.",
  technologies: ["LLM", "RAG", "LangChain", "Weaviate"],
};

export const backendApiService: Service = {
  id: "backend-api",
  number: "03",
  title: "Backend & API",
  description:
    "Design scalable backend services and REST APIs that power modern web and AI products.",
  technologies: ["Python", "FastAPI", "PostgreSQL", "SQLAlchemy"],
};

export const ecommerceService: Service = {
  id: "ecommerce",
  number: "04",
  title: "E-commerce Development",
  description:
    "Build complete e-commerce platforms with storefronts, admin dashboards, product management, checkout and order workflows.",
  technologies: ["Next.js", "FastAPI", "PostgreSQL", "React Query"],
};

export const performanceService: Service = {
  id: "performance-seo-testing",
  number: "05",
  title: "Performance, SEO & Testing",
  description:
    "Improve website performance, search visibility and reliability through technical SEO, optimization and automated testing.",
  technologies: ["SEO", "Core Web Vitals", "Playwright", "Jest"],
};
