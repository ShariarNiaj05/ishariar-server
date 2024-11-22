import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { ProjectsService } from './projects.service';
import AppError from '../../errors/AppError';

const getAllProjects = catchAsync(async (req: Request, res: Response) => {
  try {
    const projects = await ProjectsService.getAllProjects();
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Projects retrieved successfully',
      data: projects,
    });
  } catch (error) {
    console.log('Request Body:', error);
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to get all projects');
  }
});

export const ProjectsController = { getAllProjects };
