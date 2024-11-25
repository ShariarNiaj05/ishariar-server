import mongoose, { Schema } from 'mongoose';
import { IExperience } from './blogs.interface';

const experienceSchema: Schema<IExperience> = new mongoose.Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    location: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    description: { type: String, required: true },
    responsibilities: { type: [String], required: true },
    keyInitiatives: { type: [String] },
    media: [
      {
        url: { type: String, required: true },
        key: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  },
);

export const ExperienceModel = mongoose.model<IExperience>(
  'Experience',
  experienceSchema,
);
