import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Post } from "@/lib/models";

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // 1. Connect to MongoDB
    await connectDB();

    // 2. Extract params (Post ID) and request body
    const { id } = await params;
    const body = await req.json();
    
    // 3. Extract the new 'published' field alongside the others
    const { status, rejectReason, published } = body;

    // 4. Build dynamic update object
    const updateFields: any = {};
    if (status) updateFields.status = status;
    if (rejectReason !== undefined) updateFields.rejectReason = rejectReason || null;
    if (typeof published === "boolean") updateFields.published = published;

    // 5. Find post by ID and update
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      updateFields,
      { new: true } // returns the updated document
    );

    if (!updatedPost) {
      return NextResponse.json(
        { success: false, error: "Post not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updatedPost });
  } catch (error) {
    console.error("Update Post Error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to update post" },
      { status: 500 }
    );
  }
}