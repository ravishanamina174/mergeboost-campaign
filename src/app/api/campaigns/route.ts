import { NextResponse } from "next/server";
import { auth, currentUser } from "@clerk/nextjs/server";
import { connectDB } from "@/lib/db";
import { Campaign } from "@/lib/models";

// GET: Fetch all campaigns
export async function GET() {
  try {
    await connectDB();
    const campaigns = await Campaign.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: campaigns });
  } catch (error) {
    console.error("Fetch Campaigns Error:", error);
    return NextResponse.json({ error: "Failed to fetch campaigns" }, { status: 500 });
  }
}

// POST: Create a new campaign (Admin Only)
export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    const user = await currentUser();
    const role = (user?.publicMetadata?.role as string) || "User";

    if (!userId || role !== "Admin") {
      return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
    }

    await connectDB();
    const body = await req.json();
    const { name, goal, imageUrl } = body;

    if (!name || !goal) {
      return NextResponse.json({ error: "Name and goal are required" }, { status: 400 });
    }

    const newCampaign = await Campaign.create({
      name,
      goal,
      imageUrl: imageUrl || "",
      createdBy: user.firstName ? `${user.firstName} ${user.lastName || ""}`.trim() : user.id,
    });

    return NextResponse.json({ success: true, data: newCampaign }, { status: 201 });
  } catch (error) {
    console.error("Create Campaign Error:", error);
    return NextResponse.json({ error: "Failed to create campaign" }, { status: 500 });
  }
}