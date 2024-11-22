import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { ExperienceService } from './experience.service';

const createExperience = catchAsync(async (req: Request, res: Response) => {
  console.log('Request Body:', req.body);

  const result = await ExperienceService.createExperienceIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Experience created successfully',
    data: result,
  });
});

export const ExperienceController = { createExperience };
