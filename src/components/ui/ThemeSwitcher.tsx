"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Palette, Monitor, Terminal, Zap, Binary } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";
import { themeList, ThemeId } from "@/themes";

const themeIcons: Record<ThemeId, typeof Monitor> = {
  "ai-professional": Monitor,
  "vault73": Terminal,
  "cyberpunk": Zap,
  "matrix": Binary,
};

export default function ThemeSwitcher() {
  const { theme, themeId, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const CurrentIcon = themeIcons[themeId] || Palette;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300"
        style={{
          background: theme.colors.surface,
          border: `1px solid ${theme.colors.border}`,
          color: theme.colors.primary,
        }}
        aria-label="Select theme"
      >
        <CurrentIcon className="w-4 h-4" />
        <span className="hidden sm:inline text-sm font-medium">{theme.name}</span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-48 rounded-lg overflow-hidden z-50"
            style={{
              background: theme.colors.backgroundAlt,
              border: `1px solid ${theme.colors.border}`,
              boxShadow: `0 10px 40px rgba(0,0,0,0.5), 0 0 20px ${theme.colors.glow}`,
            }}
          >
            {themeList.map((t) => {
              const Icon = themeIcons[t.id as ThemeId] || Palette;
              const isActive = t.id === themeId;

              return (
                <button
                  key={t.id}
                  onClick={() => {
                    setTheme(t.id as ThemeId);
                    setIsOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left transition-all duration-200"
                  style={{
                    background: isActive ? t.colors.surface : "transparent",
                    color: isActive ? t.colors.primary : t.colors.textMuted,
                    borderLeft: isActive ? `3px solid ${t.colors.primary}` : "3px solid transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = t.colors.surface;
                      e.currentTarget.style.color = t.colors.primary;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = "transparent";
                      e.currentTarget.style.color = theme.colors.textMuted;
                    }
                  }}
                >
                  <div
                    className="p-1.5 rounded"
                    style={{ background: t.colors.surface }}
                  >
                    <Icon className="w-4 h-4" style={{ color: t.colors.primary }} />
                  </div>
                  <div>
                    <div className="text-sm font-medium">{t.name}</div>
                    <div
                      className="text-xs"
                      style={{ color: theme.colors.textDim }}
                    >
                      {t.id === "ai-professional" && "Clean & Modern"}
                      {t.id === "vault73" && "Retro Terminal"}
                      {t.id === "cyberpunk" && "Neon Dystopia"}
                      {t.id === "matrix" && "Digital Rain"}
                    </div>
                  </div>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
