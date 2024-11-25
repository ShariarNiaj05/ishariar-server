import express, { NextFunction, Request, Response } from 'express';
import { ExperienceController, SkillsController } from './skills.controller';
import { FileUploadConfig } from '../../config/multer';

const router = express.Router();

// router.post(
//   '/',
//   FileUploadConfig.upload.fields([{ name: 'media' }]),
//   (req: Request, res: Response, next: NextFunction) => {
//     const parsedData = JSON.parse(req.body.data || '{}');
//     req.body = { ...parsedData, ...req.body };
//     req.body = JSON.parse(req.body.data);
//     return ExperienceController.createExperience(req, res, next);
//   },
// );

// GET: Retrieve all skills
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  return SkillsController.getAllSkills(req, res, next);
});

export const ExperienceRoutes = router;
