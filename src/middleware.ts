import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Public routes accessible without logging in
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhooks(.*)",
]);

// Role-restricted routes
const isAdminRoute = createRouteMatcher(["/campaigns(.*)"]);
const isCreatorRoute = createRouteMatcher(["/create-post(.*)"]);
const isApproverRoute = createRouteMatcher(["/approve(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const { userId, sessionClaims } = await auth();

  // If user is not logged in and tries to access a protected route, redirect to sign-in
  if (!userId && !isPublicRoute(req)) {
    const signInUrl = new URL("/sign-in", req.url);
    return NextResponse.redirect(signInUrl);
  }

  // Extract metadata injected from Clerk Session Token
  const metadata = sessionClaims?.metadata as { role?: string } | undefined;
  const userRole = metadata?.role;

  // Protect Campaign creation page (Admin only)
  if (isAdminRoute(req) && userRole !== "Admin") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Protect Post creation page (Creator only)
  if (isCreatorRoute(req) && userRole !== "Creator") {
     return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // Protect Post approval page (Approver only)
  if (isApproverRoute(req) && userRole !== "Approver") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|json|png|jpg|jpeg|webp|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};