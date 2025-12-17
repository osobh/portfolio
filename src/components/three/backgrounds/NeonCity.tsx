"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function NeonGrid() {
  const groupRef = useRef<THREE.Group>(null);

  const lineObjects = useMemo(() => {
    const gridSize = 20;
    const spacing = 1;
    const objects: THREE.Line[] = [];

    // Horizontal lines (going into distance)
    for (let i = -gridSize / 2; i <= gridSize / 2; i++) {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array([
        i * spacing, -3, 0,
        i * spacing, -3, -30
      ]);
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const material = new THREE.LineBasicMaterial({
        color: i % 2 === 0 ? "#FF2D95" : "#00FFFF",
        transparent: true,
        opacity: 0.4,
      });
      objects.push(new THREE.Line(geometry, material));
    }

    // Vertical lines (perpendicular)
    for (let i = 0; i < 30; i++) {
      const geometry = new THREE.BufferGeometry();
      const positions = new Float32Array([
        -gridSize / 2 * spacing, -3, -i,
        gridSize / 2 * spacing, -3, -i
      ]);
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const material = new THREE.LineBasicMaterial({
        color: i % 2 === 0 ? "#00FFFF" : "#9D00FF",
        transparent: true,
        opacity: Math.max(0.1, 0.3 - i * 0.008),
      });
      objects.push(new THREE.Line(geometry, material));
    }

    return objects;
  }, []);

  return (
    <group ref={groupRef}>
      {lineObjects.map((line, i) => (
        <primitive key={i} object={line} />
      ))}
    </group>
  );
}

function HolographicPanels() {
  const panelsRef = useRef<THREE.Group>(null);

  const panels = useMemo(() => {
    const result: { position: [number, number, number]; size: [number, number]; color: string }[] = [];
    const colors = ["#FF2D95", "#00FFFF", "#9D00FF"];

    for (let i = 0; i < 8; i++) {
      result.push({
        position: [
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 4 + 1,
          -5 - Math.random() * 10
        ],
        size: [0.5 + Math.random() * 1.5, 0.8 + Math.random() * 1.5],
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    return result;
  }, []);

  useFrame((state) => {
    if (!panelsRef.current) return;
    const time = state.clock.elapsedTime;

    panelsRef.current.children.forEach((child, i) => {
      if (child instanceof THREE.Mesh) {
        child.position.y += Math.sin(time * 1.5 + i) * 0.002;
        child.rotation.y = Math.sin(time * 0.5 + i * 0.5) * 0.1;
        const material = child.material as THREE.MeshBasicMaterial;
        material.opacity = 0.15 + Math.sin(time * 10 + i * 2) * 0.05;
      }
    });
  });

  return (
    <group ref={panelsRef}>
      {panels.map((panel, i) => (
        <mesh key={i} position={panel.position}>
          <planeGeometry args={panel.size} />
          <meshBasicMaterial color={panel.color} transparent opacity={0.15} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}

function RainParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const particleCount = 500;

  const { geometry, velocities } = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const vels = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = Math.random() * 15 - 5;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 15 - 5;
      vels[i] = 0.1 + Math.random() * 0.15;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return { geometry: geo, velocities: vels };
  }, []);

  useFrame(() => {
    if (!particlesRef.current) return;
    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3 + 1] -= velocities[i];
      if (positions[i * 3 + 1] < -5) {
        positions[i * 3 + 1] = 10;
        positions[i * 3] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 15 - 5;
      }
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={particlesRef} geometry={geometry}>
      <pointsMaterial
        size={0.02}
        color="#00FFFF"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function NeonGlow() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    const material = meshRef.current.material as THREE.MeshBasicMaterial;
    material.opacity = 0.03 + Math.sin(time * 0.8) * 0.01;
  });

  return (
    <mesh ref={meshRef} position={[0, -1, -8]}>
      <sphereGeometry args={[6, 32, 32]} />
      <meshBasicMaterial color="#FF2D95" transparent opacity={0.03} />
    </mesh>
  );
}

function CitySilhouette() {
  const buildings = useMemo(() => {
    const result: { x: number; width: number; height: number }[] = [];
    let x = -12;

    while (x < 12) {
      const width = 0.5 + Math.random() * 1.5;
      const height = 2 + Math.random() * 5;
      result.push({ x, width, height });
      x += width + 0.2;
    }

    return result;
  }, []);

  return (
    <group position={[0, -3, -20]}>
      {buildings.map((b, i) => (
        <mesh key={i} position={[b.x, b.height / 2, 0]}>
          <boxGeometry args={[b.width, b.height, 0.3]} />
          <meshBasicMaterial color="#0a0010" />
        </mesh>
      ))}
    </group>
  );
}

export default function NeonCity() {
  return (
    <>
      <color attach="background" args={["#0a0010"]} />
      <fog attach="fog" args={["#0a0010", 10, 30]} />
      <ambientLight intensity={0.2} />
      <NeonGrid />
      <HolographicPanels />
      <RainParticles />
      <NeonGlow />
      <CitySilhouette />
    </>
  );
}
