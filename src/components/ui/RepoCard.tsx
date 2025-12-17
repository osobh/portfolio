"use client";

import { motion } from "framer-motion";
import { Star, GitFork, ExternalLink, Sparkles } from "lucide-react";
import { GitHubRepo } from "@/types";
import { LANGUAGE_COLORS } from "@/lib/github";

interface RepoCardProps {
  repo: GitHubRepo;
  index: number;
  featured?: boolean;
}

export default function RepoCard({ repo, index, featured }: RepoCardProps) {
  const languageColor = repo.language
    ? LANGUAGE_COLORS[repo.language] || "#94a3b8"
    : "#94a3b8";

  return (
    <motion.a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      viewport={{ once: true }}
      className={`group relative block p-6 glass rounded-xl transition-all duration-300 hover:border-[#06b6d4]/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] ${
        featured ? "border-[#06b6d4]/30" : ""
      }`}
    >
      {featured && (
        <div className="absolute -top-2 -right-2 px-2 py-1 bg-gradient-to-r from-[#06b6d4] to-[#22d3ee] text-[#0a0a0f] text-xs font-medium rounded-md flex items-center gap-1">
          <Sparkles className="w-3 h-3" />
          Featured
        </div>
      )}

      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-semibold text-white group-hover:text-[#06b6d4] transition-colors truncate flex-1">
          {repo.name}
        </h3>
        <ExternalLink className="w-4 h-4 text-[#64748b] group-hover:text-[#06b6d4] transition-colors flex-shrink-0 ml-2" />
      </div>

      <p className="text-[#94a3b8] text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
        {repo.description || "No description available"}
      </p>

      <div className="flex items-center gap-4 text-sm text-[#64748b]">
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: languageColor }}
            />
            {repo.language}
          </span>
        )}
        {repo.stargazers_count > 0 && (
          <span className="flex items-center gap-1">
            <Star className="w-4 h-4" />
            {repo.stargazers_count}
          </span>
        )}
        {repo.forks_count > 0 && (
          <span className="flex items-center gap-1">
            <GitFork className="w-4 h-4" />
            {repo.forks_count}
          </span>
        )}
      </div>
    </motion.a>
  );
}
