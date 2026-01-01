"use client";

import React from "react";

export default function PageTitle({ title }: { title: string }) {
  return (
    <div className="pointer-events-none absolute left-10 top-28 z-20">
      {/* Glow */}
      <div
        className="
          absolute
          -inset-6
          rounded-full
          bg-[radial-gradient(circle_at_center,rgba(244,114,182,0.35),rgba(251,146,60,0.25),rgba(0,0,0,0)_70%)]
          blur-2xl
        "
      />

      {/* Text */}
      <h1
        className="
          relative
          text-5xl
          font-semibold
          tracking-wide
          text-transparent
          bg-clip-text
          bg-gradient-to-r
          from-pink-500
          via-rose-400
          to-orange-400
          drop-shadow-[0_2px_10px_rgba(244,114,182,0.35)]
          inter-var
        "
      >
        {title}
      </h1>
    </div>
  );
}
