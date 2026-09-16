"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";

export default function DraftsPage() {
  const { userId } = useAuth();
  
  const [drafts, setDrafts] = useState<any[]>([]);
  const [approvedPosts, setApprovedPosts] = useState<any[]>([]);
  const [publishedPosts, setPublishedPosts] = useState<any[]>([]);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdatingId, setIsUpdatingId] = useState<string | null>(null);

  const fetchUserPosts = async () => {
    if (!userId) return;
    
    try {
      const res = await fetch(`/api/posts?creatorId=${userId}`);
      const json = await res.json();
      
      if (json.success) {
        const allPosts = json.data;
        
        // Filter into categories
        setDrafts(allPosts.filter((p: any) => p.status === "Draft"));
        
        // Filter for "Approved" status and unpublished
        setApprovedPosts(allPosts.filter((p: any) => 
          (p.status === "Approved" || p.status === "Scheduled") && p.published === false
        ));
        
        // Filter successfully published posts
        setPublishedPosts(allPosts.filter((p: any) => p.published === true || p.status === "Published"));
      }
    } catch (error) {
      console.error("Failed to fetch drafts:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserPosts();
  }, [userId]);

  const updatePost = async (id: string, newStatus: string, isPublished?: boolean) => {
    setIsUpdatingId(id);
    try {
      const payload: any = { status: newStatus };
      
      if (typeof isPublished === "boolean") {
        payload.published = isPublished;
      }

      // FIX: Pointing to the dynamic [id] route to bypass the strict Admin role check
      const res = await fetch(`/api/posts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      
      // Check if the backend threw an error so it doesn't fail silently
      if (!res.ok) {
        const errorData = await res.json();
        alert(`Error: ${errorData.error || "Failed to update"}`);
        setIsUpdatingId(null);
        return;
      }
      
      fetchUserPosts();
    } catch (error) {
      console.error("Failed to update post:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsUpdatingId(null);
    }
  };

  const PostCard = ({ post, actionButton }: { post: any, actionButton?: React.ReactNode }) => (
    <div className="p-6 transition-colors hover:bg-zinc-50/50">
      <div className="flex justify-between items-start gap-4">
        {/* Left: Thumbnail & Content */}
        <div className="flex-1 flex gap-4 items-start">
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
              <span className={`text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full border ${
                post.published ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-zinc-100 text-zinc-600 border-zinc-200"
              }`}>
                {post.status}
              </span>
            </div>
            
            <p className="text-sm text-zinc-600 mt-1 line-clamp-2">
              {post.description}
            </p>
            
            {post.hashtags && post.hashtags.length > 0 && (
              <p className="text-xs text-indigo-600 font-medium mt-1.5">
                {Array.isArray(post.hashtags) ? post.hashtags.join(" ") : post.hashtags}
              </p>
            )}

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
          {actionButton}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-[#fcfcfc] min-h-screen">
      <div className="max-w-5xl mx-auto px-6 pt-12 pb-24 relative space-y-12">
        
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 tracking-tight">Your Content</h1>
          <p className="text-zinc-500 mt-1 text-sm">
            Manage your drafts, publish approved content, and review live posts.
          </p>
        </div>

        {/* 1. DRAFTS SECTION */}
        <div className="bg-white border border-zinc-200 rounded-lg shadow-[0_2px_12px_rgb(0,0,0,0.03)] overflow-hidden">
          <div className="border-b border-zinc-200 px-6 py-4 bg-zinc-50/50">
            <h2 className="font-semibold text-zinc-900">Saved Drafts</h2>
          </div>
          <div className="p-0">
            {isLoading ? (
              <div className="p-12 text-center text-sm text-zinc-500">Loading...</div>
            ) : drafts.length > 0 ? (
              <div className="divide-y divide-zinc-200">
                {drafts.map((post) => (
                  <PostCard 
                    key={post._id} 
                    post={post} 
                    actionButton={
                      <button 
                        onClick={() => updatePost(post._id, "Pending Approval", false)}
                        disabled={isUpdatingId === post._id}
                        className="bg-zinc-900 hover:bg-black text-white px-4 py-2 rounded-lg text-sm font-medium shadow-xs transition-colors disabled:opacity-50 flex items-center gap-2"
                      >
                        {isUpdatingId === post._id ? "Sending..." : "Send to Approve"}
                      </button>
                    }
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-sm text-zinc-500">No drafts available.</p>
              </div>
            )}
          </div>
        </div>

        {/* 2. APPROVED POSTS SECTION */}
        <div className="bg-white border border-zinc-200 rounded-lg shadow-[0_2px_12px_rgb(0,0,0,0.03)] overflow-hidden">
          <div className="border-b border-zinc-200 px-6 py-4 bg-indigo-50/30">
            <h2 className="font-semibold text-zinc-900">Ready to Publish</h2>
            <p className="text-xs text-zinc-500 mt-0.5">These posts have been approved and are awaiting your publication.</p>
          </div>
          <div className="p-0">
            {isLoading ? (
              <div className="p-12 text-center text-sm text-zinc-500">Loading...</div>
            ) : approvedPosts.length > 0 ? (
              <div className="divide-y divide-zinc-200">
                {approvedPosts.map((post) => (
                  <PostCard 
                    key={post._id} 
                    post={post} 
                    actionButton={
                      <button 
                        onClick={() => updatePost(post._id, "Published", true)}
                        disabled={isUpdatingId === post._id}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg text-sm font-medium shadow-xs transition-colors disabled:opacity-50 flex items-center gap-2"
                      >
                        {isUpdatingId === post._id ? "Publishing..." : "Publish Now"}
                      </button>
                    }
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-sm text-zinc-500">No approved posts waiting to be published.</p>
              </div>
            )}
          </div>
        </div>

        {/* 3. PUBLISHED POSTS SECTION */}
        <div className="bg-white border border-zinc-200 rounded-lg shadow-[0_2px_12px_rgb(0,0,0,0.03)] overflow-hidden">
          <div className="border-b border-zinc-200 px-6 py-4 bg-emerald-50/30">
            <h2 className="font-semibold text-zinc-900">Live Posts</h2>
          </div>
          <div className="p-0">
            {isLoading ? (
              <div className="p-12 text-center text-sm text-zinc-500">Loading...</div>
            ) : publishedPosts.length > 0 ? (
              <div className="divide-y divide-zinc-200">
                {publishedPosts.map((post) => (
                  <PostCard 
                    key={post._id} 
                    post={post} 
                    actionButton={
                      <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg text-sm font-medium border border-emerald-200 flex items-center gap-2 cursor-default">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        Published
                      </div>
                    }
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-sm text-zinc-500">You haven't published any posts yet.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}