import { useRef, useMemo, useEffect, useState, type FC } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface QuantumCoreProps {
  mouseCoords: { current: [number, number] };
}

// 3D Procedural Full-Viewport Quantum Core
const QuantumCore: FC<QuantumCoreProps> = ({ mouseCoords }) => {
  const groupRef = useRef<THREE.Group>(null);
  const crystalRef = useRef<THREE.Mesh>(null);
  const outerLatticeRef = useRef<THREE.LineSegments>(null);
  const innerRingRef = useRef<THREE.LineLoop>(null);
  const secondRingRef = useRef<THREE.LineLoop>(null);

  useFrame((_state, delta) => {
    if (!groupRef.current || !crystalRef.current) return;

    // Continuous celestial auto-rotation
    crystalRef.current.rotation.x += delta * 0.18;
    crystalRef.current.rotation.y += delta * 0.22;

    if (outerLatticeRef.current) {
      outerLatticeRef.current.rotation.x -= delta * 0.15;
      outerLatticeRef.current.rotation.y -= delta * 0.28;
    }

    if (innerRingRef.current) {
      innerRingRef.current.rotation.z += delta * 0.35;
    }
    if (secondRingRef.current) {
      secondRingRef.current.rotation.z -= delta * 0.25;
      secondRingRef.current.rotation.x += delta * 0.15;
    }

    // Dynamic mouse-reactive tilt and warp (desktop coordinates)
    const targetRotX = mouseCoords.current[1] * 0.55;
    const targetRotY = mouseCoords.current[0] * 0.65;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, delta * 3);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, delta * 3);

    // Dynamic procedural warping on mouse velocity & breathing pulse
    const mouseDist = Math.hypot(mouseCoords.current[0], mouseCoords.current[1]);
    const targetScale = 1 + mouseDist * 0.14 + Math.sin(_state.clock.elapsedTime * 1.8) * 0.04;
    groupRef.current.scale.setScalar(
      THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, delta * 3.5)
    );
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Translucent Velvet Plum Crystal Core (Non-blocking for typography) */}
      <mesh ref={crystalRef}>
        <icosahedronGeometry args={[2.2, 0]} />
        <meshPhysicalMaterial
          color="#381932"
          emissive="#9D4EDD"
          emissiveIntensity={0.6}
          roughness={0.1}
          metalness={0.9}
          transmission={0.6}
          thickness={1.2}
          transparent={true}
          opacity={0.45}
          depthWrite={false}
        />
      </mesh>

      {/* Outer Cyan Wireframe Geodesic Cage */}
      <lineSegments ref={outerLatticeRef}>
        <wireframeGeometry args={[new THREE.IcosahedronGeometry(2.8, 1)]} />
        <lineBasicMaterial color="#00F0FF" transparent opacity={0.6} linewidth={1} />
      </lineSegments>

      {/* Orbital Glowing Gyro Ring 1 */}
      <lineLoop ref={innerRingRef} rotation={[Math.PI / 3, 0, 0]}>
        <ringGeometry args={[3.3, 3.34, 64]} />
        <lineBasicMaterial color="#FFF3E6" transparent opacity={0.35} />
      </lineLoop>

      {/* Orbital Glowing Gyro Ring 2 */}
      <lineLoop ref={secondRingRef} rotation={[-Math.PI / 4, Math.PI / 6, 0]}>
        <ringGeometry args={[3.7, 3.73, 64]} />
        <lineBasicMaterial color="#00F0FF" transparent opacity={0.3} />
      </lineLoop>
    </group>
  );
};

// Procedural Particle Constellation (1,200 Star Nodes)
const ParticleSwarm: FC = () => {
  const pointsRef = useRef<THREE.Points>(null);
  const count = 1200;

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const cCyan = new THREE.Color("#00F0FF");
    const cMilk = new THREE.Color("#FFF3E6");
    const cPurple = new THREE.Color("#9D4EDD");

    for (let i = 0; i < count; i++) {
      const radius = 4 + Math.random() * 12;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);

      const dice = Math.random();
      const chosenColor = dice < 0.45 ? cCyan : dice < 0.8 ? cPurple : cMilk;
      col[i * 3] = chosenColor.r;
      col[i * 3 + 1] = chosenColor.g;
      col[i * 3 + 2] = chosenColor.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((_state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.03;
      pointsRef.current.rotation.x += delta * 0.015;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" count={count} args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.065}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
};

export const HeroCanvas: FC = () => {
  const mouseCoords = useRef<[number, number]>([0, 0]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseCoords.current = [
        (e.clientX / innerWidth) * 2 - 1,
        -(e.clientY / innerHeight) * 2 + 1,
      ];
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[10, 10, 8]} intensity={2.0} color="#00F0FF" />
        <pointLight position={[-8, -6, -5]} intensity={2.5} color="#9D4EDD" />
        <pointLight position={[0, 5, -3]} intensity={1.5} color="#FFF3E6" />
        <QuantumCore mouseCoords={mouseCoords} />
        <ParticleSwarm />
      </Canvas>
    </div>
  );
};
