"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef } from "react";

function LiquidPlane() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      (meshRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value =
        clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={meshRef} scale={[10, 10, 1]}>
      <planeGeometry args={[1, 1, 64, 64]} />
      <shaderMaterial
        uniforms={{
          uTime: { value: 0 },
        }}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
          }
        `}
        fragmentShader={`
          varying vec2 vUv;
          uniform float uTime;

          void main() {
            vec2 uv = vUv;

            float wave =
              sin(uv.x * 10.0 + uTime) * 0.05 +
              sin(uv.y * 14.0 + uTime * 1.2) * 0.05;

            vec3 green1 = vec3(0.0, 0.9, 0.6);
            vec3 green2 = vec3(0.0, 0.3, 0.2);

            vec3 color = mix(green1, green2, uv.y + wave);

            gl_FragColor = vec4(color, 1.0);
          }
        `}
      />
    </mesh>
  );
}

export default function LiquidGreenBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 2] }}>
        <LiquidPlane />
      </Canvas>
    </div>
  );
}
