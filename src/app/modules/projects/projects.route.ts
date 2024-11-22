import express from 'express';
import { ProjectsController } from './projects.controller';

const router = express.Router();

// router.post('/add-projects', ProjectsController.createProjects);

router.get('/projects', ProjectsController.getAllProjects);
router.get('/projects/:id', ProjectsController.getProjectById);
router.post('/projects', ProjectsController.addProject);
router.put('/projects/:id', ProjectsController.updateProject);
router.delete('/projects/:id', ProjectsController.deleteProject);

export const ProjectsRoutes = router;
