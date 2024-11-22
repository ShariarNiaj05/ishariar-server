import express from 'express';
import { ProjectsController } from './projects.controller';

const router = express.Router();

router.post('/add-experience', ProjectsController.createProjects);

export const ProjectsRoutes = router;
