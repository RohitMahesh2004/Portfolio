"use client";

import React from "react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "Internships", href: "#internships" },
  { label: "Projects", href: "#projects" },
  { label: "Achievements", href: "#achievements" },
];

export default function Navbar({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "fixed top-6 inset-x-0 z-50 flex justify-center",
        className
      )}
    >
      <nav
        className="
          flex items-center gap-6
          rounded-full
          bg-white/70
          px-8 py-3
          backdrop-blur-xl
          shadow-lg
          font-orbitron
          text-sm
          text-neutral-700
          dark:bg-black/50
          dark:text-neutral-200
        "
      >
        {NAV_ITEMS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="
              relative
              px-2 py-1
              transition-colors
              hover:text-emerald-500
            "
          >
            {item.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
