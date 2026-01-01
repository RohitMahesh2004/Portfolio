"use client";

import { Button } from "@/components/ui/stateful-button";

export default function ActionFooter() {
  const handleClick = () =>
    new Promise((resolve) => setTimeout(resolve, 800));

  return (
    <div className="fixed bottom-0 left-0 z-30 w-full">
      {/* Glass footer bar */}
      <div
        className="
          mx-auto
          flex
          w-full
          max-w-5xl
          items-center
          justify-between
          gap-4
          px-6
          py-5
          backdrop-blur-xl
          bg-white/5
          border-t
          border-green-400/20
        "
      >
        {["Projects", "Resume", "Contact"].map((label) => (
          <Button
            key={label}
            onClick={handleClick}
            className="
              flex-1
              rounded-xl
              bg-white/5
              py-3
              text-sm
              font-light
              tracking-wide
              text-white/80
              ring-1
              ring-white/10
              transition-all
              duration-300

              hover:bg-emerald-400/15
              hover:text-emerald-300
              hover:ring-emerald-400/40
              hover:shadow-[0_0_30px_rgba(52,211,153,0.6)]
            "
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
}
