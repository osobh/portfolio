"use client";

import { SOCIAL_LINKS } from "@/lib/constants";
import {
  GithubIcon,
  LinkedinIcon,
  YoutubeIcon,
  TwitterIcon,
  TiktokIcon,
} from "@/components/icons/SocialIcons";

const socialItems = [
  { name: "GitHub", href: SOCIAL_LINKS.github, icon: GithubIcon },
  { name: "LinkedIn", href: SOCIAL_LINKS.linkedin, icon: LinkedinIcon },
  { name: "YouTube", href: SOCIAL_LINKS.youtube, icon: YoutubeIcon },
  { name: "X", href: SOCIAL_LINKS.twitter, icon: TwitterIcon },
  { name: "TikTok", href: SOCIAL_LINKS.tiktok, icon: TiktokIcon },
];

export default function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-5 ${className}`}>
      {socialItems.map((item) => (
        <a
          key={item.name}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#64748b] hover:text-[#06b6d4] transition-colors"
          aria-label={item.name}
        >
          <item.icon className="w-5 h-5" />
        </a>
      ))}
    </div>
  );
}
