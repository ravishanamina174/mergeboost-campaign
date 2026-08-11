import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import { Post } from "@/lib/models";

// GET: Fetch posts (Supports optional ?status= & ?creatorId= filtering)
export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status");
    const creatorId = searchParams.get("creatorId");

    const query: any = {};
    if (status && status !== "ALL") query.status = status;
    if (creatorId) query.creatorId = creatorId;

    const posts = await Post.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: posts });
  } catch (error) {
    console.error("Fetch Posts Error:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

// POST: Create a new post or save draft
export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const body = await req.json();

    const {
      title,
      description,
      imageUrl,
      hashtags,
      campaignName,
      targetPlatforms,
      status,
      scheduledTime,
    } = body;

    if (!title || !description || !campaignName || !targetPlatforms) {
      return NextResponse.json({ error: "Missing required post fields" }, { status: 400 });
    }

    const creatorName = user?.firstName
      ? `${user.firstName} ${user.lastName || ""}`.trim()
      : "Content Creator";

    const newPost = await Post.create({
      title,
      description,
      imageUrl: imageUrl || "",
      hashtags: hashtags || [],
      campaignName,
      targetPlatforms,
      status: status || "Draft",
      published: false,
      creatorId: userId,
      scheduledTime: scheduledTime ? new Date(scheduledTime) : undefined,
      createdBy: creatorName,
    });

    return NextResponse.json({ success: true, data: newPost }, { status: 201 });
  } catch (error) {
    console.error("Create Post Error:", error);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}

// PATCH: Update post status & published state
export async function PATCH(req: Request) {
  try {
    const { userId } = await auth();
    const user = await currentUser();
    const role = (user?.publicMetadata?.role as string) || "User";

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const body = await req.json();
    
    // Extract `published` alongside the other fields
    const { postId, status, rejectionReason, published } = body;

    if (!postId || !status) {
      return NextResponse.json({ error: "Post ID and status are required" }, { status: 400 });
    }

    // Role safety check: Approver or Admin can approve/reject posts
    // Added "Approved" to the array to prevent permission errors
    if (["Published", "Scheduled", "Rejected", "Approved"].includes(status) && !["Approver", "Admin"].includes(role)) {
      return NextResponse.json({ error: "Forbidden: Approver role required" }, { status: 403 });
    }

    // Dynamically build the update object
    const updateData: any = { status };
    if (rejectionReason !== undefined) updateData.rejectionReason = rejectionReason || null;
    if (typeof published === "boolean") updateData.published = published;

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      updateData,
      { new: true }
    );

    return NextResponse.json({ success: true, data: updatedPost });
  } catch (error) {
    console.error("Update Post Status Error:", error);
    return NextResponse.json({ error: "Failed to update post status" }, { status: 500 });
  }
}