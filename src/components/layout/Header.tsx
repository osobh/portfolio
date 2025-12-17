"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { useTheme } from "@/contexts/ThemeContext";
import ThemeSwitcher from "@/components/ui/ThemeSwitcher";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300`}
      style={{
        background: isScrolled ? theme.colors.surface : "transparent",
        backdropFilter: isScrolled ? "blur(12px)" : "none",
        borderBottom: isScrolled ? `1px solid ${theme.colors.border}` : "none",
      }}
    >
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <a
          href="#home"
          className="text-2xl font-display font-bold transition-colors"
          style={{ color: theme.colors.text }}
        >
          Omar<span style={{ color: theme.colors.primary }}>.</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium transition-colors hover:opacity-100"
              style={{ color: theme.colors.textMuted }}
              onMouseEnter={(e) => (e.currentTarget.style.color = theme.colors.primary)}
              onMouseLeave={(e) => (e.currentTarget.style.color = theme.colors.textMuted)}
            >
              {link.name}
            </a>
          ))}
          <ThemeSwitcher />
          <a
            href="/resume.pdf"
            target="_blank"
            className="px-4 py-2 text-sm font-medium rounded-lg transition-all"
            style={{
              color: theme.colors.primary,
              border: `1px solid ${theme.colors.primary}`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = `${theme.colors.primary}20`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
            }}
          >
            Resume
          </a>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <ThemeSwitcher />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2"
            style={{ color: theme.colors.text }}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden"
          style={{
            background: theme.colors.surface,
            backdropFilter: "blur(12px)",
            borderTop: `1px solid ${theme.colors.border}`,
          }}
        >
          <div className="container mx-auto px-6 py-4 flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="py-2 transition-colors"
                style={{ color: theme.colors.textMuted }}
              >
                {link.name}
              </a>
            ))}
            <a
              href="/resume.pdf"
              target="_blank"
              className="py-2"
              style={{ color: theme.colors.primary }}
            >
              Resume
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
