"use client";

import React, { useState, useEffect } from "react";
import AmbientBackground from "@/components/ui/shared/AmbientBackground";
import { useRouter } from "next/navigation";

export default function CreatePostPage() {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Post Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    targetPlatforms: [] as string[],
  });

  useEffect(() => {
    fetch("/api/campaigns")
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setCampaigns(json.data);
      });
  }, []);

  const togglePlatform = (platform: string) => {
    setFormData((prev) => ({
      ...prev,
      targetPlatforms: prev.targetPlatforms.includes(platform)
        ? prev.targetPlatforms.filter((p) => p !== platform)
        : [...prev.targetPlatforms, platform],
    }));
  };

  // Custom submit function that takes the intended status
  const submitPost = async (status: string) => {
    if (!selectedCampaign || formData.targetPlatforms.length === 0) return;
    
    // Basic validation to ensure fields are filled before allowing custom button submission
    if (!formData.title || !formData.description) {
        alert("Please fill out the title and description.");
        return;
    }
    
    setIsLoading(true);
    await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        ...formData, 
        campaignName: selectedCampaign,
        status: status // Explicitly passing the status to your API
      }),
    });

    setIsLoading(false);
    setSelectedCampaign(null); // Close modal
    router.push("/dashboard"); // Redirect to dashboard to see the post
  };

  return (
    <AmbientBackground theme="create">
      <div className="max-w-4xl mx-auto px-6 pt-12 pb-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Create Post</h1>
          <p className="text-zinc-500 mt-1 text-sm">Select a campaign to draft a new social media post.</p>
        </div>

        {/* Scrollable Campaign Selector Window */}
        <div className="bg-white border border-zinc-100 rounded-xl shadow-[0_2px_12px_rgb(0,0,0,0.03)] overflow-hidden">
          <div className="bg-zinc-50/50 px-6 py-4 border-b border-zinc-100">
            <h2 className="text-sm font-semibold text-zinc-900">Available Campaigns</h2>
          </div>
          <div className="max-h-[400px] overflow-y-auto p-4 space-y-3">
            {campaigns.map((campaign) => (
              <div 
                key={campaign._id} 
                onClick={() => setSelectedCampaign(campaign.name)}
                className="p-4 border border-zinc-100 rounded-lg hover:border-zinc-300 hover:shadow-xs cursor-pointer transition-all bg-white"
              >
                <h3 className="font-medium text-zinc-900">{campaign.name}</h3>
                <p className="text-sm text-zinc-500 mt-1 line-clamp-1">{campaign.goal}</p>
              </div>
            ))}
            {campaigns.length === 0 && <p className="text-sm text-zinc-500 p-4">No campaigns found.</p>}
          </div>
        </div>
      </div>

      {/* Modern Post Creation Pop-Up Modal */}
      {selectedCampaign && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-zinc-100">
              <div>
                <h2 className="text-lg font-bold text-zinc-900">Draft Post</h2>
                <p className="text-xs text-zinc-500 mt-1">For: {selectedCampaign}</p>
              </div>
              <button onClick={() => setSelectedCampaign(null)} className="text-zinc-400 hover:text-zinc-700">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
            
            {/* Form replaced with a div to prevent default submit conflicting with dual buttons */}
            <div className="p-6 flex flex-col gap-5">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Post Title</label>
                <input 
                  required 
                  value={formData.title} 
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent" 
                  placeholder="Internal reference title" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Caption / Description</label>
                <textarea 
                  required 
                  value={formData.description} 
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent resize-none h-28" 
                  placeholder="What do you want to say?" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">Target Platforms</label>
                <div className="flex gap-3">
                  {["X (Twitter)", "LinkedIn", "Instagram"].map((platform) => (
                    <button
                      key={platform} type="button"
                      onClick={() => togglePlatform(platform)}
                      className={`px-3 py-1.5 text-xs font-medium border rounded-md transition-colors ${
                        formData.targetPlatforms.includes(platform) ? "bg-zinc-900 text-white border-zinc-900" : "bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50"
                      }`}
                    >
                      {platform}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mt-2 flex justify-end gap-3 pt-4 border-t border-zinc-100">
                <button 
                  type="button" 
                  onClick={() => setSelectedCampaign(null)} 
                  className="px-4 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-50 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                
                {/* Draft Button */}
                <button 
                  type="button" 
                  onClick={() => submitPost("Draft")}
                  disabled={isLoading || formData.targetPlatforms.length === 0} 
                  className="bg-white border border-zinc-200 hover:bg-zinc-50 text-zinc-700 px-4 py-2 rounded-lg text-sm font-medium shadow-xs transition-colors disabled:opacity-50"
                >
                  {isLoading ? "Saving..." : "Save as Draft"}
                </button>

                {/* Send for Approval Button */}
                <button 
                  type="button" 
                  onClick={() => submitPost("Pending Approval")}
                  disabled={isLoading || formData.targetPlatforms.length === 0} 
                  className="bg-zinc-900 hover:bg-black text-white px-4 py-2 rounded-lg text-sm font-medium shadow-xs transition-colors disabled:opacity-50"
                >
                  {isLoading ? "Sending..." : "Send for Approval"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AmbientBackground>
  );
}