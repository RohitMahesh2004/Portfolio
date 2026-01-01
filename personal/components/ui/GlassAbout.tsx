"use client";

export default function GlassAbout() {
  return (
    <div
      className="
        absolute
        bottom-[8%]
        left-1/2
        -translate-x-1/2
        z-30
        max-w-xl
        px-6
        py-5
        rounded-2xl

        bg-white/5
        backdrop-blur-xl
        border
        border-white/15

        shadow-[0_0_40px_rgba(80,255,200,0.12)]
      "
    >
      <p
        className="
          font-orbitron
          text-sm
          md:text-base
          text-emerald-200/90
          leading-relaxed
          text-center
        "
      >
        Designing systems that think, adapt, and endure.
      </p>
    </div>
  );
}
