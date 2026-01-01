"use client";

import React, { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls, useAnimations } from "@react-three/drei";
import * as THREE from "three";

/* ===================== MODEL ===================== */

function Model() {
  const { scene, nodes, animations } = useGLTF("/baby_yoda_idle.glb") as any;
  const { actions, names } = useAnimations(animations, scene);

  useEffect(() => {
    // ▶ Play idle animation
    if (names.length > 0) {
      actions[names[0]]?.reset().fadeIn(0.5).play();
    }

    // ▶ High-end material setup
    const skinMat = new THREE.MeshStandardMaterial({
      color: "#7A9F7F",
      roughness: 0.1,
    });

    const robeMat = new THREE.MeshStandardMaterial({
      color: "#C5A880",
      roughness: 0.9,
    });

    const eyeMat = new THREE.MeshStandardMaterial({
      color: "#000000",
      roughness: 0,
    });

    // ▶ Assign materials safely
    Object.keys(nodes).forEach((key) => {
      const node = nodes[key];
      if (!node || !node.isMesh) return;

      if ([ "head", "hands"].includes(key)) {
        node.material = skinMat;
      }

      if (key === "collar" || key ==="body") {
        node.material = robeMat;
      }

      if (key.toLowerCase().includes("eye")) {
        node.material = eyeMat;
      }
    });
  }, [nodes, actions, names]);

  // ▶ True visual centering (bounding-box based)
  useEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const center = new THREE.Vector3();
    box.getCenter(center);

    scene.position.sub(center);
  }, [scene]);

  return <primitive object={scene} scale={45} />;
}

/* ===================== SCENE ===================== */

export default function BabyYodaScene() {
  return (
    <div className="h-screen w-screen">
      <Canvas
        camera={{ position: [0, 1.3, 9], fov: 45 }}
        gl={{ alpha: true }}
        onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
      >
        {/* Lighting */}
        <ambientLight intensity={1.39} />
        <directionalLight position={[6, 8, 6]} intensity={1.8} />
        <directionalLight position={[-4, 6, -4]} intensity={0.6} />

        {/* Model */}
        <Suspense fallback={null}>
          <Model />
        </Suspense>

        {/* Locked camera */}
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={true}
          target={[0, 0, 0]}
          makeDefault
        />
      </Canvas>
    </div>
  );
}

/* ===================== PRELOAD ===================== */
useGLTF.preload("/baby_yoda_idle.glb");
