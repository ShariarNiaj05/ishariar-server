import express from 'express';
import { ExperienceController } from './experience.controller';

const router = express.Router();

router.post('/add-experience', ExperienceController.createExperience);

export const ExperienceRoutes = router;
