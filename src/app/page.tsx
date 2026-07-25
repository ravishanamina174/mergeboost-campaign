import AmbientBackground from "@/components/ui/shared/AmbientBackground";

export default function Home() {
  return (
    <AmbientBackground>
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-16 flex flex-col items-center text-center">
        <h1 className="text-5xl font-extrabold tracking-tight text-zinc-900 sm:text-6xl max-w-3xl">
          Fuel Your Code & Creativity
        </h1>
        <p className="mt-6 text-lg text-zinc-600 max-w-2xl font-sans">
          The ultimate social media management platform for MergeBoost—adaptogenic nootropic drinks crafted for developers, gamers, and night-owl creators.
        </p>
      </section>

      {/* Features Grid Section */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white/70 backdrop-blur-sm border border-zinc-200/80 rounded-[0.4rem] shadow-xs text-left">
            <h3 className="font-semibold text-zinc-900">Campaign Management</h3>
            <p className="mt-2 text-sm text-zinc-600">Track and plan "Late Night Release Sprints" and product drops seamlessly.</p>
          </div>

          <div className="p-6 bg-white/70 backdrop-blur-sm border border-zinc-200/80 rounded-[0.4rem] shadow-xs text-left">
            <h3 className="font-semibold text-zinc-900">Multi-Platform Posting</h3>
            <p className="mt-2 text-sm text-zinc-600">Publish content across Twitter/X, LinkedIn, and Instagram with approval workflows.</p>
          </div>

          <div className="p-6 bg-white/70 backdrop-blur-sm border border-zinc-200/80 rounded-[0.4rem] shadow-xs text-left">
            <h3 className="font-semibold text-zinc-900">Audience Insights</h3>
            <p className="mt-2 text-sm text-zinc-600">Analyze performance during peak night-owl hours around 9:00 PM.</p>
          </div>
        </div>
      </section>

      {/* Add more components below easily! */}
    </AmbientBackground>
  );
}