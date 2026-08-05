"use client";

import React, { useState, useEffect, useRef } from "react";
import AmbientBackground from "@/components/ui/shared/AmbientBackground";
import { useRouter } from "next/navigation";

export default function CreatePostPage() {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [campaigns, setCampaigns] = useState<any[]>([]);
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // Post Form State
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    hashtags: "",
    imageUrl: "",
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

  // Handle Cloudflare R2 Image Upload
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const uploadData = new FormData();
    uploadData.append("file", file);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });

      const json = await res.json();
      if (json.success) {
        setFormData((prev) => ({ ...prev, imageUrl: json.imageUrl }));
      } else {
        alert(json.error || "Failed to upload image.");
      }
    } catch (err) {
      alert("Error uploading image to R2.");
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, imageUrl: "" }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // Submit Post
  const submitPost = async (status: string) => {
    if (!selectedCampaign || formData.targetPlatforms.length === 0) return;

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
        status: status,
      }),
    });

    setIsLoading(false);
    setSelectedCampaign(null); // Close modal
    router.push("/dashboard"); // Redirect to dashboard
  };

  return (
    <AmbientBackground theme="create">
      <div className="max-w-4xl mx-auto px-6 pt-12 pb-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Create Post</h1>
          <p className="text-zinc-500 mt-1 text-sm">
            Select a campaign to draft a new social media post.
          </p>
        </div>

        {/* Scrollable Campaign Selector Window */}
        <div className="bg-white border border-zinc-200 rounded-lg shadow-[0_2px_12px_rgb(0,0,0,0.03)] overflow-hidden">
          <div className="bg-zinc-50/50 px-6 py-4 border-b border-zinc-200">
            <h2 className="text-sm font-semibold text-zinc-900">Available Campaigns</h2>
          </div>
          <div className="max-h-[400px] overflow-y-auto p-4 space-y-3">
            {campaigns.map((campaign) => (
              <div
                key={campaign._id}
                onClick={() => setSelectedCampaign(campaign.name)}
                className="p-4 border border-zinc-200 rounded-lg hover:border-zinc-400 hover:shadow-xs cursor-pointer transition-all bg-white"
              >
                <h3 className="font-medium text-zinc-900">{campaign.name}</h3>
                <p className="text-sm text-zinc-500 mt-1 line-clamp-1">{campaign.goal}</p>
              </div>
            ))}
            {campaigns.length === 0 && (
              <p className="text-sm text-zinc-500 p-4">No campaigns found.</p>
            )}
          </div>
        </div>
      </div>

      {/* Modern Post Creation Pop-Up Modal */}
      {selectedCampaign && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-zinc-900/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200 my-8">
            
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-zinc-100">
              <div>
                <h2 className="text-lg font-bold text-zinc-900">Draft Post</h2>
                <p className="text-xs text-zinc-500 mt-1">For: {selectedCampaign}</p>
              </div>
              <button
                onClick={() => setSelectedCampaign(null)}
                className="text-zinc-400 hover:text-zinc-700 transition-colors"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 max-h-[75vh] overflow-y-auto flex flex-col gap-5">
              {/* Post Title */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  Post Title
                </label>
                <input
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
                  placeholder="Internal reference title"
                />
              </div>

              {/* Caption / Description */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  Caption / Description
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent resize-none h-28"
                  placeholder="What do you want to say?"
                />
              </div>

              {/* Hashtags Field */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  Hashtags
                </label>
                <input
                  value={formData.hashtags}
                  onChange={(e) => setFormData({ ...formData, hashtags: e.target.value })}
                  className="w-full px-3 py-2 border border-zinc-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-zinc-900 focus:border-transparent"
                  placeholder="e.g. #marketing #launch #tech"
                />
              </div>

              {/* Upload Image Section */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1">
                  Upload Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  className="hidden"
                />

                {!formData.imageUrl ? (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isUploading}
                    className="w-full border-2 border-dashed border-zinc-200 hover:border-zinc-400 rounded-xl p-4 flex flex-col items-center justify-center transition-colors bg-zinc-50/50 hover:bg-zinc-50"
                  >
                    <svg
                      className="w-6 h-6 text-zinc-400 mb-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-xs font-medium text-zinc-600">
                      {isUploading ? "Uploading to Cloudflare R2..." : "Click to upload image"}
                    </span>
                  </button>
                ) : (
                  /* R2 Uploaded Image Preview */
                  <div className="relative rounded-xl overflow-hidden border border-zinc-200 bg-zinc-50">
                    <img
                      src={formData.imageUrl}
                      alt="Uploaded Preview"
                      className="w-full h-44 object-cover"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute top-2 right-2 bg-zinc-900/80 hover:bg-black text-white p-1.5 rounded-full backdrop-blur-sm transition-colors"
                      title="Remove image"
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>

              {/* Target Platforms */}
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-2">
                  Target Platforms
                </label>
                <div className="flex gap-3">
                  {["X (Twitter)", "LinkedIn", "Instagram"].map((platform) => (
                    <button
                      key={platform}
                      type="button"
                      onClick={() => togglePlatform(platform)}
                      className={`px-3 py-1.5 text-xs font-medium border rounded-md transition-colors ${
                        formData.targetPlatforms.includes(platform)
                          ? "bg-zinc-900 text-white border-zinc-900"
                          : "bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50"
                      }`}
                    >
                      {platform}
                    </button>
                  ))}
                </div>
              </div>

              {/* Modal Action Buttons */}
              <div className="mt-2 flex justify-end gap-3 pt-4 border-t border-zinc-100">
                <button
                  type="button"
                  onClick={() => setSelectedCampaign(null)}
                  className="px-4 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-50 rounded-lg transition-colors"
                >
                  Cancel
                </button>

                {/* Save as Draft */}
                <button
                  type="button"
                  onClick={() => submitPost("Draft")}
                  disabled={isLoading || isUploading || formData.targetPlatforms.length === 0}
                  className="bg-white border border-zinc-200 hover:bg-zinc-50 text-zinc-700 px-4 py-2 rounded-lg text-sm font-medium shadow-xs transition-colors disabled:opacity-50"
                >
                  {isLoading ? "Saving..." : "Save as Draft"}
                </button>

                {/* Send for Approval */}
                <button
                  type="button"
                  onClick={() => submitPost("Pending Approval")}
                  disabled={isLoading || isUploading || formData.targetPlatforms.length === 0}
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