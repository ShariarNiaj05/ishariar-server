import express from 'express';
import { ProjectsController } from './projects.controller';

const router = express.Router();

router.post('/add-projects', ProjectsController.createProjects);

export const ProjectsRoutes = router;
