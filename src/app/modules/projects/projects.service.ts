import { IProjects } from './projects.interface';
import { ProjectsModel } from './projects.model';

const createProjectsIntoDB = async (payload: IProjects) => {
  try {
    const newProjects = await ProjectsModel.create(payload);
    return newProjects;
  } catch (error) {
    console.error('Error in create  projects IntoDB:', error);
  }
};

export const ProjectsService = { createProjectsIntoDB };
