"use client";

import React, { useEffect, useState } from "react";
import AmbientBackground from "@/components/ui/shared/AmbientBackground";

export default function DraftsPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdatingId, setIsUpdatingId] = useState<string | null>(null);

  const fetchDrafts = async () => {
    try {
      const res = await fetch("/api/posts");
      const json = await res.json();
      if (json.success) {
        // Filter out only the posts with "Draft" status
        setPosts(json.data.filter((p: any) => p.status === "Draft"));
      }
    } catch (error) {
      console.error("Failed to fetch drafts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDrafts();
  }, []);

  // Update post status to Pending Approval
  const sendToApprove = async (id: string) => {
    setIsUpdatingId(id);
    try {
      await fetch(`/api/posts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Pending Approval" }),
      });
      // Refresh the list to remove the submitted draft
      fetchDrafts();
    } catch (error) {
      console.error("Failed to update post:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsUpdatingId(null);
    }
  };

  return (
    <AmbientBackground theme="campaigns">
      <div className="max-w-5xl mx-auto px-6 pt-12 pb-24 relative">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Draft Posts</h1>
          <p className="text-zinc-500 mt-1 text-sm">
            Review your saved drafts and send them for final approval.
          </p>
        </div>

        {/* Drafts List Window */}
        <div className="bg-white border border-zinc-200 rounded-lg shadow-[0_2px_12px_rgb(0,0,0,0.03)] overflow-hidden">
          <div className="border-b border-zinc-200 px-6 py-4 bg-zinc-50/50">
            <h2 className="font-semibold text-zinc-900">Your Saved Drafts</h2>
          </div>
          
          <div className="p-0">
            {isLoading ? (
              <div className="p-12 text-center text-sm text-zinc-500">Loading drafts...</div>
            ) : posts.length > 0 ? (
              <div className="divide-y divide-zinc-200">
                {posts.map((post) => (
                  <div key={post._id} className="p-6 transition-colors hover:bg-zinc-50/50">
                    <div className="flex justify-between items-start gap-4">
                      
                      {/* Left: Thumbnail & Content */}
                      <div className="flex-1 flex gap-4 items-start">
                        
                        {/* Optional Image Thumbnail */}
                        {post.imageUrl && (
                          <div className="relative shrink-0 w-24 h-24 rounded-lg overflow-hidden border border-zinc-200 bg-zinc-50">
                            <img 
                              src={post.imageUrl} 
                              alt={post.title} 
                              className="w-full h-full object-cover" 
                            />
                          </div>
                        )}

                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <h3 className="font-medium text-zinc-900">{post.title}</h3>
                            <span className="text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 border border-zinc-200">
                              {post.status}
                            </span>
                          </div>
                          
                          <p className="text-sm text-zinc-600 mt-1 line-clamp-2">
                            {post.description}
                          </p>
                          
                          {/* Optional Hashtags */}
                          {post.hashtags && (
                            <p className="text-xs text-indigo-600 font-medium mt-1.5">
                              {post.hashtags}
                            </p>
                          )}

                          {/* Target Platforms */}
                          <div className="mt-3 flex items-center gap-2">
                            {post.targetPlatforms.map((platform: string) => (
                              <span key={platform} className="text-xs font-medium text-zinc-500 bg-white border border-zinc-200 px-2 py-1 rounded-md shadow-xs">
                                {platform}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Right: Campaign Name, Date & Action Button */}
                      <div className="flex flex-col items-end justify-between min-h-[96px] shrink-0 gap-4">
                        <div className="text-right">
                          <p className="text-xs font-medium text-zinc-400">Campaign</p>
                          <p className="text-sm text-zinc-700 font-medium">{post.campaignName}</p>
                          
                          {/* Display Scheduled Time if it exists */}
                          {post.scheduledTime && (
                            <div className="mt-2">
                              <p className="text-xs font-medium text-zinc-400 flex items-center justify-end gap-1">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                Scheduled
                              </p>
                              <p className="text-xs text-zinc-600 font-medium mt-0.5">
                                {new Date(post.scheduledTime).toLocaleString([], {
                                  month: 'short',
                                  day: 'numeric',
                                  hour: '2-digit',
                                  minute: '2-digit'
                                })}
                              </p>
                            </div>
                          )}
                        </div>

                        <button 
                          onClick={() => sendToApprove(post._id)}
                          disabled={isUpdatingId === post._id}
                          className="bg-zinc-900 hover:bg-black text-white px-4 py-2 rounded-lg text-sm font-medium shadow-xs transition-colors disabled:opacity-50 flex items-center gap-2"
                        >
                          {isUpdatingId === post._id ? (
                            "Sending..."
                          ) : (
                            <>
                              Send to Approve
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                            </>
                          )}
                        </button>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="h-12 w-12 bg-zinc-50 text-zinc-400 rounded-full flex items-center justify-center mx-auto mb-3 text-xl">📝</div>
                <h3 className="text-sm font-medium text-zinc-900">No Drafts Found</h3>
                <p className="text-sm text-zinc-500 mt-1">You don't have any saved drafts at the moment.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </AmbientBackground>
  );
}