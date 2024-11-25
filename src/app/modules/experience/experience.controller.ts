import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { ExperienceService } from './experience.service';
import AppError from '../../errors/AppError';

const createExperience = catchAsync(async (req: Request, res: Response) => {
  try {
    const newProject = await ExperienceService.createExperienceIntoDB(req);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Experience created successfully',
      data: newProject,
    });
  } catch (error) {
    console.log('Request Body:', error);
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to add Experience');
  }
});

export const ExperienceController = { createExperience };
