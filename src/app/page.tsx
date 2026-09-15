"use client";

import React, { useState } from "react";
import AmbientBackground from "@/components/ui/shared/AmbientBackground";
import MergeboostWatermark from "@/components/ui/shared/watermark";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {/* 
        This wrapper ensures the background stays white and bright, 
        giving the "rich" clean aesthetic while keeping your ambient theme.
      */}
      <div className="min-h-screen bg-white/60 backdrop-blur-3xl relative">
        
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
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="px-6 py-2 rounded-full bg-zinc-900 text-white font-medium shadow-lg hover:shadow-xl hover:bg-zinc-800 hover:-translate-y-1 transition-all duration-300 w-full sm:w-auto"
                >
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

        {/* ==========================================
            WATERMARK SECTION
        ========================================== */}
        <div className="mt-20 mb-20 pb-8 flex justify-center">
          <MergeboostWatermark />
        </div>

      </div>

      {/* ==========================================
          PUBLISHING WORKFLOW MODAL
      ========================================== */}
{isModalOpen && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200">
    
    {/* Modal Container */}
    <div className="relative w-full max-w-4xl bg-[#09090b] border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
      
      {/* Top Glowing Gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-48 overflow-hidden pointer-events-none">
        <div className="absolute -top-24 left-[10%] w-72 h-72 rounded-full bg-purple-500/20 blur-3xl animate-pulse"></div>
        <div className="absolute -top-28 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-blue-500/15 blur-3xl animate-pulse [animation-delay:700ms]"></div>
        <div className="absolute -top-24 right-[10%] w-72 h-72 rounded-full bg-orange-500/15 blur-3xl animate-pulse [animation-delay:1400ms]"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-40 bg-gradient-to-b from-purple-500/5 via-blue-500/5 to-transparent blur-3xl"></div>
      </div>

      {/* Close Button */}
      <button
        onClick={() => setIsModalOpen(false)}
        className="absolute top-5 right-5 p-2 text-zinc-400 hover:text-white transition-colors rounded-full hover:bg-zinc-800 z-20"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div className="p-8 sm:p-12 text-center relative z-10 flex flex-col items-center">
        
        <h2 className="text-3xl sm:text-4xl font-semibold text-white mb-4 tracking-tight">
          The content engine that gets work done
        </h2>

        <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto mb-12 leading-relaxed">
          Meet your automated publishing pipeline. Draft your ideas, get the team's sign-off, and watch your campaigns deploy end-to-end to hit peak audience hours.
        </p>

        {/* Creators User Flow */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-4 w-full max-w-3xl bg-zinc-900/50 border border-zinc-800/80 rounded-2xl p-8 backdrop-blur-sm">
          
          {/* 1. Create */}
          <div className="flex flex-col items-center flex-1">
            <div className="w-14 h-14 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(255,255,255,0.03)] text-indigo-400">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                />
              </svg>
            </div>
            <h3 className="text-white font-medium text-sm">1. Create</h3>
            <p className="text-zinc-500 text-xs mt-1.5 text-center">
              Draft your concept
            </p>
          </div>

          {/* Arrow */}
          <div className="hidden sm:block text-zinc-700">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>

          {/* 2. Approve */}
          <div className="flex flex-col items-center flex-1">
            <div className="w-14 h-14 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(255,255,255,0.03)] text-emerald-400">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-white font-medium text-sm">2. Approve</h3>
            <p className="text-zinc-500 text-xs mt-1.5 text-center">
              Team signs off
            </p>
          </div>

          {/* Arrow */}
          <div className="hidden sm:block text-zinc-700">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>

          {/* 3. Publish */}
          <div className="flex flex-col items-center flex-1">
            <div className="w-14 h-14 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(255,255,255,0.03)] text-orange-400">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </div>
            <h3 className="text-white font-medium text-sm">3. Publish</h3>
            <p className="text-zinc-500 text-xs mt-1.5 text-center">
              Deploy to channels
            </p>
          </div>

          {/* Arrow */}
          <div className="hidden sm:block text-zinc-700">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>

          {/* 4. Goal */}
          <div className="flex flex-col items-center flex-1">
            <div className="w-14 h-14 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(255,255,255,0.03)] text-rose-400">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <circle cx="12" cy="12" r="10" strokeWidth={1.5} />
                <circle cx="12" cy="12" r="6" strokeWidth={1.5} />
                <circle cx="12" cy="12" r="2" strokeWidth={1.5} />
              </svg>
            </div>
            <h3 className="text-white font-medium text-sm">4. Goal</h3>
            <p className="text-zinc-500 text-xs mt-1.5 text-center">
              Hit peak reach
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-12">
          <button 
            onClick={() => setIsModalOpen(false)}
            className="px-6 py-2.5 rounded-full bg-white text-zinc-900 font-semibold text-sm hover:bg-zinc-200 transition-colors flex items-center gap-2"
          >
            Enter Workspace
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </button>
        </div>

      </div>
    </div>
  </div>
)}
    </>
  );
}