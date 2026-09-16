"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs"; // NEW: Import Clerk's user hook

export default function DashboardPage() {
  const { user, isLoaded } = useUser();
  const role = (user?.publicMetadata?.role as string) || "User";
  const isPrivileged = role === "Admin" || role === "Approver";

  const [posts, setPosts] = useState<any[]>([]);
  const [livePosts, setLivePosts] = useState<any[]>([]); // NEW: State for live posts
  const [isLoading, setIsLoading] = useState(true);
  const [isLiveLoading, setIsLiveLoading] = useState(true);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    // 1. Fetch all pipeline posts
    fetch("/api/posts")
      .then((res) => res.json())
      .then((json) => {
        if (json.success) setPosts(json.data);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    // 2. Fetch live published posts ONLY if the user is Admin or Approver
    if (isLoaded && isPrivileged) {
      fetch("/api/posts?published=true")
        .then((res) => res.json())
        .then((json) => {
          if (json.success) setLivePosts(json.data);
          setIsLiveLoading(false);
        });
    }
  }, [isLoaded, isPrivileged]);

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
    <div className="min-h-screen bg-[#fcfcfc]">
      <div className="max-w-6xl mx-auto px-6 pt-12 pb-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Overview</h1>
          <p className="text-zinc-500 mt-1 text-sm">Your recent social media performance and tasks.</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-10">
          <div className="p-5 bg-white border border-zinc-200 rounded-lg ">
            <p className="text-sm font-medium text-zinc-500">Total Posts</p>
            <p className="text-3xl font-bold text-zinc-900 mt-1">{posts.length}</p>
          </div>
          <div className="p-5 bg-white border border-zinc-200 rounded-lg ">
            <p className="text-sm font-medium text-zinc-500">Drafts</p>
            <p className="text-3xl font-bold text-zinc-900 mt-1">
              {posts.filter(p => p.status === "Draft").length}
            </p>
          </div>
          <div className="p-5 bg-white border border-zinc-200 rounded-lg ">
            <p className="text-sm font-medium text-zinc-500">Pending</p>
            <p className="text-3xl font-bold text-zinc-900 mt-1">
              {posts.filter(p => p.status === "Pending Approval").length}
            </p>
          </div>
          <div className="p-5 bg-white border border-zinc-200 rounded-lg ">
            <p className="text-sm font-medium text-zinc-500">Approved</p>
            <p className="text-3xl font-bold text-zinc-900 mt-1">
              {posts.filter(p => p.status === "Approved").length}
            </p>
          </div>
        </div>

        {/* Dynamic Posts Area (Content Pipeline) */}
        <div className="bg-white border border-zinc-200 rounded-lg shadow-[0_2px_12px_rgb(0,0,0,0.03)] overflow-hidden">
          
          <div className="border-b border-zinc-200 px-6 py-4 flex items-center justify-between gap-4 bg-zinc-50/50">
            <h2 className="font-semibold text-zinc-900 whitespace-nowrap">Content Pipeline</h2>
            <div className="flex gap-2 text-[0.8rem] font-medium text-zinc-500 overflow-x-auto pb-1 [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:bg-zinc-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
              {["All", "Draft", "Pending Approval", "Approved", "Rejected"].map((tab) => (
                <button 
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`whitespace-nowrap px-4 py-1.5 rounded-lg transition-colors ${filter === tab ? "bg-[#f8f9fc] text-zinc-900 border border-zinc-200 shadow-xs" : "hover:text-zinc-900 border border-transparent"}`}
                >
                  {tab === "Pending Approval" ? "Pending" : tab}
                </button>
              ))}
            </div>
          </div>
          
          <div className="p-0 overflow-x-auto pb-1 [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:bg-zinc-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
            <div className="min-w-[700px]">
              {isLoading ? (
                <div className="p-12 text-center text-sm text-zinc-500">Loading posts...</div>
              ) : filteredPosts.length > 0 ? (
                <div className="divide-y divide-zinc-100">
                  {filteredPosts.map((post) => (
                    <div key={post._id} className="p-6 hover:bg-zinc-50/50 transition-colors">
                      <div className="flex justify-between items-start gap-4">
                        
                        <div className="flex gap-4 items-start flex-1">
                          {post.imageUrl && (
                            <div className="relative shrink-0 w-20 h-20 rounded-lg overflow-hidden border border-zinc-200 bg-zinc-50">
                              <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
                            </div>
                          )}

                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                              <h3 className="font-medium text-zinc-900">{post.title}</h3>
                              <span className={`text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full border ${getStatusStyle(post.status)}`}>
                                {post.status}
                              </span>
                            </div>
                            <p className="text-sm text-zinc-500 mt-2">{post.description}</p>
                            
                            {post.hashtags && (
                              <p className="text-xs text-indigo-600 font-medium mt-1.5">
                                {post.hashtags}
                              </p>
                            )}

                            {post.status === "Rejected" && post.rejectReason && (
                              <div className="mt-3 bg-red-50 border border-red-100 text-red-600 text-xs px-3 py-2 rounded-md">
                                <span className="font-semibold">Rejection Note:</span> {post.rejectReason}
                              </div>
                            )}

                            <div className="mt-3 flex items-center gap-2">
                              {post.targetPlatforms.map((platform: string) => (
                                <span key={platform} className="text-xs font-medium text-zinc-600 bg-white border border-zinc-200 px-2 py-1 rounded-md">
                                  {platform}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="text-right shrink-0 flex flex-col items-end gap-3">
                          <div>
                            <p className="text-xs font-medium text-zinc-400">Campaign</p>
                            <p className="text-sm text-zinc-700 font-medium">{post.campaignName}</p>
                          </div>
                          
                          {post.scheduledTime && (
                            <div>
                              <p className="text-xs font-medium text-zinc-400 flex items-center justify-end gap-1">
                                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                                Scheduled
                              </p>
                              <p className="text-sm text-zinc-700 font-medium mt-0.5">
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

        {/* NEW: Live Posts Section (Only visible to Admin & Approver) */}
        {isLoaded && isPrivileged && (
          <div className="mt-12 bg-white border border-zinc-200 rounded-lg shadow-[0_2px_12px_rgb(0,0,0,0.03)] overflow-hidden">
            <div className="border-b border-gray-200 px-6 py-4 bg-white flex items-center gap-2">
              {/* <svg className="w-5 h-5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> */}
              <div>
                <h2 className="font-semibold text-black">Live Posts</h2>
                <p className="text-xs text-black-700 mt-0.5">Currently active and published content across platforms.</p>
              </div>
            </div>
            
            <div className="p-0 overflow-x-auto pb-1 [scrollbar-width:thin] [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:bg-emerald-300 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
              <div className="min-w-[700px]">
                {isLiveLoading ? (
                  <div className="p-12 text-center text-sm text-zinc-500">Loading live posts...</div>
                ) : livePosts.length > 0 ? (
                  <div className="divide-y divide-zinc-100">
                    {livePosts.map((post) => (
                      <div key={post._id} className="p-6 hover:bg-emerald-50/30 transition-colors">
                        <div className="flex justify-between items-start gap-4">
                          
                          <div className="flex gap-4 items-start flex-1">
                            {post.imageUrl && (
                              <div className="relative shrink-0 w-20 h-20 rounded-lg overflow-hidden border border-zinc-200 bg-zinc-50">
                                <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
                              </div>
                            )}

                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-1">
                                <h3 className="font-medium text-zinc-900">{post.title}</h3>
                              </div>
                              <p className="text-sm text-zinc-500 mt-2">{post.description}</p>
                              <div className="mt-3 flex items-center gap-2">
                                {post.targetPlatforms.map((platform: string) => (
                                  <span key={platform} className="text-xs font-medium text-zinc-600 bg-zync-600 border border-zync-600 px-2 py-1 rounded-md">
                                    {platform}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <p className="text-xs font-medium text-zinc-400">Campaign</p>
                            <p className="text-sm text-zinc-700 font-medium">{post.campaignName}</p>
                            <p className="text-xs font-medium text-zinc-400 mt-3">Author</p>
                            <p className="text-sm text-zinc-700 font-medium">{post.createdBy}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-sm text-zinc-500">No live posts found.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}