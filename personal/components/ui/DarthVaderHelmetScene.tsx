"use client";

import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useEffect, useRef } from "react";

/* ================= DARTH VADER HELMET MODEL ================= */

function DarthVaderHelmetModel() {
  const { scene } = useGLTF("/darth_vader_helmet.glb");
  const ref = useRef<THREE.Group>(null);
  const { camera } = useThree();

  useEffect(() => {
    if (!ref.current) return;

    /* -------- Center the model -------- */
    const box = new THREE.Box3().setFromObject(ref.current);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    ref.current.position.sub(center);

    /* -------- Slight lift for floating feel -------- */
    ref.current.position.y += size.y * 0.05;

    /* -------- Fit camera to model -------- */
    const maxDim = Math.max(size.x, size.y, size.z);
    if (!(camera instanceof THREE.PerspectiveCamera)) return;

    const fov = (camera.fov * Math.PI) / 180;

    let cameraZ = maxDim / (2 * Math.tan(fov / 2));
    cameraZ *= 1.1; // cinematic padding

    camera.position.set(0, maxDim * 0.15, cameraZ);
    camera.near = cameraZ / 100;
    camera.far = cameraZ * 100;
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();

    /* -------- Material correction by material name -------- */
    ref.current.traverse((child: any) => {
      if (!child.isMesh) return;

      child.castShadow = true;
      child.receiveShadow = true;

      const matName = child.material?.name?.toLowerCase() || "";

      // 🖤 Graphite / pitted metal (helmet shell)
      if (matName.includes("graphite")) {
        child.material = new THREE.MeshStandardMaterial({
          color: "#0b0b0e",     // deep Vader black
          metalness: 0.65,
          roughness: 0.45,      // pitted texture
          envMapIntensity: 1.1,
        });
      }

      // ⚙️ Fine silver metal (vents / details)
      else if (matName.includes("silver")) {
        child.material = new THREE.MeshStandardMaterial({
          color: "#9ca3af",     // muted silver
          metalness: 0.8,
          roughness: 0.25,
          envMapIntensity: 1.4,
        });
      }

      // 🛡️ Fallback
      else {
        child.material = new THREE.MeshStandardMaterial({
          color: "#111827",
          metalness: 0.6,
          roughness: 0.35,
        });
      }
    });
  }, [camera]);

  return <primitive ref={ref} object={scene} />;
}

/* ================= SCENE WRAPPER ================= */

export default function DarthVaderHelmetScene() {
  return (
    <div className="relative h-screen w-full">
      <Canvas
        shadows
        camera={{ fov: 40 }}
        className="h-full w-full"
      >
        {/* ---------- LIGHTING ---------- */}

        {/* Low ambient to preserve contrast */}
        <ambientLight intensity={0.25} />

        {/* Golden key light (reveals black surface detail) */}
        <directionalLight
          position={[6, 10, 8]}
          intensity={5}
          color="#ff3131"   // warm gold
          castShadow
        />

        {/* Cool rim light (edge separation) */}
        <directionalLight
          position={[-6, 4, -6]}
          intensity={3}
          color="#e5e7eb"
        />

        {/* Soft warm bounce from below */}
        <directionalLight
          position={[0, -6, 4]}
          intensity={3}
          color="#fde68a"
        />

        {/* ---------- MODEL ---------- */}
        <DarthVaderHelmetModel />

        {/* ---------- CONTROLS ---------- */}
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate
          autoRotate
          autoRotateSpeed={0.35}
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
useGLTF.preload("/darth_vader_helmet.glb");
