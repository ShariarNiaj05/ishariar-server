import { IProjects } from './projects.interface';
import { ProjectsModel } from './projects.model';

const getAllProjects = async () => {
  return await ProjectsModel.find();
};

const getProjectById = async (id: string) => {
  return await ProjectsModel.findById(id);
};

const addProject = async (data: IProjects) => {
  const project = await ProjectsModel.create(data);
  return project;
};

export const ProjectsService = { getAllProjects, getProjectById, addProject };
