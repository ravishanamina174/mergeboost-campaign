"use client";

import React, { useEffect, useState } from "react";
import AmbientBackground from "@/components/ui/shared/AmbientBackground";

export default function DashboardPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    fetch("/api/posts")
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setPosts(json.data);
        setIsLoading(false);
      });
  }, []);

  // Filter posts based on the active tab
  const filteredPosts = filter === "All" 
    ? posts 
    : posts.filter((post) => post.status === filter);

  // Status Badge Colors
  const getStatusStyle = (status: string) => {
    switch(status) {
      case "Approved": return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "Rejected": return "bg-red-100 text-red-700 border-red-200";
      case "Pending Approval": return "bg-yellow-100 text-yellow-700 border-yellow-200";
      default: return "bg-zinc-100 text-zinc-600 border-zinc-200";
    }
  };

  return (
    <AmbientBackground theme="dashboard">
      <div className="max-w-6xl mx-auto px-6 pt-12 pb-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Overview</h1>
          <p className="text-zinc-500 mt-1 text-sm">Your recent social media performance and tasks.</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
          <div className="p-5 bg-white border border-zinc-100 rounded-xl shadow-[0_2px_12px_rgb(0,0,0,0.03)]">
            <p className="text-sm font-medium text-zinc-500">Total Posts</p>
            <p className="text-3xl font-bold text-zinc-900 mt-1">{posts.length}</p>
          </div>
          <div className="p-5 bg-white border border-zinc-100 rounded-xl shadow-[0_2px_12px_rgb(0,0,0,0.03)]">
            <p className="text-sm font-medium text-zinc-500">Drafts</p>
            <p className="text-3xl font-bold text-zinc-900 mt-1">
              {posts.filter(p => p.status === "Draft").length}
            </p>
          </div>
          <div className="p-5 bg-white border border-zinc-100 rounded-xl shadow-[0_2px_12px_rgb(0,0,0,0.03)]">
            <p className="text-sm font-medium text-zinc-500">Pending</p>
            <p className="text-3xl font-bold text-zinc-900 mt-1">
              {posts.filter(p => p.status === "Pending Approval").length}
            </p>
          </div>
          <div className="p-5 bg-white border border-zinc-100 rounded-xl shadow-[0_2px_12px_rgb(0,0,0,0.03)]">
            <p className="text-sm font-medium text-zinc-500">Approved</p>
            <p className="text-3xl font-bold text-zinc-900 mt-1">
              {posts.filter(p => p.status === "Approved").length}
            </p>
          </div>
        </div>

        {/* Dynamic Posts Area */}
        <div className="bg-white border border-zinc-100 rounded-xl shadow-[0_2px_12px_rgb(0,0,0,0.03)] overflow-hidden">
          <div className="border-b border-zinc-100 px-6 py-4 flex items-center justify-between bg-zinc-50/50">
            <h2 className="font-semibold text-zinc-900">Content Pipeline</h2>
            <div className="flex gap-2 text-xs font-medium text-zinc-500">
              {["All", "Draft", "Pending Approval", "Approved", "Rejected"].map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`px-3 py-1.5 rounded-md transition-colors ${filter === tab ? "bg-white text-zinc-900 border border-zinc-200 shadow-xs" : "hover:text-zinc-900 border border-transparent"}`}
                >
                  {tab === "Pending Approval" ? "Pending" : tab}
                </button>
              ))}
            </div>
          </div>
          
          <div className="p-0">
            {isLoading ? (
              <div className="p-12 text-center text-sm text-zinc-500">Loading posts...</div>
            ) : filteredPosts.length > 0 ? (
              <div className="divide-y divide-zinc-100">
                {filteredPosts.map((post) => (
                  <div key={post._id} className="p-6 hover:bg-zinc-50/50 transition-colors">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <h3 className="font-medium text-zinc-900">{post.title}</h3>
                          <span className={`text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full border ${getStatusStyle(post.status)}`}>
                            {post.status}
                          </span>
                        </div>
                        <p className="text-sm text-zinc-500 mt-2">{post.description}</p>
                        
                        {/* Display Rejection Reason if it exists */}
                        {post.status === "Rejected" && post.rejectReason && (
                          <div className="mt-3 bg-red-50 border border-red-100 text-red-600 text-xs px-3 py-2 rounded-md">
                            <span className="font-semibold">Rejection Note:</span> {post.rejectReason}
                          </div>
                        )}

                        <div className="mt-3 flex items-center gap-2">
                          {post.targetPlatforms.map((platform: string) => (
                            <span key={platform} className="text-xs font-medium text-zinc-400 bg-white border border-zinc-200 px-2 py-1 rounded-md">
                              {platform}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-medium text-zinc-400">Campaign</p>
                        <p className="text-sm text-zinc-700 font-medium">{post.campaignName}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="h-12 w-12 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-3 text-xl">📁</div>
                <h3 className="text-sm font-medium text-zinc-900">No {filter !== "All" ? filter : ""} posts found</h3>
                <p className="text-sm text-zinc-500 mt-1">There is currently no data to display for this filter.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AmbientBackground>
  );
}