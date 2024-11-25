/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from 'express';
import { SkillsModel } from './skills.model';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { SkillsFileUploadOrUpdateIntoR2 } from './skills.utils';

const getSkills = async () => {
  const skills = await SkillsModel.find({});
  return skills;
};
const createSkillIntoDB = async (req: Request) => {
  try {
    //@ts-expect-error: possible null error
    const mediaFiles = req.files['media'] ?? []; // Handle multiple media files
    if (!mediaFiles.length) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'No media files selected. Please choose files to proceed.',
      );
    }

    // Upload each media file to R2 storage
    const media = await Promise.all(
      mediaFiles.map(async (file: any) => {
        const { result: mediaResult, url: mediaUrl } =
          await SkillsFileUploadOrUpdateIntoR2(file, 'skills');

        return {
          url: mediaUrl,
          key: mediaResult?.Key,
        };
      }),
    );

    // Create skill data
    const skillData = {
      name: req.body.name,
      category: req.body.category,
      media,
    };

    const newSkill = await SkillsModel.create(skillData);
    return newSkill;
  } catch (error) {
    console.error('Error in createSkillIntoDB:', error);
    throw error;
  }
};

export const SkillsService = { getSkills, createSkillIntoDB };
