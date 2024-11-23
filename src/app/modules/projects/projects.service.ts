import { Request } from 'express';
import { IProjects } from './projects.interface';
import { ProjectsModel } from './projects.model';
import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { ProjectsFileUploadOrUpdateIntoR2 } from './projects.utils';

const getAllProjects = async () => {
  return await ProjectsModel.find();
};

const getProjectById = async (id: string) => {
  return await ProjectsModel.findById(id);
};

const addProject = async (req: Request) => {
  //@ts-expect-error: possible null error
  const mediaLinks = req.files['mediaLinks']?.[0] ?? null;
  if (!mediaLinks) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'No mediaLinks has been selected. Please choose a mediaLinks file to proceed.',
    );
  }
  // upload to r2 storage
  const { result: mediaLinksResult, url: mediaLinksUrl } =
    await ProjectsFileUploadOrUpdateIntoR2(mediaLinks, 'projects');

  const project = await ProjectsModel.create(req);
  return project;
};

const updateProject = async (id: string, data: Partial<IProjects>) => {
  return await ProjectsModel.findByIdAndUpdate(id, data, { new: true });
};

const deleteProject = async (id: string) => {
  return await ProjectsModel.findByIdAndDelete(id);
};

export const ProjectsService = {
  getAllProjects,
  getProjectById,
  addProject,
  updateProject,
  deleteProject,
};
