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
    <nav className="border-b bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
      <Link href="/" className="flex items-center gap-2 text-xl font-bold text-emerald-400">
        <Zap className="h-6 w-6 text-emerald-400" />
        MergeBoost
      </Link>

      <div className="flex items-center gap-6 text-sm font-medium">
        <Link href="/" className="hover:text-emerald-400 transition">
          Home
        </Link>
        
        {userId && (
          <>
            <Link href="/dashboard" className="hover:text-emerald-400 transition">
              Dashboard
            </Link>

            {role === "Creator" && (
              <Link href="/create-post" className="hover:text-emerald-400 transition">
                Create Post
              </Link>
            )}

            {role === "Admin" && (
              <Link href="/campaigns" className="hover:text-emerald-400 transition">
                Campaigns
              </Link>
            )}
          </>
        )}
      </div>

      <div className="flex items-center gap-4">
        {userId ? (
          <div className="flex items-center gap-3">
            <span className="text-xs bg-slate-800 border border-slate-700 px-2 py-1 rounded-md text-emerald-300">
              Role: {role}
            </span>
            <UserButton/>
          </div>
        ) : (
          <Link
            href="/sign-in"
            className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-semibold px-4 py-2 rounded-md transition"
          >
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
}