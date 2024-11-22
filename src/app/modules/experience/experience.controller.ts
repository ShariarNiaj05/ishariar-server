import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createExperience = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user?._id;

  if (!userId) {
    throw new Error('User not authenticated');
  }

  console.log('Request Headers:', req.headers);
  console.log('Request Body:', req.body);

  const result = await ContentService.createContentIntoDB(
    req.body,
    req.user?._id,
  );
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Content created successfully',
    data: result,
  });
});

export const ExperienceController = { createExperience };
