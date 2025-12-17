export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  topics: string[];
}

export interface Project {
  title: string;
  description: string;
  image: string;
  link: string;
}

export interface NavLink {
  name: string;
  href: string;
}
