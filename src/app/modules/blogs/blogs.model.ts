import mongoose, { Schema } from 'mongoose';
import { IExperience } from './blogs.interface';
import { IBlog } from '../skills/skills.interface';

const blogSchema: Schema<IBlog> = new mongoose.Schema(
  {
    title: { type: String, required: true }, // Blog title
    content: { type: String, required: true }, // Blog content in HTML format
    coverImage: {
      url: { type: String, required: true }, // Cover image URL
      key: { type: String, required: true }, // Cover image key
    },
    status: {
      type: String,
      enum: ['Draft', 'Published'],
      required: true,
    }, // Status of the blog
    views: { type: Number, default: 0 }, // Number of views
    likes: { type: Number, default: 0 }, // Number of likes
    comments: [
      {
        name: { type: String, required: true }, // Commenter's name
        email: { type: String, required: true }, // Commenter's email
        comment: { type: String, required: true }, // Comment text
        date: { type: Date, required: true }, // Comment date
      },
    ], // Array of comments
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

export const BlogsModel = mongoose.model<IBlog>('Blogs', blogSchema);
