import { IExperience } from './experience.interface';
import { ExperienceModel } from './experience.model';

const createExperienceIntoDB = async (payload: IExperience) => {
  try {
    const newExperience = await ExperienceModel.create(payload);
    return newExperience;
  } catch (error) {
    console.error('Error in create  experience IntoDB:', error);
  }
};

export const ExperienceService = { createExperienceIntoDB };
