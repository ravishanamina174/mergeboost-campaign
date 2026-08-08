"use client";

import AmbientBackground from "@/components/ui/shared/AmbientBackground";

export default function CampaignsPage() {


  return (
    <AmbientBackground theme="campaigns">
      <div className="max-w-5xl mx-auto px-6 pt-12 pb-24 relative">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Draft Posts</h1>
          </div>
        </div>
      </div>
    </AmbientBackground>
  );
}