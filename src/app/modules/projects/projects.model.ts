import mongoose, { Schema } from 'mongoose';
import { IProjects } from './projects.interface';

const experienceSchema: Schema<IProjects> = new mongoose.Schema({});

export const ProjectsModel = mongoose.model<IProjects>(
  'Projects',
  experienceSchema,
);
