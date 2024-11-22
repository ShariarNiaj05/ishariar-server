import mongoose, { Schema } from 'mongoose';
import { IProjects } from './projects.interface';

const projectsSchema: Schema<IProjects> = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    techStack: { type: [String], required: true },
    features: { type: [String], required: true },
    role: { type: String, required: true },
    challengesSolved: { type: [String], required: true },
    clientLink: { type: String, required: true },
    serverLink: { type: String, required: true },
    liveLink: { type: String, required: true },
    sourceCode: { type: String },
    mediaLinks: { type: [String], required: true },
    demonstration: { type: String },
  },
  {
    timestamps: true,
  },
);

export const ProjectsModel = mongoose.model<IProjects>(
  'Projects',
  projectsSchema,
);
