import React from "react";

type Theme = "home" | "dashboard" | "campaigns" | "create" | "auth" | "approve";

const gradients: Record<Theme, string[]> = {
  home: [
    "from-orange-200/50 via-rose-200/35",
    "from-indigo-300/40 via-violet-200/30",
    "from-emerald-300/35 via-teal-200/20",
    "from-rose-300/35 via-orange-200/25",
  ],
  dashboard: [
    "from-orange-300/40 via-yellow-100/30", 
    "from-violet-300/40 via-fuchsia-200/30",
    "from-indigo-200/40 via-orange-200/20",
    "from-purple-300/30 via-teal-200/20",
  ],
  campaigns: [
    "from-fuchsia-300/40 via-pink-200/30",
    "from-violet-300/40 via-purple-200/30",
    "from-rose-200/40 via-orange-200/20",
    "from-purple-300/30 via-indigo-200/20",
  ],
  create: [
    "from-orange-300/40 via-yellow-100/30", 
    "from-violet-300/40 via-fuchsia-200/30",
    "from-indigo-200/40 via-orange-200/20",
    "from-purple-300/30 via-teal-200/20",
  ],
  auth: [
    "from-rose-200/50 via-orange-200/35",
    "from-amber-200/40 via-yellow-200/30",
    "from-orange-200/40 via-rose-200/20",
    "from-yellow-300/30 via-amber-200/20",
  ],
  approve: [
    "from-orange-200/50 via-rose-200/35",
    "from-indigo-300/40 via-violet-200/30",
    "from-emerald-300/35 via-teal-200/20",
    "from-rose-300/35 via-orange-200/25",
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
    <div className="relative min-h-[calc(100vh-4rem)] w-full overflow-hidden bg-white transition-colors duration-1000">
      <div aria-hidden="true" className={`pointer-events-none absolute -top-32 -left-20 h-[600px] w-[600px] rounded-full bg-gradient-to-br ${activeGradients[0]} to-transparent blur-[140px] transition-all duration-1000`} />
      <div aria-hidden="true" className={`pointer-events-none absolute -top-40 -right-20 h-[600px] w-[600px] rounded-full bg-gradient-to-bl ${activeGradients[1]} to-transparent blur-[140px] transition-all duration-1000`} />
      <div aria-hidden="true" className={`pointer-events-none absolute top-[40%] -right-32 h-[550px] w-[550px] rounded-full bg-gradient-to-l ${activeGradients[2]} to-transparent blur-[150px] transition-all duration-1000`} />
      <div aria-hidden="true" className={`pointer-events-none absolute top-[70%] -left-32 h-[600px] w-[600px] rounded-full bg-gradient-to-r ${activeGradients[3]} to-transparent blur-[160px] transition-all duration-1000`} />
      <div className="relative z-10">{children}</div>
    </div>
  );
}