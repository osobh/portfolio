import SocialLinks from "@/components/ui/SocialLinks";
import { SITE_CONFIG } from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[rgba(148,163,184,0.1)] py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col items-center gap-6">
          <SocialLinks />

          <div className="text-center text-[#64748b] text-sm">
            <p className="flex items-center justify-center gap-1">
              Built with <span className="text-[#06b6d4]">&#9829;</span> in {SITE_CONFIG.location}
            </p>
            <p className="mt-2">
              &copy; {currentYear} {SITE_CONFIG.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
