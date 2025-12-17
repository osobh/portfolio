"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface Node {
  position: THREE.Vector3;
  velocity: THREE.Vector3;
}

function NeuralNodes() {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);

  const nodeCount = 80;
  const connectionDistance = 2.5;

  const nodes = useMemo<Node[]>(() => {
    const result: Node[] = [];
    for (let i = 0; i < nodeCount; i++) {
      result.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 8
        ),
        velocity: new THREE.Vector3(
          (Math.random() - 0.5) * 0.005,
          (Math.random() - 0.5) * 0.005,
          (Math.random() - 0.5) * 0.003
        ),
      });
    }
    return result;
  }, []);

  const pointsGeometry = useMemo(() => {
    const positions = new Float32Array(nodeCount * 3);
    const sizes = new Float32Array(nodeCount);

    nodes.forEach((node, i) => {
      positions[i * 3] = node.position.x;
      positions[i * 3 + 1] = node.position.y;
      positions[i * 3 + 2] = node.position.z;
      sizes[i] = Math.random() * 0.5 + 0.3;
    });

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    return geometry;
  }, [nodes]);

  const lineSegments = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const material = new THREE.LineBasicMaterial({
      color: "#06b6d4",
      transparent: true,
      opacity: 0.2,
      blending: THREE.AdditiveBlending,
    });
    return new THREE.LineSegments(geometry, material);
  }, []);

  useFrame((state) => {
    if (!pointsRef.current || !linesRef.current) return;

    const time = state.clock.elapsedTime * 0.5;
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;

    // Update node positions
    nodes.forEach((node, i) => {
      node.position.add(node.velocity);

      // Boundary bounce
      if (Math.abs(node.position.x) > 7.5) node.velocity.x *= -1;
      if (Math.abs(node.position.y) > 5) node.velocity.y *= -1;
      if (Math.abs(node.position.z) > 4) node.velocity.z *= -1;

      // Add subtle wave motion
      const wave = Math.sin(time + i * 0.1) * 0.01;
      node.position.y += wave;

      positions[i * 3] = node.position.x;
      positions[i * 3 + 1] = node.position.y;
      positions[i * 3 + 2] = node.position.z;
    });

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Update connections
    const linePositions: number[] = [];

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = nodes[i].position.distanceTo(nodes[j].position);
        if (dist < connectionDistance) {
          linePositions.push(
            nodes[i].position.x, nodes[i].position.y, nodes[i].position.z,
            nodes[j].position.x, nodes[j].position.y, nodes[j].position.z
          );
        }
      }
    }

    linesRef.current.geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(linePositions, 3)
    );

    // Subtle rotation
    pointsRef.current.rotation.y = time * 0.05;
    linesRef.current.rotation.y = time * 0.05;
  });

  return (
    <group>
      <points ref={pointsRef} geometry={pointsGeometry}>
        <pointsMaterial
          size={0.08}
          color="#06b6d4"
          transparent
          opacity={0.8}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
        />
      </points>
      <primitive ref={linesRef} object={lineSegments} />
    </group>
  );
}

function GlowOrb() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.elapsedTime;
    meshRef.current.scale.setScalar(1 + Math.sin(time * 0.5) * 0.1);
  });

  return (
    <mesh ref={meshRef} position={[0, 0, -3]}>
      <sphereGeometry args={[2, 32, 32]} />
      <meshBasicMaterial
        color="#06b6d4"
        transparent
        opacity={0.03}
      />
    </mesh>
  );
}

export default function NeuralNetwork() {
  return (
    <>
      <color attach="background" args={["#0a0a0f"]} />
      <fog attach="fog" args={["#0a0a0f", 5, 15]} />
      <ambientLight intensity={0.5} />
      <NeuralNodes />
      <GlowOrb />
    </>
  );
}
