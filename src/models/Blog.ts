import mongoose, { Schema, model, models } from "mongoose";

export interface IBlog {
  title: string;
  content: string;
  coverImage?: string;
  author?: string;
  authorPfp?: string;
  date: Date;
  createdBy: string;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    coverImage: {
      type: String,
      default: null,
    },

    author: {
      type: String,
      required: true,
    },
    authorPfp: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },

    createdBy: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const Blog = models.Blog || model<IBlog>("Blog", BlogSchema);

export default Blog;
