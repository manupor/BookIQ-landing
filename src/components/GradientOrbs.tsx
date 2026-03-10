"use client";

export default function GradientOrbs() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
      {/* Aurora layer */}
      <div className="aurora-bg" />

      {/* Large vivid orbs */}
      <div className="orb absolute -top-40 -left-40 w-[700px] h-[700px] rounded-full bg-indigo-500/25" />
      <div className="orb orb-delay absolute top-1/4 -right-60 w-[600px] h-[600px] rounded-full bg-cyan-400/20" />
      <div className="orb orb-delay-2 absolute -bottom-20 left-1/4 w-[500px] h-[500px] rounded-full bg-violet-500/20" />

      {/* Secondary smaller orbs for depth */}
      <div className="orb orb-delay absolute top-2/3 right-1/4 w-[300px] h-[300px] rounded-full bg-blue-500/15" />
      <div className="orb orb-delay-2 absolute top-1/2 left-[10%] w-[250px] h-[250px] rounded-full bg-fuchsia-500/10" />

      {/* Particle field */}
      <div className="particle-field" />
    </div>
  );
}
