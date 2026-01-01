"use client";
import React from "react";
import { WavyBackground } from "@/components/ui/wavy-background";

export default function EmeraldWavyLayer() {
  return (
    <div className="pointer-events-none absolute inset-0 z-[3]">
      <WavyBackground
        className="
          h-full
          w-full
          opacity-60
          [--wave-color:rgba(16,185,129,0.35)]
          [--wave-secondary-color:rgba(16,185,129,0.18)]
          [--background-fill:transparent]
        "
      >
        {/* empty on purpose */}
      </WavyBackground>
    </div>
  );
}
