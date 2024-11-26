import mongoose, { Schema } from 'mongoose';
import { IBlog } from '../skills/skills.interface';

const blogSchema: Schema<IBlog> = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    coverImage: [
      {
        url: { type: String, required: true },
        key: { type: String, required: true },
      },
    ],
    status: {
      type: String,
      enum: ['Draft', 'Published'],
      required: true,
    },
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    comments: [
      {
        name: { type: String },
        email: { type: String },
        comment: { type: String },
        date: { type: Date },
      },
    ],
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const BlogsModel = mongoose.model<IBlog>('Blogs', blogSchema);
