"use client";

import React, { useState, useEffect } from "react";
import AmbientBackground from "@/components/ui/shared/AmbientBackground";

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", goal: "" });
  const [isLoading, setIsLoading] = useState(false);

  // Fetch campaigns on load
  const fetchCampaigns = async () => {
    const res = await fetch("/api/campaigns");
    const json = await res.json();
    if (json.success) setCampaigns(json.data);
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  // Handle Form Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    await fetch("/api/campaigns", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    setIsModalOpen(false);
    setFormData({ name: "", goal: "" });
    setIsLoading(false);
    fetchCampaigns(); // Refresh list to show new data from MongoDB
  };

  return (
    <AmbientBackground theme="campaigns">
      <div className="max-w-5xl mx-auto px-6 pt-12 pb-24 relative">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Campaigns</h1>
            <p className="text-zinc-500 mt-1 text-sm">Manage product drops and marketing sprints.</p>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-zinc-900 hover:bg-black text-white px-4 py-2 rounded-lg text-sm font-medium shadow-xs transition-colors"
          >
            + New Campaign
          </button>
        </div>

        {/* Campaign List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {campaigns.map((campaign) => (
            <div key={campaign._id} className="p-6 bg-white border border-zinc-100 rounded-xl shadow-[0_2px_12px_rgb(0,0,0,0.03)] flex flex-col justify-between group">
              <div>
                <h3 className="text-lg font-semibold text-zinc-900">{campaign.name}</h3>
                <p className="text-sm text-zinc-500 mt-1">{campaign.goal}</p>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-zinc-100 pt-4">
                <span className="text-xs font-medium text-zinc-400 bg-zinc-50 px-2 py-1 rounded-md">
                  Created: {new Date(campaign.createdAt).toLocaleDateString()}
                </span>
                <span className="text-xs font-medium text-zinc-500">By {campaign.createdBy}</span>
              </div>
            </div>
          ))}
          {campaigns.length === 0 && (
            <p className="text-sm text-zinc-500 col-span-2 text-center py-10">No campaigns found. Create one!</p>
          )}
        </div>
      </div>

      {/* Modern Pop-Up Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-6 border-b border-zinc-100">
              <h2 className="text-lg font-bold text-zinc-900">Create New Campaign</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-zinc-700">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Campaign Name</label>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent" 
                  placeholder="e.g. Midnight Sprint V2" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">Campaign Goal</label>
                <textarea 
                  required
                  value={formData.goal}
                  onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                  className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent resize-none h-24" 
                  placeholder="Describe the objective..." 
                />
              </div>
              <div className="mt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-50 rounded-lg transition-colors">Cancel</button>
                <button type="submit" disabled={isLoading} className="bg-zinc-900 hover:bg-black text-white px-4 py-2 rounded-lg text-sm font-medium shadow-xs transition-colors disabled:opacity-50">
                  {isLoading ? "Saving..." : "Create Campaign"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AmbientBackground>
  );
}