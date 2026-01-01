"use client";

export default function NameOverlay() {
  return (
    <>
      {/* Rohit — top-left */}
      <div className="pointer-events-none absolute left-[10vw] top-[18vh] z-[5]">
        <span
          className="
            font-orbitron
           
            text-[8.5vw]
            leading-none
            whitespace-nowrap
            select-none
            text-[#2f6f5b]

           /* RADIAL GREEN TEXT */
    bg-[radial-gradient(circle_at_50%_40%,#9fffdc_0%,#45f0c2_35%,#1f7f63_70%,#0c3f2f_100%)]
    bg-clip-text
    text-transparent

    /* DEPTH */
    drop-shadow-[0_10px_24px_rgba(69,240,194,0.6)]

    /* NEON GLOW */
    [text-shadow:
      0_0_18px_rgba(69,240,194,0.55),
      0_0_40px_rgba(69,240,194,0.35),
      0_0_80px_rgba(69,240,194,0.2)
    ]
          "
        >
          ROHIT &nbsp;&nbsp;&nbsp; MAHESH
        </span>
      </div>
    </>
  );
}
