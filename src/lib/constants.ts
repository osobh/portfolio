export const SITE_CONFIG = {
  name: "Omar Sobh",
  title: "Omar Sobh - Cloud Innovation and AI Automation Leader",
  description:
    "12+ years architecting AI-powered solutions and scalable infrastructure. Specializing in agent systems, LLMs, and cloud-native architecture at hyperscale.",
  url: "https://osobh.github.io",
  email: "om.sobh@gmail.com",
  location: "Los Gatos, California",
  githubUsername: "osobh",
  yearsExperience: "12+",
};

export const SOCIAL_LINKS = {
  github: "https://github.com/osobh",
  linkedin: "https://www.linkedin.com/in/omarsobh/",
  youtube: "https://www.youtube.com/@oAI3517",
  twitter: "https://x.com/taggerz",
  tiktok: "https://www.tiktok.com/@worldwidewaverider",
};

export const NAV_LINKS = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Publications", href: "#publications" },
  { name: "Contact", href: "#contact" },
];

export const COMPANIES = [
  { name: "Apple", period: "2019 - Present" },
  { name: "Binance", period: "2018 - 2019" },
  { name: "Guardant Health", period: "2016 - 2018" },
  { name: "IGB UIUC", period: "2013 - 2016" },
];

export const STATS = [
  { value: "337M", label: "ops/sec" },
  { value: "112K", label: "inferences/sec" },
  { value: "10K+", label: "workloads" },
  { value: "1.5K+", label: "teams" },
];

export const PUBLICATIONS = [
  {
    title: "Knowledge-guided analysis of 'omics' data using the KnowEnG cloud platform",
    url: "https://bit.ly/46qEzkt",
    venue: "PLOS Computational Biology",
  },
  {
    title: "Invertnet: a new platform for biodiversity research",
    url: "https://bit.ly/44MUN6g",
    venue: "Ecological Informatics",
  },
];

export const SKILLS = {
  "AI & ML": ["Agent Systems", "LLMs", "RAG", "GraphRAG", "Computer Vision"],
  Languages: ["TypeScript", "Python", "Rust", "Go"],
  DevOps: ["Kubernetes", "Docker", "Terraform", "CI/CD"],
  Cloud: ["AWS", "GCP", "AliCloud", "Supabase"],
  Databases: ["Neo4j", "PostgreSQL", "Redis", "Vector DBs"],
  Compliance: ["HIPAA", "SOX", "FDA-ready"],
};

export const FEATURED_REPOS = [
  "multibase",
  "tesseract",
  "horizon",
  "warp",
  "pingpong",
  "gunner",
  "graphene",
  "robomovie",
];

export const PROJECT_DESCRIPTIONS: Record<string, string> = {
  graphene: "Kubernetes Agentic Knowledge Network with Neo4j + GPT-4 orchestration",
  tesseract: "AI-driven codebase analysis with intelligent agent swarms",
  robomovie: "AI-Generated Film Studio using GPT-4, AudioLM, and DALLE",
  multibase: "Run multiple self-hosted Supabase instances on any server",
  horizon: "AI-driven capacity planning for cloud infrastructure",
  warp: "Blazing-fast file transfers with GPU compression",
  pingpong: "Multi-agent chat rooms with persistent context",
  gunner: "Launch multiple AI CLI containers for parallel workflows",
  legalai: "AI platform for legal document analysis",
};
