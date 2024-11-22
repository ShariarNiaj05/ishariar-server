import mongoose, { Schema } from 'mongoose';
import { IExperience } from './experience.interface';

const experienceSchema: Schema<IExperience> = new mongoose.Schema({});

export const Bid = mongoose.model<IExperience>('Demo', experienceSchema);
