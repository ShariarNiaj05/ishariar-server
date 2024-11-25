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
  console.log(req.files);
  // const data = JSON.stringify(req.body);
  //@ts-expect-error: possible null error
  const mediaFiles = req.files['mediaLinks'] ?? null;
  //@ts-expect-error: possible null error
  const demonstration = req.files['demonstration']?.[0] ?? null;

  if (!mediaFiles) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'No mediaLinks has been selected. Please choose a mediaLinks file to proceed.',
    );
  }

  if (!demonstration) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'No demonstration has been selected. Please choose a demonstration to proceed.',
    );
  }
  // Upload each media file to R2 storage
  const mediaLinks = await Promise.all(
    mediaFiles.map(async (file) => {
      const { result: mediaLinksResult, url: mediaLinksUrl } =
        await ProjectsFileUploadOrUpdateIntoR2(file, 'experiences');

      return {
        url: mediaLinksUrl,
        key: mediaLinksResult?.Key,
      };
    }),
  );

  // upload to r2 storage
  const { result: mediaLinksResult, url: mediaLinksUrl } =
    await ProjectsFileUploadOrUpdateIntoR2(mediaLinks, 'projects');
  console.log({ mediaLinksResult, mediaLinksUrl });
  //* image upload to r2 storage
  const { result: demonstrationResult, url: demonstrationUrl } =
    await ProjectsFileUploadOrUpdateIntoR2(demonstration, 'projects');
  console.log({ demonstrationResult, demonstrationUrl });

  const uploadData = {
    name: req.body.name,
    description: req.body.description,
    techStack: req.body.techStack,
    features: req.body.features,
    role: req.body.role,
    challengesSolved: req.body.challengesSolved,
    clientLink: req.body.clientLink,
    serverLink: req.body.serverLink,
    liveLink: req.body.liveLink,
    mediaLinks: [
      {
        url: mediaLinksUrl,
        key: mediaLinksResult?.Key,
      },
    ],
    demonstration: {
      url: demonstrationUrl,
      key: demonstrationResult?.Key,
    },
  };
  const project = await ProjectsModel.create(uploadData);
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
