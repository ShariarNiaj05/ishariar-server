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
    const newProject = await ProjectsService.addProject(req);

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

const updateProject = catchAsync(async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedProject = await ProjectsService.updateProject(id, req.body);
    if (!updatedProject) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Project not found');
    }
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Projects created successfully',
      data: updatedProject,
    });
  } catch (error) {
    console.log('Request Body:', error);
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update project');
  }
});

const deleteProject = catchAsync(async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedProject = await ProjectsService.deleteProject(id);

    if (!deletedProject) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Project not found');
    }
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: 'Projects created successfully',
      data: deletedProject,
    });
  } catch (error) {
    console.log('Request Body:', error);
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete project');
  }
});

export const ProjectsController = {
  getAllProjects,
  getProjectById,
  addProject,
  updateProject,
  deleteProject,
};
