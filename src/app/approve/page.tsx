"use client";

import React, { useEffect, useState } from "react";
import AmbientBackground from "@/components/ui/shared/AmbientBackground";

export default function ApprovePage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // State for handling the rejection pop-up
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const fetchPosts = async () => {
    const res = await fetch("/api/posts");
    const json = await res.json();
    if (json.success) {
      // Show only posts that need approval
      setPosts(json.data.filter((p: any) => p.status === "Pending Approval"));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const updatePostStatus = async (id: string, status: string, reason?: string) => {
    setIsUpdating(true);
    await fetch(`/api/posts/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, rejectReason: reason }),
    });
    
    setRejectingId(null);
    setRejectReason("");
    setIsUpdating(false);
    fetchPosts(); // Refresh list after update
  };

  return (
    <AmbientBackground theme="approve">
      <div className="max-w-5xl mx-auto px-6 pt-12 pb-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Content Approval</h1>
          <p className="text-zinc-500 mt-1 text-sm">Review, approve, or reject pending social media posts.</p>
        </div>

        <div className="bg-white border border-zinc-100 rounded-xl shadow-[0_2px_12px_rgb(0,0,0,0.03)] overflow-hidden">
          <div className="border-b border-zinc-100 px-6 py-4 bg-zinc-50/50">
            <h2 className="font-semibold text-zinc-900">Pending Review</h2>
          </div>
          
          <div className="p-0">
            {isLoading ? (
              <div className="p-12 text-center text-sm text-zinc-500">Loading pending posts...</div>
            ) : posts.length > 0 ? (
              <div className="divide-y divide-zinc-100">
                {posts.map((post) => (
                  <div key={post._id} className="p-6 transition-colors">
                    <div className="flex justify-between items-start gap-4">
                      
                      {/* Post Content */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-medium text-zinc-900">{post.title}</h3>
                          <span className="text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700 border border-yellow-200">
                            {post.status}
                          </span>
                        </div>
                        <p className="text-sm text-zinc-600 mt-2 bg-zinc-50 p-3 rounded-lg border border-zinc-100">{post.description}</p>
                        <div className="mt-3 flex items-center gap-2">
                          <span className="text-xs font-medium text-zinc-500 mr-2">Platforms:</span>
                          {post.targetPlatforms.map((platform: string) => (
                            <span key={platform} className="text-xs font-medium text-zinc-500 bg-white border border-zinc-200 px-2 py-1 rounded-md">
                              {platform}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Action Buttons & Rejection UI */}
                      <div className="flex flex-col items-end gap-2 w-72">
                        {rejectingId === post._id ? (
                          // Horizontal Inline Reject Form
                          <div className="flex items-center gap-2 w-full animate-in fade-in slide-in-from-right-4 duration-200">
                            <input 
                              type="text" 
                              autoFocus
                              value={rejectReason}
                              onChange={(e) => setRejectReason(e.target.value)}
                              placeholder="Reason for rejection..." 
                              className="w-full text-xs px-3 py-2 border border-zinc-200 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                            />
                            <button 
                              disabled={!rejectReason || isUpdating}
                              onClick={() => updatePostStatus(post._id, "Rejected", rejectReason)}
                              className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-md text-xs font-medium transition-colors disabled:opacity-50"
                            >
                              Send
                            </button>
                            <button 
                              onClick={() => { setRejectingId(null); setRejectReason(""); }}
                              className="text-zinc-400 hover:text-zinc-600 px-1"
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          // Standard Action Buttons
                          <div className="flex gap-2 w-full">
                            <button 
                              onClick={() => updatePostStatus(post._id, "Approved")}
                              disabled={isUpdating}
                              className="flex-1 bg-zinc-900 hover:bg-black text-white px-4 py-2 rounded-lg text-sm font-medium shadow-xs transition-colors disabled:opacity-50"
                            >
                              Approve
                            </button>
                            <button 
                              onClick={() => setRejectingId(post._id)}
                              disabled={isUpdating}
                              className="flex-1 bg-white border border-zinc-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200 text-zinc-600 px-4 py-2 rounded-lg text-sm font-medium shadow-xs transition-colors disabled:opacity-50"
                            >
                              Reject
                            </button>
                          </div>
                        )}
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="h-12 w-12 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-3 text-xl">✅</div>
                <h3 className="text-sm font-medium text-zinc-900">All caught up!</h3>
                <p className="text-sm text-zinc-500 mt-1">There are no posts waiting for approval.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AmbientBackground>
  );
}