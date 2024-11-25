import mongoose, { Schema } from 'mongoose';
import { ISkill } from './skills.interface';

const skillSchema: Schema<ISkill> = new mongoose.Schema(
  {
    name: { type: String, required: true }, // Skill name
    category: {
      type: String,
      enum: [
        'Language',
        'Backend',
        'Frontend',
        'APIs',
        'Tools',
        'Others',
        'Interpersonal',
      ],
      required: true,
    }, // Enum for predefined categories
    media: [
      {
        url: { type: String, required: true }, // Media URL
        key: { type: String, required: true }, // Media key
      },
    ], // Array of media objects
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  },
);

export const SkillModel = mongoose.model<ISkill>('Skills', skillSchema);
