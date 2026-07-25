import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import { Zap } from "lucide-react";

export default async function Navbar() {
  const { userId } = await auth();
  const user = await currentUser();
  
  // Extract role from Clerk public metadata
  const role = (user?.publicMetadata?.role as string) || "User";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200/80 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-14.5 flex items-center justify-between">
        
        {/* Left: Brand Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold text-zinc-900 tracking-tight hover:opacity-90 transition-opacity">
            <span className="font-medium text-base tracking-tight text-black">MergeBoost</span>
          </Link>
        </div>

        {/* Center: Clean Horizontal Navigation Links */}
        <nav className="hidden md:flex items-center gap-5 text-sm fontw">
          <Link 
            href="/" 
            className="px-4 py-[0.3rem] hover:bg-zinc-100 rounded-[0.2rem] text-black transition-colors"
          >
            Home
          </Link>
          
          {userId && (
            <>
              <Link 
                href="/dashboard" 
                className="px-4 py-[0.3rem] hover:bg-zinc-100 rounded-[0.2rem] text-black transition-colors"
              >
                Dashboard
              </Link>

              {role === "Creator" && (
                <Link 
                  href="/create-post" 
                  className="px-4 py-[0.3rem] hover:bg-zinc-100 rounded-[0.2rem] text-black  transition-colors"
                >
                  Create Post
                </Link>
              )}

              {role === "Admin" && (
                <Link 
                  href="/campaigns" 
                  className="px-4 py-[0.3rem] hover:bg-zinc-100 rounded-[0.2rem] text-black  transition-colors"
                >
                  Campaigns
                </Link>
              )}
            </>
          )}
        </nav>
        
<div className="flex items-center gap-3">
  {userId ? (
    <div className="flex items-center gap-2.5">
      {/* Compact Black Role Button */}
      <div className="inline-flex items-center gap-2 px-3 py-[0.4rem] bg-zinc-100 hover:bg-zinc-200 rounded-[0.2rem] text-black text-xs font-medium  transition-all">
        <span>Role: {role}</span>

        {/* Smaller Colored Circles */}
        <div className="flex -space-x-1.5">
          <span className="h-3.5 w-3.5 rounded-full bg-yellow-400 border border-zinc-900"></span>
          <span className="h-3.5 w-3.5 rounded-full bg-emerald-400 border border-zinc-900"></span>
          <span className="h-3.5 w-3.5 rounded-full bg-violet-400 border border-zinc-900"></span>
        </div>
      </div>

      {/* User Avatar */}
      <div className="flex items-center justify-center">
        <UserButton
          appearance={{
            elements: {
              avatarBox:
                "h-8 w-8 rounded-lg border border-zinc-200 shadow-2xs",
            },
          }}
        />
      </div>
    </div>
  ) : (
    <>
      {/* Sign In Button */}
      <Link
        href="/sign-in"
        className="px-3.5 py-1.5 text-xs font-medium text-zinc-700 bg-white border border-zinc-200 rounded-lg hover:bg-zinc-50 transition-all shadow-2xs"
      >
        Sign in
      </Link>

      {/* Get All Access Button */}
      <Link
        href="/sign-up"
        className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-zinc-900 hover:bg-black rounded-lg text-white text-xs font-medium shadow-xs transition-all"
      >
        <span>Get All Access</span>

        {/* Smaller Colored Circles */}
        <div className="flex -space-x-1.5">
          <span className="h-3.5 w-3.5 rounded-full bg-yellow-400 border border-zinc-900"></span>
          <span className="h-3.5 w-3.5 rounded-full bg-emerald-400 border border-zinc-900"></span>
          <span className="h-3.5 w-3.5 rounded-full bg-violet-400 border border-zinc-900"></span>
        </div>
      </Link>
    </>
  )}
</div>

      </div>
    </header>
  );
}