import mongoose, { Schema, Document, Model } from "mongoose";

// --- CAMPAIGN SCHEMA ---
export interface ICampaign extends Document {
  name: string;
  goal: string;
  imageUrl?: string;
  createdBy: string; 
  createdAt: Date;
}

const CampaignSchema: Schema = new Schema<ICampaign>(
  {
    name: { type: String, required: true },
    goal: { type: String, required: true },
    imageUrl: { type: String, default: "" },
    createdBy: { type: String, required: true },
  },
  { timestamps: true }
);

// --- POST SCHEMA ---
export interface IPost extends Document {
  title: string;
  description: string;
  imageUrl?: string;
  hashtags: string[];
  campaignName: string;
  targetPlatforms: string[]; 
  status: "Draft" | "Pending Approval" | "Scheduled" | "Published" | "Rejected";
  published: boolean; // <-- NEW
  scheduledTime?: Date;
  createdBy: string; 
  creatorId: string; // <-- NEW
  rejectionReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema: Schema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, default: "" },
    hashtags: [{ type: String }],
    campaignName: { type: String, required: true },
    targetPlatforms: [{ type: String, required: true }],
    status: {
      type: String,
      enum: ["Draft", "Pending Approval", "Scheduled", "Published", "Rejected"],
      default: "Draft",
    },
    published: { type: Boolean, default: false }, // <-- NEW
    scheduledTime: { type: Date },
    createdBy: { type: String, required: true },
    creatorId: { type: String, required: true }, // <-- NEW
    rejectionReason: { type: String },
  },
  { timestamps: true }
);

// Export Mongoose Models
export const Campaign: Model<ICampaign> =
  mongoose.models.Campaign || mongoose.model<ICampaign>("Campaign", CampaignSchema);

export const Post: Model<IPost> =
  mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema);