"use client";

import { useTheme } from "@/contexts/ThemeContext";

export default function ThemeEffects() {
  const { theme } = useTheme();

  return (
    <>
      {/* CRT Scanlines (Vault73) */}
      {theme.effects.scanlines && <div className="scanlines" />}

      {/* Static Noise (Vault73) */}
      {theme.effects.crt && <div className="static-noise" />}
    </>
  );
}
