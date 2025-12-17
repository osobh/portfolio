"use client";

import { Suspense, lazy } from "react";
import { Canvas } from "@react-three/fiber";
import { useTheme } from "@/contexts/ThemeContext";

// Lazy load 3D backgrounds for performance
const NeuralNetwork = lazy(() => import("./backgrounds/NeuralNetwork"));
const RadarTerminal = lazy(() => import("./backgrounds/RadarTerminal"));
const NeonCity = lazy(() => import("./backgrounds/NeonCity"));
const CodeRain = lazy(() => import("./backgrounds/CodeRain"));

function Background3D() {
  const { theme } = useTheme();

  return (
    <Suspense fallback={null}>
      {theme.background3D === "neural" && <NeuralNetwork />}
      {theme.background3D === "radar" && <RadarTerminal />}
      {theme.background3D === "neon" && <NeonCity />}
      {theme.background3D === "matrix" && <CodeRain />}
    </Suspense>
  );
}

export default function SceneContainer() {
  const { theme } = useTheme();

  return (
    <div
      className="fixed inset-0 -z-10"
      style={{ background: theme.colors.background }}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        style={{ background: "transparent" }}
      >
        <Background3D />
      </Canvas>
    </div>
  );
}
