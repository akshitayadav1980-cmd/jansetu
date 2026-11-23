import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import { Users, Landmark, GraduationCap, Building2 } from 'lucide-react';

// Stakeholder Hub node locations in spherical coordinates (lat, lon) converted to 3D Cartesian
const STAKEHOLDERS = [
  {
    id: 'citizens',
    name: 'Citizens & Communities',
    role: 'Grassroots Problem Reporting',
    icon: Users,
    color: '#06B6D4', // Cyan
    lat: 22,
    lon: 78,
  },
  {
    id: 'government',
    name: 'Government Nodal Desks',
    role: 'Validation & Grant Allocation',
    icon: Landmark,
    color: '#3B82F6', // Electric Blue
    lat: 38,
    lon: 25,
  },
  {
    id: 'universities',
    name: 'Universities & R&D Labs',
    role: 'Faculty & Student Innovation',
    icon: GraduationCap,
    color: '#8B5CF6', // Purple-indigo
    lat: -15,
    lon: 115,
  },
  {
    id: 'industry',
    name: 'Industry & CSR Partners',
    role: 'Pledge Grants & Scale Solutions',
    icon: Building2,
    color: '#10B981', // Emerald
    lat: -28,
    lon: -48,
  },
];

function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

// Generate quadratic bezier curve points between two sphere positions
function createGreatCircleArc(p1: THREE.Vector3, p2: THREE.Vector3, elevation = 0.45, segments = 32): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const mid = p1.clone().add(p2).multiplyScalar(0.5);
  const midLength = mid.length();
  mid.normalize().multiplyScalar(midLength + elevation);

  const curve = new THREE.QuadraticBezierCurve3(p1, mid, p2);
  for (let i = 0; i <= segments; i++) {
    points.push(curve.getPoint(i / segments));
  }
  return points;
}

// Network Line Mesh between hubs
const NetworkArcs: React.FC<{ hubPositions: THREE.Vector3[] }> = ({ hubPositions }) => {
  const lines = useMemo(() => {
    const list: THREE.Vector3[][] = [];
    for (let i = 0; i < hubPositions.length; i++) {
      for (let j = i + 1; j < hubPositions.length; j++) {
        list.push(createGreatCircleArc(hubPositions[i], hubPositions[j]));
      }
    }
    return list;
  }, [hubPositions]);

  return (
    <group>
      {lines.map((pts, idx) => {
        const geometry = new THREE.BufferGeometry().setFromPoints(pts);
        return (
          <primitive key={idx} object={new THREE.Line(
            geometry,
            new THREE.LineBasicMaterial({
              color: idx % 2 === 0 ? 0x06b6d4 : 0x3b82f6,
              transparent: true,
              opacity: 0.55,
              linewidth: 1.5,
            })
          )} />
        );
      })}
    </group>
  );
};

// Orbiting ambient particles
const OrbitingParticles: React.FC<{ count?: number; radius?: number }> = ({ count = 180, radius = 2.8 }) => {
  const meshRef = useRef<THREE.Points>(null!);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const colorA = new THREE.Color('#38bdf8');
    const colorB = new THREE.Color('#818cf8');

    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = radius + (Math.random() - 0.5) * 0.8;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      const mixed = colorA.clone().lerp(colorB, Math.random());
      col[i * 3] = mixed.r;
      col[i * 3 + 1] = mixed.g;
      col[i * 3 + 2] = mixed.b;
    }
    return [pos, col];
  }, [count, radius]);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.05;
      meshRef.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// Core Interactive Rotating Globe
const GlobeCore: React.FC<{ mousePos: { x: number; y: number } }> = ({ mousePos }) => {
  const groupRef = useRef<THREE.Group>(null!);
  const [hoveredHub, setHoveredHub] = useState<string | null>(null);

  const sphereRadius = 2.1;

  const hubPositions = useMemo(() => {
    return STAKEHOLDERS.map(s => latLonToVector3(s.lat, s.lon, sphereRadius));
  }, [sphereRadius]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      // Base gentle rotation
      groupRef.current.rotation.y += delta * 0.12;

      // Smooth mouse-responsive parallax inclination
      const targetRotX = mousePos.y * 0.35;
      const targetRotZ = -mousePos.x * 0.35;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, delta * 2.5);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, targetRotZ, delta * 2.5);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Dark Inner Base Globe */}
      <mesh>
        <sphereGeometry args={[sphereRadius, 48, 48]} />
        <meshStandardMaterial
          color="#080e1b"
          roughness={0.85}
          metalness={0.2}
          emissive="#061226"
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* Cyber Wireframe Grid Layer */}
      <mesh>
        <sphereGeometry args={[sphereRadius + 0.015, 32, 24]} />
        <meshBasicMaterial
          color="#1e3a8a"
          wireframe
          transparent
          opacity={0.22}
        />
      </mesh>

      {/* Subtle Glowing Atmosphere Halo */}
      <mesh>
        <sphereGeometry args={[sphereRadius + 0.08, 36, 36]} />
        <meshBasicMaterial
          color="#0284c7"
          transparent
          opacity={0.06}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Arcs Connecting the 4 Stakeholders */}
      <NetworkArcs hubPositions={hubPositions} />

      {/* 4 Stakeholder Hub Nodes */}
      {STAKEHOLDERS.map((hub, index) => {
        const pos = hubPositions[index];
        const isHovered = hoveredHub === hub.id;
        const IconComponent = hub.icon;

        return (
          <group key={hub.id} position={pos}>
            {/* Glowing Center Pin */}
            <mesh
              onPointerOver={(e) => { e.stopPropagation(); setHoveredHub(hub.id); }}
              onPointerOut={(e) => { e.stopPropagation(); setHoveredHub(null); }}
            >
              <sphereGeometry args={[0.075, 16, 16]} />
              <meshBasicMaterial color={hub.color} />
            </mesh>

            {/* Pulsing Outer Node Ring */}
            <mesh>
              <ringGeometry args={[0.09, 0.13, 24]} />
              <meshBasicMaterial
                color={hub.color}
                side={THREE.DoubleSide}
                transparent
                opacity={isHovered ? 0.9 : 0.4}
              />
            </mesh>

            {/* Stakeholder Label Billboard HTML */}
            <Html
              position={[0, 0.18, 0]}
              center
              distanceFactor={8.5}
              style={{
                pointerEvents: 'none',
                userSelect: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              <div className={`transition-all duration-300 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wide border shadow-xl backdrop-blur-md ${
                isHovered
                  ? 'bg-navy-900/95 border-cyan-400 text-white scale-110 z-20'
                  : 'bg-navy-950/80 border-white/10 text-slate-200'
              }`}>
                <IconComponent className="w-3.5 h-3.5" style={{ color: hub.color }} />
                <span>{hub.name.split(' ')[0]}</span>
              </div>
            </Html>
          </group>
        );
      })}

      {/* Ambient Orbiting Network Particles */}
      <OrbitingParticles count={140} radius={2.7} />
    </group>
  );
};

// Fallback HTML / SVG view if WebGL fails or crashes
const GlobeFallback: React.FC = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center relative p-8">
      <div className="w-72 h-72 rounded-full border border-cyan-500/30 flex items-center justify-center relative animate-pulse-slow">
        <div className="w-56 h-56 rounded-full border border-blue-500/40 flex items-center justify-center">
          <div className="w-40 h-40 rounded-full bg-gradient-to-tr from-blue-950 to-cyan-900/40 border border-cyan-400/50 shadow-2xl flex items-center justify-center">
            <span className="text-cyan-400 font-bold text-sm tracking-wider uppercase">JanSetu Hub</span>
          </div>
        </div>
        {STAKEHOLDERS.map((s, idx) => (
          <div
            key={s.id}
            className="absolute p-2 rounded-full bg-navy-900 border border-cyan-400/60 shadow-lg text-xs text-white"
            style={{
              top: `${50 + 40 * Math.sin((idx * Math.PI) / 2)}%`,
              left: `${50 + 40 * Math.cos((idx * Math.PI) / 2)}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            {s.name.split(' ')[0]}
          </div>
        ))}
      </div>
    </div>
  );
};

export const InteractiveGlobe: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hasWebGLError, setHasWebGLError] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
    setMousePos({ x, y });
  };

  if (hasWebGLError) {
    return <GlobeFallback />;
  }

  return (
    <div 
      className="w-full h-[540px] md:h-[620px] relative cursor-grab active:cursor-grabbing select-none"
      onMouseMove={handleMouseMove}
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-60" />
      
      {/* Canvas */}
      <Canvas
        camera={{ position: [0, 0, 5.8], fov: 45 }}
        onCreated={({ gl }) => {
          gl.setClearColor('#000000', 0);
        }}
        onError={() => setHasWebGLError(true)}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[6, 4, 5]} intensity={1.5} color="#e0f2fe" />
        <pointLight position={[-6, -4, -4]} intensity={0.8} color="#38bdf8" />

        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
          <GlobeCore mousePos={mousePos} />
        </Float>
      </Canvas>

      {/* Mini legend badge */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-3 px-4 py-1.5 rounded-full glass-panel text-[11px] text-slate-300 pointer-events-none border border-white/10 shadow-lg">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          4 Stakeholder Triangulation Active
        </span>
        <span className="text-slate-600">|</span>
        <span className="text-slate-400">Interactive 3D Network</span>
      </div>
    </div>
  );
};
