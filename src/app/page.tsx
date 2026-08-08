"use client";

import AmbientBackground from "@/components/ui/shared/AmbientBackground";

export default function Home() {
  return (
    <>
      {/* 
        This wrapper ensures the background stays white and bright, 
        giving the "rich" clean aesthetic while keeping your ambient theme.
      */}
      <div className="min-h-screen bg-white/60 backdrop-blur-3xl">
        
        {/* ==========================================
            HORIZONTAL HERO SECTION
        ========================================== */}
        <section className="max-w-7xl mx-auto px-6 pt-24 pb-20 lg:pt-32 lg:pb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Text & CTAs */}
            <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
              
              {/* Animated Status Badge */}
              <div className="mb-6 inline-flex items-center gap-2 px-3 py-[4.3px] rounded-full bg-zinc-50 border border-zinc-200 text-zinc-700 text-sm font-medium hover:bg-zinc-100 transition-colors shadow-sm cursor-default hover:-translate-y-0.5 duration-300">
                <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-pulse"></span>
                Next-Gen Social Pipeline
              </div>

              {/* Rich Gradient Heading */}
              <h1 className="text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-zinc-900 via-zinc-700 to-zinc-500 drop-shadow-sm leading-[1.1] pb-1">
                Fuel Your Code & Creativity
              </h1>
              
              <p className="mt-6 text-lg text-zinc-600 max-w-lg font-sans leading-relaxed">
                The ultimate social media management platform for MergeBoost—adaptogenic nootropic drinks crafted for developers, gamers, and night-owl creators.
              </p>

              {/* CTA Buttons with Hover Effects */}
              <div className="mt-7 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <button className="px-6 py-2 rounded-full bg-zinc-900 text-white font-medium shadow-lg hover:shadow-xl hover:bg-zinc-800 hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto">
                  Start Publishing
                </button>
                <button className="px-6 py-2 rounded-full bg-white text-zinc-900 font-medium border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto">
                  Explore Workflow
                </button>
              </div>
            </div>

            {/* Right Column: Video Container */}
            <div className="w-full max-w-md mx-auto lg:max-w-full relative group">
              {/* Glowing backdrop effect on hover */}
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-400 via-brown-400 to-indigo-400 rounded-[24px] blur-md opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-500"></div>
              
              {/* Video Wrapper */}
              <div className="relative rounded-[16px] overflow-hidden border border-zinc-200 shadow-2xl bg-white transform transition-transform duration-500 group-hover:scale-[1.02]">
                
                {/* Optional UI Window Header (adds a SaaS dashboard vibe) */}
                <div className="bg-zinc-50 border-b border-zinc-200 px-4 py-2.5 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                  </div>
                  {/* <div className="mx-auto text-[10px] sm:text-xs font-medium text-zinc-400 font-mono tracking-wide">
                    dashboard.mergeboost.app
                  </div> */}
                  {/* Invisible spacer to balance the flex layout */}
                  <div className="w-[34px]"></div>
                </div>
                
                {/* The Header MP4 Video */}
                <video 
                  src="/header.mp4" 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

          </div>
        </section>

        {/* ==========================================
            FEATURES SECTION
        ========================================== */}
        <section className="max-w-7xl mx-auto px-6 pb-32">
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="group p-6 bg-white border border-zinc-200 rounded-lg  text-left transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-zinc-300 cursor-default">
              <div className="h-10 w-10 bg-zinc-100 text-zinc-700 rounded-lg flex items-center justify-center mb-4 group-hover:bg-zinc-900 group-hover:text-white transition-colors duration-300">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              </div>
              <h3 className="font-semibold text-zinc-900">Campaign Management</h3>
              <p className="mt-2 text-sm text-zinc-500 leading-relaxed">Track and plan "Late Night Release Sprints" and product drops seamlessly with automated tracking.</p>
            </div>
            
            <div className="group p-6 bg-white border border-zinc-200 rounded-lg  text-left transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-zinc-300 cursor-default">
              <div className="h-10 w-10 bg-zinc-100 text-zinc-700 rounded-lg flex items-center justify-center mb-4 group-hover:bg-zinc-900 group-hover:text-white transition-colors duration-300">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              </div>
              <h3 className="font-semibold text-zinc-900">Multi-Platform Posting</h3>
              <p className="mt-2 text-sm text-zinc-500 leading-relaxed">Publish content across Twitter/X, LinkedIn, and Instagram with built-in multi-tier approval workflows.</p>
            </div>
            
            <div className="group p-6 bg-white border border-zinc-200 rounded-lg  text-left transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-zinc-300 cursor-default">
              <div className="h-10 w-10 bg-zinc-100 text-zinc-700 rounded-lg flex items-center justify-center mb-4 group-hover:bg-zinc-900 group-hover:text-white transition-colors duration-300">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
              </div>
              <h3 className="font-semibold text-zinc-900">Audience Insights</h3>
              <p className="mt-2 text-sm text-zinc-500 leading-relaxed">Analyze performance during peak night-owl hours around 9:00 PM with real-time dynamic dashboard data.</p>
            </div>

          </div>
        </section>

      </div>
    </>
  );
}