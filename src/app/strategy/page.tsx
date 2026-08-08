"use client";

import React from "react";
import AmbientBackground from "@/components/ui/shared/AmbientBackground";

export default function StrategyPage() {
  return (
    <AmbientBackground theme="strategy">
      <div className="max-w-3xl mx-auto px-6 pt-15 pb-32">
        
        {/* Page Header */}
        <header className="mb-12 border-b border-zinc-200 pb-8">
          {/* <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black text-white text-xs font-medium mb-4">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path></svg>
            MergeBoost Playbook
          </div> */}
          <h1 className="text-4xl font-bold text-zinc-900 tracking-tight mb-3">
            Strategy & Compliance
          </h1>
          <p className="text-base text-zinc-500 leading-relaxed">
            The official playbook for our social media presence. Review our core posting strategies, audience targets, and the privacy guidelines that keep our data secure.
          </p>
        </header>

        {/* Content Body - Book Style */}
        <article className="space-y-16">
          
          {/* ==========================================
              CHAPTER 1: SOCIAL MEDIA STRATEGY
          ========================================== */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-8 w-8 rounded-lg bg-zinc-900 text-white flex items-center justify-center font-bold text-sm shadow-xs">1</div>
              <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">Social Media Strategy</h2>
            </div>

            {/* 1. Best Posting Times */}
            <div className="mt-8 mb-10">
              <h3 className="text-lg font-semibold text-zinc-900 mb-4">Optimal Posting Schedule</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* X (Twitter) Card */}
                <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-[0_2px_12px_rgb(0,0,0,0.02)]">
                  <div className="font-semibold text-zinc-900 mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-zinc-900"></span> X (Twitter)
                  </div>
                  <ul className="text-sm text-zinc-600 space-y-2">
                    <li><strong className="text-zinc-700">Days:</strong> Tue - Thu</li>
                    <li><strong className="text-zinc-700">Hours:</strong> 8–10 AM & 12–1 PM</li>
                    <li><strong className="text-zinc-700">Cadence:</strong> 2–3x Daily</li>
                  </ul>
                </div>
                {/* LinkedIn Card */}
                <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-[0_2px_12px_rgb(0,0,0,0.02)]">
                  <div className="font-semibold text-blue-700 mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-600"></span> LinkedIn
                  </div>
                  <ul className="text-sm text-zinc-600 space-y-2">
                    <li><strong className="text-zinc-700">Days:</strong> Tue - Thu</li>
                    <li><strong className="text-zinc-700">Hours:</strong> 9 AM – 12 PM</li>
                    <li><strong className="text-zinc-700">Cadence:</strong> 3–5x Weekly</li>
                  </ul>
                </div>
                {/* Instagram Card */}
                <div className="bg-white border border-zinc-200 rounded-xl p-5 shadow-[0_2px_12px_rgb(0,0,0,0.02)]">
                  <div className="font-semibold text-pink-600 mb-2 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-pink-500"></span> Instagram
                  </div>
                  <ul className="text-sm text-zinc-600 space-y-2">
                    <li><strong className="text-zinc-700">Days:</strong> Mon - Wed</li>
                    <li><strong className="text-zinc-700">Hours:</strong> 11 AM–1 PM & 7–9 PM</li>
                    <li><strong className="text-zinc-700">Cadence:</strong> 3–5x Weekly</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 2. Suggested Hashtags */}
            <div className="mb-10">
              <h3 className="text-lg font-semibold text-zinc-900 mb-3">Hashtag Framework</h3>
              <p className="text-zinc-600 text-sm leading-relaxed mb-4">
                Maintain focus and avoid over-tagging. Target 1-2 tags on X, 3-5 high-relevance tags on LinkedIn, and up to 5-10 curated niche tags on Instagram.
              </p>
              <div className="bg-zinc-50 border border-zinc-200 rounded-lg p-4 space-y-3">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 block mb-1">Brand Identity</span>
                  <p className="text-sm text-blue-600 font-medium">#YourBrandName #CampaignName2026</p>
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 block mb-1">Industry & Community</span>
                  <p className="text-sm text-blue-600 font-medium">#DigitalMarketing #TechNews #SaaSGrowth</p>
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 block mb-1">Content Specific</span>
                  <p className="text-sm text-blue-600 font-medium">#ProductLaunch #ContentStrategy #MarketingTips</p>
                </div>
              </div>
            </div>

            {/* 3. Target Audience & 4. Objectives */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-zinc-900 mb-3">Target Audience</h3>
                <ul className="space-y-3 text-sm text-zinc-600 leading-relaxed list-inside list-disc marker:text-zinc-300">
                  <li><strong className="text-zinc-800">Demographics:</strong> Working professionals, marketers, and B2B buyers (Aged 24–45).</li>
                  <li><strong className="text-zinc-800">Psychographics:</strong> Tech-driven, value-oriented, and brand-conscious individuals.</li>
                  <li><strong className="text-zinc-800">Behavior:</strong> Highly active during business commutes, lunch breaks, and evening wind-downs.</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-zinc-900 mb-3">Campaign Objectives</h3>
                <ul className="space-y-3 text-sm text-zinc-600 leading-relaxed list-inside list-disc marker:text-zinc-300">
                  <li><strong className="text-zinc-800">Brand Awareness:</strong> Expand visual brand recall and overall platform reach.</li>
                  <li><strong className="text-zinc-800">Community Engagement:</strong> Drive meaningful conversations via direct interaction.</li>
                  <li><strong className="text-zinc-800">Lead Generation:</strong> Convert social traffic directly to product landing pages.</li>
                </ul>
              </div>
            </div>
          </section>

          <hr className="border-zinc-200" />

          {/* ==========================================
              CHAPTER 2: PRIVACY & COMPLIANCE
          ========================================== */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-8 w-8 rounded-lg bg-zinc-900 text-white flex items-center justify-center font-bold text-sm shadow-xs">2</div>
              <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">Privacy & Compliance</h2>
            </div>
            
            <p className="text-base text-zinc-600 leading-relaxed mb-8">
              Protecting user data and adhering to brand guidelines is strictly enforced across all workspace environments. Please review the mandatory policies below.
            </p>

            <div className="space-y-6">
              {/* Privacy Notice */}
              <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-[0_2px_12px_rgb(0,0,0,0.02)] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-zinc-900"></div>
                <h3 className="text-base font-bold text-zinc-900 mb-2">Privacy Notice</h3>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  We process basic user profile information via Clerk Authentication and collect user-generated content (post titles, images, and metadata). All images are hosted securely on Cloudflare R2, and database records remain strictly within our MongoDB clusters. This data is exclusively utilized for content creation and approval workflows.
                </p>
              </div>

              {/* User Consent */}
              <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-[0_2px_12px_rgb(0,0,0,0.02)] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-zinc-400"></div>
                <h3 className="text-base font-bold text-zinc-900 mb-2">User Consent & Permissions</h3>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  By utilizing this dashboard, users grant authorization to process and schedule content within the workspace. Access privileges—including drafting, approving, and system configurations—are strictly regulated by our Role-Based Access Control (RBAC) protocols designated for Creators, Approvers, and Admins.
                </p>
              </div>

              {/* Data Protection */}
              <div className="bg-white border border-zinc-200 rounded-xl p-6 shadow-[0_2px_12px_rgb(0,0,0,0.02)] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-zinc-300"></div>
                <h3 className="text-base font-bold text-zinc-900 mb-2">Data Protection Statement</h3>
                <p className="text-sm text-zinc-600 leading-relaxed">
                  Data in transit is secured using TLS/HTTPS encryption. Third-party integrations comply with standard enterprise data security regulations. Any user or administrator may request permanent deletion of draft posts, uploaded assets, or profile data at any time.
                </p>
              </div>

              {/* Social Media Guidelines */}
              <div className="bg-zinc-50 border border-zinc-200 rounded-xl p-6 shadow-[0_2px_12px_rgb(0,0,0,0.02)] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                <h3 className="text-base font-bold text-zinc-900 mb-3">Content & Social Media Guidelines</h3>
                <ul className="space-y-2 text-sm text-zinc-600 leading-relaxed">
                  <li className="flex gap-2">
                    <span className="text-emerald-500">✓</span> 
                    <span><strong>Brand Voice:</strong> Content must remain professional, authoritative, and engaging.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-emerald-500">✓</span> 
                    <span><strong>Asset Licensing:</strong> Creators are responsible for ensuring all uploaded media is original, royalty-free, or properly licensed.</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-emerald-500">✓</span> 
                    <span><strong>Compliance Review:</strong> All drafts must pass through the Content Approval queue to verify adherence to platform-specific terms of service before publishing.</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>
          
        </article>
      </div>
    </AmbientBackground>
  );
}