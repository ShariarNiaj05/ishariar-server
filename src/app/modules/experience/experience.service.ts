import { Request } from 'express';
import { ExperienceModel } from './experience.model';

const createExperienceIntoDB = async (req: Request) => {
  try {
    const newExperience = await ExperienceModel.create(req);

    //@ts-expect-error: possible null error
    const media = req.files['media']?.[0] ?? null;

    return newExperience;
  } catch (error) {
    console.error('Error in create  experience IntoDB:', error);
  }
};

export const ExperienceService = { createExperienceIntoDB };
