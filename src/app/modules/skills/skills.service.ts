/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from 'express';
import { SkillsModel } from './skills.model';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';

const getSkills = async () => {
  const skills = await SkillsModel.find({});
  return skills;
};
const createSkillIntoDB = async (req: Request) => {
  try {
    const mediaFiles = req.files['media'] ?? []; // Handle multiple media files
    if (!mediaFiles.length) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'No media files selected. Please choose files to proceed.',
      );
    }

    // Upload files to R2 storage
    const media = await Promise.all(
      mediaFiles.map(async (file: any) => {
        const { result, url } = await ExperienceFileUploadOrUpdateIntoR2(
          file,
          'skills',
        );
        return {
          url,
          key: result?.Key,
        };
      }),
    );

    // Create skill data
    const skillData = {
      name: req.body.name,
      category: req.body.category,
      media,
    };

    const newSkill = await SkillModel.create(skillData);
    return newSkill;
  } catch (error) {
    console.error('Error in createSkillIntoDB:', error);
    throw error;
  }
};

export const SkillsService = { getSkills };
