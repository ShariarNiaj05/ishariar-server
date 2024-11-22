import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { ProjectsService } from './projects.service';

const createProjects = catchAsync(async (req: Request, res: Response) => {
  console.log('Request Body:', req.body);

  const result = await ProjectsService.createProjectsIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Projects created successfully',
    data: result,
  });
});

export const ProjectsController = { createProjects };
