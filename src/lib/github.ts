import { GitHubRepo } from "@/types";

export async function getPublicRepos(username: string): Promise<GitHubRepo[]> {
  const response = await fetch(
    `https://api.github.com/users/${username}/repos?sort=updated&per_page=12&type=public`,
    {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
      next: { revalidate: 3600 },
    }
  );

  if (!response.ok) {
    console.error("Failed to fetch repos:", response.statusText);
    return [];
  }

  const repos: GitHubRepo[] = await response.json();

  // Filter out forked repos and sort by stars
  return repos
    .filter((repo) => !repo.name.includes(".github.io"))
    .sort((a, b) => b.stargazers_count - a.stargazers_count);
}

export const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572A5",
  Go: "#00ADD8",
  Rust: "#dea584",
  Java: "#b07219",
  Ruby: "#701516",
  PHP: "#4F5D95",
  CSS: "#563d7c",
  HTML: "#e34c26",
  Shell: "#89e051",
  Dockerfile: "#384d54",
};
