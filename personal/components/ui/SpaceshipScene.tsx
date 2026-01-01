"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useEffect, useRef } from "react";

/* ================= SPACESHIP MODEL ================= */

function SpaceshipModel() {
  const { scene } = useGLTF("/spaceship.glb");
  const ref = useRef<THREE.Group>(null);
  const { camera } = useThree();

  useEffect(() => {
    if (!ref.current) return;

    /* -------- Center the model -------- */
    const box = new THREE.Box3().setFromObject(ref.current);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    ref.current.position.sub(center);

    /* -------- Lift slightly (spaceships feel better floating) -------- */
    ref.current.position.y += size.y * 0.1;

    /* -------- Fit camera to model -------- */
    const maxDim = Math.max(size.x, size.y, size.z);
    if (!(camera instanceof THREE.PerspectiveCamera)) return;
    
    const fov = (camera.fov * Math.PI) / 180;
    let cameraZ = maxDim / (2 * Math.tan(fov / 2));
    cameraZ *= 0.85;

    camera.position.set(0, maxDim * 0.25, cameraZ);
    camera.near = cameraZ / 100;
    camera.far = cameraZ * 100;
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();

    /* -------- Apply materials (grey / white / light blue) -------- */
    let meshIndex = 0;

    ref.current.traverse((child: any) => {
      if (!child.isMesh) return;

      child.castShadow = true;
      child.receiveShadow = true;

      // Color palette
      const palette = [
        { color: "#d1d5db", metalness: 0.6, roughness: 0.35 }, // light grey
        { color: "#f8fafc", metalness: 0.4, roughness: 0.45 }, // soft white
        { color: "#ffffff", metalness: 0.25, roughness: 0.3 }, // light blue
      ];

      const { color, metalness, roughness } =
        palette[meshIndex % palette.length];

      child.material = new THREE.MeshStandardMaterial({
        color,
        metalness,
        roughness,
        envMapIntensity: 1.2,
      });

      meshIndex++;
    });
  }, [camera]);

  return <primitive ref={ref} object={scene} />;
}

/* ================= SCENE WRAPPER ================= */

export default function SpaceshipScene() {
  return (
    <div className="relative h-screen w-full">
      <Canvas
        shadows
        camera={{ fov: 42 }}
        className="h-full w-full"
      >
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 12, 8]}
          intensity={1.3}
          castShadow
        />
        <directionalLight
          position={[-6, 4, -6]}
          intensity={0.4}
        />

        {/* Spaceship */}
        <SpaceshipModel />

        {/* Controls */}
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate
          autoRotate
          autoRotateSpeed={0.45}
          rotateSpeed={0.6}
          dampingFactor={0.08}
          enableDamping
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.85}
        />
      </Canvas>
    </div>
  );
}

/* Preload */
useGLTF.preload("/spaceship.glb");
