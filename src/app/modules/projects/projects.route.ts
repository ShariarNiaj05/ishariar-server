import express, { NextFunction, Request, Response } from 'express';
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
    { name: 'mediaLinks' },
    { name: 'demonstration' },
  ]),
  (req: Request, res: Response, next: NextFunction) => {
    console.log('Raw data:', req.body.data);

    req.body = JSON.parse(req.body.data);
    return ProjectsController.addProject(req, res, next);
  },
);

export const ProjectsRoutes = router;
