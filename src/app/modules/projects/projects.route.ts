import express from 'express';
import { ProjectsController } from './projects.controller';
import { FileUploadConfig } from '../../config/multer';

const router = express.Router();

// router.post('/add-projects', ProjectsController.createProjects);

router.get('/projects', ProjectsController.getAllProjects);
router.get('/projects/:id', ProjectsController.getProjectById);
router.put('/projects/:id', ProjectsController.updateProject);
router.delete('/projects/:id', ProjectsController.deleteProject);

router.post(
  '/',
  FileUploadConfig.upload.fields([
    { name: 'thumbnail' },
    { name: 'preview-file' },
  ]),
  ProjectsController.addProject,
);

export const ProjectsRoutes = router;
