import { Request } from 'express';
import { ExperienceModel } from './experience.model';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { ExperienceFileUploadOrUpdateIntoR2 } from './experience.utils';

const createExperienceIntoDB = async (req: Request) => {
  try {
    //@ts-expect-error: possible null error
    const media = req.files['media']?.[0] ?? null;

    if (!media) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'No mediaLinks has been selected. Please choose a mediaLinks file to proceed.',
      );
    }

    // upload to r2 storage
    const { result: mediaResult, url: mediaUrl } =
      await ExperienceFileUploadOrUpdateIntoR2(media, 'experience');

    const newExperience = await ExperienceModel.create(req);

    return newExperience;
  } catch (error) {
    console.error('Error in create  experience IntoDB:', error);
  }
};

export const ExperienceService = { createExperienceIntoDB };
