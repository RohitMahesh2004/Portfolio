"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useEffect, useRef } from "react";

/* ================= TREE MODEL ================= */

function TreeModel() {
  const { scene } = useGLTF("/old_tree.glb");
  const ref = useRef<THREE.Group>(null);
  const { camera } = useThree();

  useEffect(() => {
    if (!ref.current) return;

    /* -------- Center the model -------- */
    const box = new THREE.Box3().setFromObject(ref.current);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    ref.current.position.sub(center);

    /* -------- Move tree slightly UP -------- */
    ref.current.position.y += size.y * 0.15;

    /* -------- Fit camera -------- */
    const maxDim = Math.max(size.x, size.y, size.z);
    if (!(camera instanceof THREE.PerspectiveCamera)) return;
    
    const fov = (camera.fov * Math.PI) / 180;
    let cameraZ = maxDim / (2 * Math.tan(fov / 2));
    cameraZ *=0.9; // zoom-out padding

    camera.position.set(0, maxDim * 0.35, cameraZ);
    camera.near = cameraZ / 100;
    camera.far = cameraZ * 100;
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();

    /* -------- Apply colors by mesh name -------- */
    ref.current.traverse((child: any) => {
      if (!child.isMesh) return;

      child.castShadow = true;
      child.receiveShadow = true;

      const name = child.name.toLowerCase();

      // 🌳 Trunk
      if (name.includes("trunk")) {
        child.material = new THREE.MeshStandardMaterial({
          color: "#8b6f5a",
          roughness: 0.85,
          metalness: 0.05,
        });
      }

      // 🌿 Leaves
      else if (name.includes("leaf")) {
        child.material = new THREE.MeshStandardMaterial({
          color: "#f0a35e",
          roughness: 0.7,
          metalness: 0,
        });
      }

      // 🌲 Branches / treetop
      else if (name.includes("treetop")) {
        child.material = new THREE.MeshStandardMaterial({
          color: "#f2b6c6",
          roughness: 0.8,
          metalness: 0.05,
        });
      }
    });
  }, [camera]);

  return <primitive ref={ref} object={scene} />;
}

/* ================= SCENE WRAPPER ================= */

export default function TreeScene() {
  return (
    <div className="relative h-screen w-full">
      <Canvas
        shadows
        camera={{ fov: 45 }}
        className="h-full w-full"
      >
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[8, 12, 6]}
          intensity={1.2}
          castShadow
        />
        <directionalLight
          position={[-6, 4, -4]}
          intensity={0.4}
        />

        {/* Tree */}
        <TreeModel />

        {/* Controls */}
        <OrbitControls
          enablePan={false}
          enableRotate
          enableZoom={false}
          minDistance={4}
          maxDistance={14}
          rotateSpeed={0.6}
          zoomSpeed={0.7}
          dampingFactor={0.08}
          enableDamping
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 1.9}
        />
      </Canvas>
    </div>
  );
}

/* Preload */
useGLTF.preload("/old_tree.glb");
