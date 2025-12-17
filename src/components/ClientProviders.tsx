"use client";

import { ReactNode } from "react";
import { ThemeProvider } from "@/contexts/ThemeContext";
import dynamic from "next/dynamic";
import ThemeEffects from "@/components/ThemeEffects";

// Dynamically import SceneContainer to avoid SSR issues with Three.js
const SceneContainer = dynamic(
  () => import("@/components/three/SceneContainer"),
  { ssr: false }
);

export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <SceneContainer />
      <ThemeEffects />
      {children}
    </ThemeProvider>
  );
}
