import { Request } from 'express';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { BlogsModel } from './blogs.model';
import { BlogsFileUploadOrUpdateIntoR2 } from './blogs.utils';

const createBlogsIntoDB = async (req: Request) => {
  try {
    //@ts-expect-error: possible null error
    const coverImageFiles = req.files['coverImage'] ?? null;

    if (!coverImageFiles || !Array.isArray(coverImageFiles)) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'No mediaLinks has been selected. Please choose a mediaLinks file to proceed.',
      );
    }

    // Upload each media file to R2 storage
    const coverImage = await Promise.all(
      coverImageFiles.map(async (file) => {
        const { result: mediaResult, url: mediaUrl } =
          await BlogsFileUploadOrUpdateIntoR2(file, 'blogs');

        return {
          url: mediaUrl,
          key: mediaResult?.Key,
        };
      }),
    );

    console.log('coverImage', coverImage);

    const uploadData = {
      // title: req.body.title,
      // company: req.body.company,
      // location: req.body.location,
      // startDate: req.body.startDate,
      // endDate: req.body.endDate,
      // description: req.body.description,
      // responsibilities: req.body.responsibilities,
      // keyInitiatives: req.body.keyInitiatives,
      title: req.body.title,
      content: req.body.content,
      status: req.body.status,
      comments: [],
      coverImage: coverImage,
    };
    const newExperience = await BlogsModel.create(uploadData);

    return newExperience;
  } catch (error) {
    console.error('Error in create  experience IntoDB:', error);
  }
};

const getAllBlogs = async () => {
  // try {
  //   const experiences = await ExperienceModel.find();
  //   return experiences;
  // } catch (error) {
  //   console.error('Error in fetching experiences:', error);
  //   throw error;
  // }
};

export const BlogsService = { createBlogsIntoDB, getAllBlogs };
