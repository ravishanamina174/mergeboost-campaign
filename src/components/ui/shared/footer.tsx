"use client";

import React from "react";

export default function Footer() {
  return (
    <footer className="relative w-full overflow-hidden bg-white text-zinc-600 font-sans">
      
      {/* ==========================================
          ANIMATED PASTEL BACKGROUND (Watercolor Wash)
      ========================================== */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        
        {/* Soft Pink */}
        <div
          className="absolute -top-32 left-[5%] h-[420px] w-[420px] rounded-full blur-[90px] opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(244,114,182,0.3) 0%, rgba(251,113,133,0.1) 50%, transparent 70%)",
            animation: "footerFloatOne 9s ease-in-out infinite",
          }}
        />

        {/* Soft Purple */}
        <div
          className="absolute top-[5%] right-[10%] h-[380px] w-[380px] rounded-full blur-[100px] opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(167,139,250,0.3) 0%, rgba(192,132,252,0.1) 50%, transparent 70%)",
            animation: "footerFloatTwo 11s ease-in-out infinite",
          }}
        />

        {/* Soft Blue/Cyan */}
        <div
          className="absolute -bottom-44 left-[32%] h-[460px] w-[460px] rounded-full blur-[100px] opacity-50"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(96,165,250,0.3) 0%, rgba(34,211,238,0.1) 50%, transparent 70%)",
            animation: "footerFloatThree 13s ease-in-out infinite",
          }}
        />

        {/* Soft Yellow/Orange */}
        <div
          className="absolute -bottom-32 -right-20 h-[400px] w-[400px] rounded-full blur-[90px] opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(250,204,21,0.3) 0%, rgba(251,146,60,0.1) 50%, transparent 70%)",
            animation: "footerFloatFour 10s ease-in-out infinite",
          }}
        />

        {/* Crisp overlay to maintain pure white contrast for text */}
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]" />
      </div>

      {/* ==========================================
          SILVER / GRAY MIX TOP BORDER
      ========================================== */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          backgroundImage:
            "linear-gradient(90deg, transparent 0%, #d1d5db 20%, #9ca3af 30%, #e5e7eb 30%, #cbd5e1 60%, transparent 100%)",
          backgroundSize: "200% 100%",
          animation: "footerBorderMove 8s linear infinite",
        }}
      />

      {/* ==========================================
          MAIN CONTAINER
      ========================================== */}
      <div className="relative z-10 max-w-[1220px] mx-auto px-6 py-16 sm:px-12">
        
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 justify-between">
          
          {/* ==========================================
              LEFT SIDE (25%) - BRAND IDENTITY
          ========================================== */}
          <div className="w-full lg:w-1/4 flex flex-col items-start space-y-5">
            
            {/* Doodle Logo */}
            <a href="/" className="flex items-start gap-3 group">
              <span className="text-2xl font-medium tracking-tight text-black group-hover:text-zinc-600 transition-colors">
                MergeBoost
              </span>
            </a>

            {/* Tagline / Value Proposition */}
            <p className="text-sm text-zinc-500 leading-relaxed font-medium">
              Adaptogenic nootropic drinks crafted for developers, gamers, and
              night-owl creators.
            </p>
          </div>

          {/* ==========================================
              RIGHT SIDE (75%) - LINKS & SOCIALS
          ========================================== */}
          <div className="w-full lg:w-3/4 grid grid-cols-1 sm:grid-cols-3 gap-12 lg:gap-16 pt-2 lg:pt-0">
            
            {/* Product Links */}
            <div>
              <h3 className="text-sm font-semibold text-black tracking-wider uppercase mb-5">
                Product
              </h3>

              <ul className="space-y-3 text-sm font-medium">
                <li>
                  <a href="/" className="hover:text-black hover:translate-x-1 inline-block transition-all duration-200">
                    Features
                  </a>
                </li>
                <li>
                  <a href="/" className="hover:text-black hover:translate-x-1 inline-block transition-all duration-200">
                    Workflow
                  </a>
                </li>
                <li>
                  <a href="/" className="hover:text-black hover:translate-x-1 inline-block transition-all duration-200">
                    Roles
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Links (DOODLE ICONS) */}
            <div>
              <h3 className="text-sm font-semibold text-black tracking-wider uppercase mb-5">
                Social
              </h3>

              <ul className="space-y-4 text-sm font-medium">
                
                {/* Twitter / X Doodle */}
                <li>
                  <a href="/" className="inline-flex items-center gap-3 hover:text-black transition-colors duration-200 group">
                    <div className="relative w-5 h-5">
                      <svg className="absolute top-0.5 left-0.5 w-5 h-5 text-blue-400 group-hover:text-blue-500 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                      <svg className="absolute top-0 left-0 w-5 h-5 text-black" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </div>
                    Twitter
                  </a>
                </li>

                {/* Instagram Doodle */}
                <li>
                  <a href="/" className="inline-flex items-center gap-3 hover:text-black transition-colors duration-200 group">
                    <div className="relative w-5 h-5">
                      <svg className="absolute top-1 left-1 w-5 h-5 text-pink-400 group-hover:text-pink-500 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                      </svg>
                      <svg className="absolute top-0 left-0 w-5 h-5 text-black bg-white rounded-md" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <rect x="3" y="3" width="18" height="18" rx="5" ry="5" />
                        <circle cx="12" cy="12" r="4" />
                        <path d="M17.5 6.5h.01" />
                      </svg>
                    </div>
                    Instagram
                  </a>
                </li>

                {/* Facebook Doodle */}
                <li>
                  <a href="/" className="inline-flex items-center gap-3 hover:text-black transition-colors duration-200 group">
                    <div className="relative w-5 h-5">
                      <svg className="absolute top-1 left-1 w-5 h-5 text-indigo-400 group-hover:text-indigo-500 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                      </svg>
                      <svg className="absolute top-0 left-0 w-5 h-5 text-black" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                      </svg>
                    </div>
                    Facebook
                  </a>
                </li>

              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-sm font-semibold text-black tracking-wider uppercase mb-5">
                Legal
              </h3>

              <ul className="space-y-3 text-sm font-medium">
                <li>
                  <a href="/" className="hover:text-black hover:translate-x-1 inline-block transition-all duration-200">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/" className="hover:text-black hover:translate-x-1 inline-block transition-all duration-200">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="/" className="hover:text-black hover:translate-x-1 inline-block transition-all duration-200">
                    Nootropic Disclaimers
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>

        {/* ==========================================
            BOTTOM COPYRIGHT BAR
        ========================================== */}
        <div className="mt-16 pt-8 border-t border-zinc-200 flex flex-col sm:flex-row justify-between items-center text-xs text-zinc-500 font-medium">
          
          <p>
            © {new Date().getFullYear()} MergeBoost. All rights reserved.
          </p>

          <p className="mt-2 sm:mt-0 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full border border-black bg-orange-400 inline-block animate-pulse"></span>
            Fueling late-night code & creativity.
          </p>

        </div>

      </div>

      {/* ==========================================
          ANIMATION KEYFRAMES
      ========================================== */}
      <style>{`
        @keyframes footerFloatOne {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(40px, 20px, 0) scale(1.05); }
        }

        @keyframes footerFloatTwo {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(-40px, 30px, 0) scale(1.1); }
        }

        @keyframes footerFloatThree {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(30px, -20px, 0) scale(1.08); }
        }

        @keyframes footerFloatFour {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(-30px, -25px, 0) scale(1.05); }
        }

        @keyframes footerBorderMove {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
      `}</style>

    </footer>
  );
}