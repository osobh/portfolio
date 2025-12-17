"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function RadarSweep() {
  const sweepRef = useRef<THREE.Line>(null);
  const trailRef = useRef<THREE.Mesh>(null);

  const { sweepLine, horizontalLine, verticalLine } = useMemo(() => {
    // Sweep line
    const sweepGeo = new THREE.BufferGeometry();
    sweepGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array([0, 0, 0, 3, 0, 0]), 3)
    );
    const sweep = new THREE.Line(
      sweepGeo,
      new THREE.LineBasicMaterial({ color: "#33FF33", transparent: true, opacity: 0.8 })
    );

    // Horizontal line
    const hGeo = new THREE.BufferGeometry();
    hGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array([-3, 0, 0, 3, 0, 0]), 3)
    );
    const hLine = new THREE.Line(
      hGeo,
      new THREE.LineBasicMaterial({ color: "#FFB000", transparent: true, opacity: 0.2 })
    );

    // Vertical line
    const vGeo = new THREE.BufferGeometry();
    vGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array([0, -3, 0, 0, 3, 0]), 3)
    );
    const vLine = new THREE.Line(
      vGeo,
      new THREE.LineBasicMaterial({ color: "#FFB000", transparent: true, opacity: 0.2 })
    );

    return { sweepLine: sweep, horizontalLine: hLine, verticalLine: vLine };
  }, []);

  useFrame((state) => {
    if (!sweepRef.current || !trailRef.current) return;
    const time = state.clock.elapsedTime;
    sweepRef.current.rotation.z = -time * 0.8;
    trailRef.current.rotation.z = -time * 0.8;
  });

  return (
    <group position={[0, 0, -2]}>
      {/* Radar circles */}
      {[1, 1.5, 2, 2.5, 3].map((radius, i) => (
        <mesh key={i} rotation={[0, 0, 0]}>
          <ringGeometry args={[radius - 0.02, radius, 64]} />
          <meshBasicMaterial
            color="#FFB000"
            transparent
            opacity={0.15 - i * 0.02}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      {/* Cross lines */}
      <primitive object={horizontalLine} />
      <primitive object={verticalLine} />

      {/* Sweep line */}
      <primitive ref={sweepRef} object={sweepLine} />

      {/* Sweep trail (fading wedge) */}
      <mesh ref={trailRef}>
        <circleGeometry args={[3, 32, 0, Math.PI / 4]} />
        <meshBasicMaterial
          color="#33FF33"
          transparent
          opacity={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function Oscilloscope() {
  const lineRef = useRef<THREE.Line>(null);
  const pointCount = 100;

  const line = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(pointCount * 3);
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return new THREE.Line(
      geometry,
      new THREE.LineBasicMaterial({ color: "#33FF33", transparent: true, opacity: 0.7 })
    );
  }, []);

  useFrame((state) => {
    if (!lineRef.current) return;
    const time = state.clock.elapsedTime;
    const positions = lineRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < pointCount; i++) {
      const x = (i / pointCount) * 8 - 4;
      const y = Math.sin(x * 2 + time * 3) * 0.3 +
                Math.sin(x * 4 + time * 5) * 0.1 +
                (Math.random() - 0.5) * 0.05;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y - 3.2;
      positions[i * 3 + 2] = -1;
    }

    lineRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return <primitive ref={lineRef} object={line} />;
}

function StaticParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 200;

  const geometry = useMemo(() => {
    const positions = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4 - 1;
      sizes[i] = Math.random() * 0.03 + 0.01;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    return geo;
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < particleCount; i++) {
      if (Math.random() > 0.95) {
        positions[i * 3] = (Math.random() - 0.5) * 12;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={0.03}
        color="#FFB000"
        transparent
        opacity={0.4}
        sizeAttenuation
      />
    </points>
  );
}

function BlipDots() {
  const dotsRef = useRef<THREE.Points>(null);
  const dotCount = 15;

  const { geometry, originalPositions } = useMemo(() => {
    const positions = new Float32Array(dotCount * 3);
    const original: THREE.Vector3[] = [];

    for (let i = 0; i < dotCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 2.5 + 0.5;
      const x = Math.cos(angle) * radius;
      const y = Math.sin(angle) * radius;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = -2;
      original.push(new THREE.Vector3(x, y, -2));
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return { geometry: geo, originalPositions: original };
  }, []);

  useFrame((state) => {
    if (!dotsRef.current) return;
    const time = state.clock.elapsedTime;
    const sweepAngle = (-time * 0.8) % (Math.PI * 2);
    const positions = dotsRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < dotCount; i++) {
      const dotAngle = Math.atan2(originalPositions[i].y, originalPositions[i].x);
      const normalizedDot = dotAngle < 0 ? dotAngle + Math.PI * 2 : dotAngle;
      const normalizedSweep = sweepAngle < 0 ? sweepAngle + Math.PI * 2 : sweepAngle;
      const diff = Math.abs(normalizedDot - normalizedSweep);

      if (diff < 0.3 || diff > Math.PI * 2 - 0.3) {
        positions[i * 3 + 2] = -1.9;
      } else {
        positions[i * 3 + 2] = -2.1;
      }
    }

    dotsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={dotsRef} geometry={geometry}>
      <pointsMaterial
        size={0.1}
        color="#33FF33"
        transparent
        opacity={0.9}
        sizeAttenuation
      />
    </points>
  );
}

export default function RadarTerminal() {
  return (
    <>
      <color attach="background" args={["#0a0a00"]} />
      <ambientLight intensity={0.3} />
      <RadarSweep />
      <BlipDots />
      <Oscilloscope />
      <StaticParticles />
    </>
  );
}
