import { Request } from 'express';
import { ExperienceModel } from './experience.model';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { ExperienceFileUploadOrUpdateIntoR2 } from './experience.utils';

const createExperienceIntoDB = async (req: Request) => {
  try {
    //@ts-expect-error: possible null error
    const mediaFiles = req.files['media'] ?? null;

    if (!mediaFiles || !Array.isArray(mediaFiles)) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'No mediaLinks has been selected. Please choose a mediaLinks file to proceed.',
      );
    }

    // Upload each media file to R2 storage
    const media = await Promise.all(
      mediaFiles.map(async (file) => {
        const { result: mediaResult, url: mediaUrl } =
          await ExperienceFileUploadOrUpdateIntoR2(file, 'experiences');

        return {
          url: mediaUrl,
          key: mediaResult?.Key,
        };
      }),
    );

    const uploadData = {
      title: req.body.title,
      company: req.body.company,
      location: req.body.location,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      description: req.body.description,
      responsibilities: req.body.responsibilities,
      keyInitiatives: req.body.keyInitiatives,
      media: media,
    };
    const newExperience = await ExperienceModel.create(uploadData);

    return newExperience;
  } catch (error) {
    console.error('Error in create  experience IntoDB:', error);
  }
};

const getAllExperiences = async () => {
  try {
    const experiences = await ExperienceModel.find();
    return experiences;
  } catch (error) {
    console.error('Error in fetching experiences:', error);
    throw error;
  }
};

export const ExperienceService = { createExperienceIntoDB, getAllExperiences };
