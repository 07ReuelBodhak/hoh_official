import mongoose, { Schema, model, models } from "mongoose";

export interface IUser {
  discordId: string;
  username: string;
  avatar?: string;
  role: "admin" | "moderator" | "staff";
}

const UserSchema = new Schema<IUser>(
  {
    discordId: {
      type: String,
      required: true,
      unique: true,
    },

    username: {
      type: String,
      required: true,
    },

    avatar: {
      type: String,
      default: "/default-admin.png",
    },

    role: {
      type: String,
      enum: ["admin", "moderator", "staff"],
      default: "staff",
    },
  },
  { timestamps: true },
);

const User = models.User || model<IUser>("User", UserSchema);

export default User;
