import { Request } from 'express';
import { ExperienceModel } from './experience.model';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';

const createExperienceIntoDB = async (req: Request) => {
  try {
    const newExperience = await ExperienceModel.create(req);

    //@ts-expect-error: possible null error
    const media = req.files['media']?.[0] ?? null;

    if (!media) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'No mediaLinks has been selected. Please choose a mediaLinks file to proceed.',
      );
    }

    // upload to r2 storage
    const { result: mediaLinksResult, url: mediaLinksUrl } = await (media,
    'projects');

    return newExperience;
  } catch (error) {
    console.error('Error in create  experience IntoDB:', error);
  }
};

export const ExperienceService = { createExperienceIntoDB };
