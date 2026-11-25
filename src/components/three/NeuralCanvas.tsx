"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useReducedMotion } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

type Pointer = { x: number; y: number };

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const update = () => setMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return mobile;
}

function buildGraph(mobile: boolean) {
  const layers = mobile ? [7, 9, 8, 6] : [11, 15, 13, 9];
  const nodes: { position: [number, number, number]; color: THREE.Color }[] = [];
  const cyan = new THREE.Color("#5eead4");
  const violet = new THREE.Color("#a78bfa");
  const acid = new THREE.Color("#c6f26d");

  layers.forEach((count, layerIndex) => {
    const x = (layerIndex - (layers.length - 1) / 2) * (mobile ? 1.25 : 1.55);
    for (let i = 0; i < count; i += 1) {
      const t = count === 1 ? 0.5 : i / (count - 1);
      const y = (t - 0.5) * (mobile ? 3.2 : 4.1) + Math.sin(i * 1.9 + layerIndex) * 0.16;
      const z = Math.sin(i * 2.2 + layerIndex * 1.3) * 0.72;
      const base = layerIndex === layers.length - 1 ? violet : cyan;
      const mix = i % 11 === 0 ? acid : base;
      const color = mix.clone().lerp(cyan, layerIndex % 2 === 0 ? 0.15 : 0.45);
      nodes.push({ position: [x, y, z], color });
    }
  });

  const offsets: number[] = [];
  let cursor = 0;
  layers.forEach((count) => {
    offsets.push(cursor);
    cursor += count;
  });

  const edges: { from: number; to: number }[] = [];
  layers.slice(0, -1).forEach((count, layerIndex) => {
    const nextCount = layers[layerIndex + 1];
    for (let i = 0; i < count; i += 1) {
      const t = count === 1 ? 0.5 : i / (count - 1);
      const centre = Math.round(t * (nextCount - 1));
      const targets = new Set<number>([
        centre,
        Math.max(0, centre - 1),
        Math.min(nextCount - 1, centre + 1),
      ]);
      if (i % 3 === 0) {
        targets.add(Math.min(nextCount - 1, centre + 2));
      }
      targets.forEach((target) => {
        edges.push({
          from: offsets[layerIndex] + i,
          to: offsets[layerIndex + 1] + target,
        });
      });
    }
  });

  return { nodes, edges };
}

function NeuralGraph({
  pointer,
  reduced,
  mobile,
}: {
  pointer: React.RefObject<Pointer>;
  reduced: boolean;
  mobile: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);
  const dust = useRef<THREE.Points>(null);
  const nodeMaterial = useRef<THREE.PointsMaterial>(null);

  const { nodes, edges } = useMemo(() => buildGraph(mobile), [mobile]);

  const nodeGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions: number[] = [];
    const colors: number[] = [];
    nodes.forEach((node) => {
      positions.push(...node.position);
      colors.push(node.color.r, node.color.g, node.color.b);
    });
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3),
    );
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    return geometry;
  }, [nodes]);

  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions: number[] = [];
    const colors: number[] = [];
    edges.forEach(({ from, to }) => {
      const a = nodes[from];
      const b = nodes[to];
      positions.push(...a.position, ...b.position);
      colors.push(
        a.color.r * 0.55,
        a.color.g * 0.55,
        a.color.b * 0.55,
        b.color.r * 0.3,
        b.color.g * 0.3,
        b.color.b * 0.3,
      );
    });
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3),
    );
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
    return geometry;
  }, [edges, nodes]);

  const dustGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const count = mobile ? 180 : 420;
    const positions: number[] = [];
    for (let i = 0; i < count; i += 1) {
      positions.push(
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 5 - 1,
      );
    }
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3),
    );
    return geometry;
  }, [mobile]);

  useFrame((state, delta) => {
    if (reduced) return;
    const t = state.clock.elapsedTime;
    const p = pointer.current;
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        p.x * 0.24 + Math.sin(t * 0.16) * 0.1,
        0.035,
      );
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        -p.y * 0.16 + Math.cos(t * 0.13) * 0.05,
        0.035,
      );
    }
    if (core.current) core.current.rotation.y += delta * 0.14;
    if (ring.current) ring.current.rotation.z += delta * 0.07;
    if (dust.current) dust.current.rotation.y -= delta * 0.012;
    if (nodeMaterial.current) {
      nodeMaterial.current.opacity = 0.78 + Math.sin(t * 1.2) * 0.14;
    }
  });

  return (
    <group>
      <points ref={dust} geometry={dustGeometry}>
        <pointsMaterial
          color="#b9d6cf"
          size={0.018}
          sizeAttenuation
          transparent
          opacity={0.35}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <group ref={group}>
        <lineSegments geometry={lineGeometry}>
          <lineBasicMaterial
            vertexColors
            transparent
            opacity={0.2}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </lineSegments>
        <points geometry={nodeGeometry}>
          <pointsMaterial
            ref={nodeMaterial}
            vertexColors
            size={mobile ? 0.075 : 0.062}
            sizeAttenuation
            transparent
            opacity={0.85}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>
        <mesh ref={core}>
          <icosahedronGeometry args={[0.72, 1]} />
          <meshBasicMaterial
            color="#5eead4"
            wireframe
            transparent
            opacity={0.13}
            depthWrite={false}
          />
        </mesh>
        <mesh ref={ring} rotation={[Math.PI / 2.7, 0.4, 0]}>
          <torusGeometry args={[1.95, 0.006, 6, 128]} />
          <meshBasicMaterial
            color="#a78bfa"
            transparent
            opacity={0.35}
            depthWrite={false}
          />
        </mesh>
      </group>
    </group>
  );
}

function StaticFallback() {
  return (
    <div className="absolute inset-0 signal-grid opacity-40" aria-hidden="true">
      <div className="absolute left-1/2 top-1/2 h-[min(52vw,540px)] w-[min(52vw,540px)] -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/10" />
    </div>
  );
}

export default function NeuralCanvas() {
  const reduced = useReducedMotion() ?? false;
  const mobile = useIsMobile();
  const pointer = useRef<Pointer>({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.current.y = -((event.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <Canvas
      className="!absolute inset-0"
      dpr={mobile ? [1, 1.25] : [1, 1.6]}
      frameloop={reduced ? "demand" : "always"}
      camera={{ position: [0, 0, 9], fov: 42 }}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      fallback={<StaticFallback />}
    >
      <NeuralGraph pointer={pointer} reduced={reduced} mobile={mobile} />
    </Canvas>
  );
}
