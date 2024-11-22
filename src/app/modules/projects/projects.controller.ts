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
      statusCode: httpStatus.OK,
      success: true,
      message: 'Projects retrieved successfully',
      data: projects,
    });
  } catch (error) {
    console.log('Request Body:', error);
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to get all projects');
  }
});

const getProjectById = catchAsync(async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const project = await ProjectsService.getProjectById(id);
    if (!project) {
      throw new AppError(httpStatus.NOT_FOUND, 'Project not found');
    }
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Projects retrieved successfully',
      data: project,
    });
  } catch (error) {
    console.log('Request Body:', error);
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to fetch project');
  }
});

const addProject = catchAsync(async (req: Request, res: Response) => {
  try {
    const newProject = await ProjectsService.addProject(req.body);

    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Projects created successfully',
      data: newProject,
    });
  } catch (error) {
    console.log('Request Body:', error);
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to add project');
  }
});

export const ProjectsController = {
  getAllProjects,
  getProjectById,
  addProject,
};
