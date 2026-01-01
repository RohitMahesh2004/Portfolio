"use client";

import { useEffect, useRef } from "react";

export default function CursorCircle() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!cursorRef.current) return;

      cursorRef.current.style.transform = `translate3d(
        ${e.clientX - 10}px,
        ${e.clientY - 10}px,
        0
      )`;
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={cursorRef}
      className="
        pointer-events-none
        fixed top-0 left-0
        z-[9999]

        h-10 w-10
        rounded-full

        bg-emerald-400
        opacity-80

        transition-transform
        duration-75
        ease-out
      "
    />
  );
}
