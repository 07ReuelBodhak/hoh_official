import mongoose, { Schema, Document, Model } from "mongoose";

export interface SetScore {
  mapName: string;
  us: number;
  them: number;
}

export interface MatchResultDocument extends Document {
  opponent: string;
  datePlayed: string;
  mode: "official" | "friendly" | "community";
  sets: SetScore[];
  createdAt: Date;
}

const SetSchema = new Schema<SetScore>(
  {
    mapName: {
      type: String,
      required: true,
      trim: true,
    },
    us: {
      type: Number,
      required: true,
      default: 0,
    },
    them: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { _id: false }, // no separate _id for each set
);

const ResultSchema = new Schema<MatchResultDocument>(
  {
    opponent: {
      type: String,
      required: true,
      trim: true,
    },

    datePlayed: {
      type: String,
      required: true,
    },

    mode: {
      type: String,
      enum: ["official", "friendly", "community"],
      default: "official",
    },

    sets: {
      type: [SetSchema],
      required: true,
      validate: {
        validator: (v: SetScore[]) => v.length >= 2,
        message: "At least 2 sets are required",
      },
    },
  },
  {
    timestamps: true,
  },
);

const Result: Model<MatchResultDocument> =
  mongoose.models.Result || mongoose.model("Result", ResultSchema);

export default Result;
