"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { themes, Theme, ThemeId } from "@/themes";

interface ThemeContextType {
  theme: Theme;
  themeId: ThemeId;
  setTheme: (id: ThemeId) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeId, setThemeId] = useState<ThemeId>("ai-professional");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const theme = themes[themeId];
    const root = document.documentElement;

    // Set theme data attribute
    root.setAttribute("data-theme", themeId);

    // Apply CSS custom properties
    root.style.setProperty("--background", theme.colors.background);
    root.style.setProperty("--background-alt", theme.colors.backgroundAlt);
    root.style.setProperty("--surface", theme.colors.surface);
    root.style.setProperty("--surface-hover", theme.colors.surfaceHover);
    root.style.setProperty("--primary", theme.colors.primary);
    root.style.setProperty("--primary-light", theme.colors.primaryLight);
    root.style.setProperty("--accent", theme.colors.accent);
    root.style.setProperty("--text", theme.colors.text);
    root.style.setProperty("--text-muted", theme.colors.textMuted);
    root.style.setProperty("--text-dim", theme.colors.textDim);
    root.style.setProperty("--border", theme.colors.border);
    root.style.setProperty("--glow", theme.colors.glow);

    // Apply fonts
    root.style.setProperty("--font-display", theme.fonts.heading);
    root.style.setProperty("--font-body", theme.fonts.body);
    root.style.setProperty("--font-code", theme.fonts.mono);

  }, [themeId, mounted]);

  const setTheme = (id: ThemeId) => {
    setThemeId(id);
  };

  const value: ThemeContextType = {
    theme: themes[themeId],
    themeId,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
