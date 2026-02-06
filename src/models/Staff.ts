import mongoose, { Schema, Document, Model } from "mongoose";

export interface IStaff extends Document {
  name: string;
  role: string;
  description: string;
  imageUrl?: string;
  discordId: string;
  createdAt: Date;
}

const StaffSchema = new Schema<IStaff>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    role: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    imageUrl: {
      type: String,
      default: "",
    },

    discordId: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true },
);

export default mongoose.models.Staff
  ? (mongoose.models.Staff as Model<IStaff>)
  : mongoose.model<IStaff>("Staff", StaffSchema);
