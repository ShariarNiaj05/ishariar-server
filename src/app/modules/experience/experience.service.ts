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
      await ExperienceFileUploadOrUpdateIntoR2(media, 'experiences');

    const uploadData = {
      title: req.body.title,
      company: req.body.company,
      location: req.body.location,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      description: req.body.description,
      responsibilities: req.body.responsibilities,
      keyInitiatives: req.body.keyInitiatives,

      mediaLinks: [
        {
          url: mediaUrl,
          key: mediaResult?.Key,
        },
      ],
    };
    const newExperience = await ExperienceModel.create(uploadData);

    return newExperience;
  } catch (error) {
    console.error('Error in create  experience IntoDB:', error);
  }
};

export const ExperienceService = { createExperienceIntoDB };
