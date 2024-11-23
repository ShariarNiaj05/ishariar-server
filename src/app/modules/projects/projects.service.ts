import { Request } from 'express';
import { IProjects } from './projects.interface';
import { ProjectsModel } from './projects.model';

const getAllProjects = async () => {
  return await ProjectsModel.find();
};

const getProjectById = async (id: string) => {
  return await ProjectsModel.findById(id);
};

const addProject = async (req: Request) => {
  const project = await ProjectsModel.create(data);
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
