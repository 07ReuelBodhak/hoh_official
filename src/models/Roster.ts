import mongoose, { Schema, Document } from "mongoose";

export interface PlayerDocument extends Document {
  name: string;
  rank: string;
  position: string[];
}

const PlayerSchema = new Schema<PlayerDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    rank: {
      type: String,
      required: true,
    },

    position: {
      type: [String],
      required: true,
      default: [],
    },
  },
  { timestamps: true },
);

export default mongoose.models.Player ||
  mongoose.model<PlayerDocument>("Player", PlayerSchema);
