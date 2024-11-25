import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { BlogsService, ExperienceService } from './blogs.service';
import AppError from '../../errors/AppError';

const createBlog = catchAsync(async (req: Request, res: Response) => {
  try {
    const newProject = await BlogsService.createBlogsIntoDB(req);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Blogs created successfully',
      data: newProject,
    });
  } catch (error) {
    console.log('Request Body:', error);
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to add Blogs');
  }
});

const getBlogs = catchAsync(async (req: Request, res: Response) => {
  const blogs = await BlogsService.getAllBlogs();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Blogs fetched successfully',
    data: blogs,
  });
});

export const BlogsController = { createExperience, getExperiences };
