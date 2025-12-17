"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface RainColumn {
  x: number;
  z: number;
  speed: number;
  y: number;
  length: number;
}

function MatrixRain() {
  const particlesRef = useRef<THREE.Points>(null);
  const columnCount = 60;
  const particlesPerColumn = 15;
  const totalParticles = columnCount * particlesPerColumn;

  const { geometry, columns, speeds } = useMemo(() => {
    const positions = new Float32Array(totalParticles * 3);
    const colors = new Float32Array(totalParticles * 3);
    const sizes = new Float32Array(totalParticles);
    const cols: RainColumn[] = [];
    const spds: Float32Array = new Float32Array(columnCount);

    // Create columns
    for (let c = 0; c < columnCount; c++) {
      const x = (c - columnCount / 2) * 0.4;
      const z = (Math.random() - 0.5) * 10 - 3;
      const speed = 0.03 + Math.random() * 0.05;
      const startY = Math.random() * 10 + 5;

      cols.push({
        x,
        z,
        speed,
        y: startY,
        length: 8 + Math.floor(Math.random() * 8),
      });
      spds[c] = speed;

      // Create particles for this column
      for (let p = 0; p < particlesPerColumn; p++) {
        const idx = c * particlesPerColumn + p;
        positions[idx * 3] = x + (Math.random() - 0.5) * 0.05;
        positions[idx * 3 + 1] = startY - p * 0.4;
        positions[idx * 3 + 2] = z;

        // Brightness gradient - head is white, tail fades to dark green
        const brightness = p === 0 ? 1 : Math.max(0.1, 1 - p * 0.08);
        if (p === 0) {
          colors[idx * 3] = 1;
          colors[idx * 3 + 1] = 1;
          colors[idx * 3 + 2] = 1;
        } else {
          colors[idx * 3] = 0;
          colors[idx * 3 + 1] = brightness;
          colors[idx * 3 + 2] = 0.1 * brightness;
        }

        sizes[idx] = p === 0 ? 0.12 : 0.08;
      }
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    return { geometry: geo, columns: cols, speeds: spds };
  }, []);

  useFrame(() => {
    if (!particlesRef.current) return;
    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;

    for (let c = 0; c < columnCount; c++) {
      const col = columns[c];
      col.y -= col.speed;

      // Reset when column goes off screen
      if (col.y < -8) {
        col.y = 10 + Math.random() * 5;
        col.x = (c - columnCount / 2) * 0.4 + (Math.random() - 0.5) * 0.3;
      }

      // Update particle positions
      for (let p = 0; p < particlesPerColumn; p++) {
        const idx = c * particlesPerColumn + p;
        positions[idx * 3] = col.x;
        positions[idx * 3 + 1] = col.y - p * 0.4;
        positions[idx * 3 + 2] = col.z;
      }
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particlesRef} geometry={geometry}>
      <pointsMaterial
        size={0.1}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function GlowingParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 100;

  const geometry = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 15;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame((state) => {
    if (!particlesRef.current) return;
    const time = state.clock.elapsedTime;
    const material = particlesRef.current.material as THREE.PointsMaterial;
    material.opacity = 0.3 + Math.sin(time * 2) * 0.1;
  });

  return (
    <points ref={particlesRef} geometry={geometry}>
      <pointsMaterial
        size={0.05}
        color="#00FF41"
        transparent
        opacity={0.3}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function DepthFog() {
  return (
    <>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[0, 0, -8 - i * 3]}>
          <planeGeometry args={[30, 20]} />
          <meshBasicMaterial
            color="#001100"
            transparent
            opacity={0.2 + i * 0.1}
          />
        </mesh>
      ))}
    </>
  );
}

export default function CodeRain() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.elapsedTime;
    groupRef.current.position.z = Math.sin(time * 0.1) * 0.5;
  });

  return (
    <>
      <color attach="background" args={["#000000"]} />
      <ambientLight intensity={0.3} />
      <group ref={groupRef}>
        <MatrixRain />
        <GlowingParticles />
        <DepthFog />
      </group>
    </>
  );
}
