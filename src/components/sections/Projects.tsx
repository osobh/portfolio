import { getPublicRepos } from "@/lib/github";
import { SITE_CONFIG, SOCIAL_LINKS, FEATURED_REPOS, PROJECT_DESCRIPTIONS } from "@/lib/constants";
import RepoCard from "@/components/ui/RepoCard";
import { GithubIcon } from "@/components/icons/SocialIcons";
import ProjectsHeader from "@/components/ui/ProjectsHeader";

export default async function Projects() {
  const repos = await getPublicRepos(SITE_CONFIG.githubUsername);

  // Enhance repos with custom descriptions
  const enhancedRepos = repos.map((repo) => ({
    ...repo,
    description: PROJECT_DESCRIPTIONS[repo.name] || repo.description,
  }));

  // Sort repos: featured first, then by stars
  const sortedRepos = enhancedRepos.sort((a, b) => {
    const aFeatured = FEATURED_REPOS.includes(a.name);
    const bFeatured = FEATURED_REPOS.includes(b.name);
    if (aFeatured && !bFeatured) return -1;
    if (!aFeatured && bFeatured) return 1;
    return b.stargazers_count - a.stargazers_count;
  });

  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-6">
        <ProjectsHeader />

        {sortedRepos.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {sortedRepos.slice(0, 9).map((repo, index) => (
              <RepoCard
                key={repo.id}
                repo={repo}
                index={index}
                featured={FEATURED_REPOS.includes(repo.name)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 glass rounded-2xl max-w-md mx-auto">
            <p className="text-[#94a3b8]">
              Unable to load repositories. Please check back later.
            </p>
          </div>
        )}

        <div className="text-center mt-12">
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-[#334155] hover:border-[#06b6d4] text-[#94a3b8] hover:text-[#06b6d4] font-medium rounded-lg transition-all"
          >
            <GithubIcon className="w-5 h-5" />
            View All on GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
