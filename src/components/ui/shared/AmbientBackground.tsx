import React from "react";

type Theme = "home" | "dashboard" | "campaigns" | "create" | "auth" | "approve" | "strategy";

const gradients: Record<Theme, string[]> = {
  home: [
    "from-emerald-400/50 via-green-300/30",
    "from-orange-400/45 via-amber-300/25",
    "from-purple-400/40 via-violet-300/20",
    "from-yellow-400/35 via-orange-300/20",
  ],
  dashboard: [
    "from-amber-500/50 via-yellow-300/30",
    "from-purple-400/45 via-fuchsia-300/25",
    "from-green-400/40 via-emerald-300/20",
    "from-orange-500/35 via-amber-300/20",
  ],
  campaigns: [
    "from-purple-400/45 via-violet-300/25",
    "from-orange-400/45 via-amber-300/25",
    "from-emerald-400/40 via-green-300/20",
    "from-yellow-500/35 via-orange-300/20",
  ],
  create: [
    "from-amber-500/50 via-yellow-300/30",
    "from-purple-400/45 via-fuchsia-300/25",
    "from-green-400/40 via-emerald-300/20",
    "from-orange-500/35 via-amber-300/20",
  ],
  auth: [
    "from-orange-500/45 via-amber-400/30",
    "from-yellow-500/40 via-orange-300/25",
    "from-amber-600/35 via-yellow-400/20",
    "from-purple-400/30 via-violet-300/20",
  ],
  approve: [
    "from-emerald-400/50 via-green-300/30",
    "from-orange-400/45 via-amber-300/25",
    "from-purple-400/40 via-violet-300/20",
    "from-yellow-400/35 via-orange-300/20",
  ],
  strategy: [
    "from-yellow-200/25 via-orange-200/20",
    "from-orange-100/25 via-amber-100/25",
    "from-purple-200/20 via-violet-200/20",
    "from-emerald-100/20 via-green-100/30",
  ],
};

export default function AmbientBackground({
  children,
  theme = "home",
}: {
  children: React.ReactNode;
  theme?: Theme;
}) {
  const activeGradients = gradients[theme];

  return (
    <div className="relative min-h-[calc(100vh-4rem)] w-full overflow-hidden bg-stone-50 transition-colors duration-1000">
      {/* Soft diagonal color blobs */}
      <div aria-hidden="true" className={`pointer-events-none absolute -top-32 -left-20 h-[600px] w-[600px] rounded-full bg-gradient-to-br ${activeGradients[0]} to-transparent blur-[140px] transition-all duration-1000`} />
      <div aria-hidden="true" className={`pointer-events-none absolute -top-40 -right-20 h-[600px] w-[600px] rounded-full bg-gradient-to-bl ${activeGradients[1]} to-transparent blur-[140px] transition-all duration-1000`} />
      <div aria-hidden="true" className={`pointer-events-none absolute top-[40%] -right-32 h-[550px] w-[550px] rounded-full bg-gradient-to-l ${activeGradients[2]} to-transparent blur-[150px] transition-all duration-1000`} />
      <div aria-hidden="true" className={`pointer-events-none absolute top-[70%] -left-32 h-[600px] w-[600px] rounded-full bg-gradient-to-r ${activeGradients[3]} to-transparent blur-[160px] transition-all duration-1000`} />

      {/* Minimal dotted pattern overlay, faded toward edges */}
      {/* <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage: "radial-gradient(rgba(41,30,20,0.35) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
        }}
      /> */}

      <div className="relative z-10">{children}</div>
    </div>
  );
}