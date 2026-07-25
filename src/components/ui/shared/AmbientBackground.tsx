import React from "react";

export default function AmbientBackground({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] w-full overflow-hidden bg-white">
      {/* 1. Top-Left Ambient Glow (Warm Coral / Orange) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-20 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-orange-200/50 via-rose-200/35 to-transparent blur-[140px]"
      />

      {/* 2. Top-Right Ambient Glow (Soft Indigo / Violet) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-20 h-[600px] w-[600px] rounded-full bg-gradient-to-bl from-indigo-300/40 via-violet-200/30 to-transparent blur-[140px]"
      />

      {/* 3. Mid-Right Ambient Glow (Soft Emerald / Mint for MergeBoost vibe) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[40%] -right-32 h-[550px] w-[550px] rounded-full bg-gradient-to-l from-emerald-300/35 via-teal-200/20 to-transparent blur-[150px]"
      />

      {/* 4. Lower-Left Ambient Glow (Soft Rose / Coral) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[70%] -left-32 h-[600px] w-[600px] rounded-full bg-gradient-to-r from-rose-300/35 via-orange-200/25 to-transparent blur-[160px]"
      />

      {/* Foreground Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}