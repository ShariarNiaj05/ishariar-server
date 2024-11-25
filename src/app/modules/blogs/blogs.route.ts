import express, { NextFunction, Request, Response } from 'express';
import { FileUploadConfig } from '../../config/multer';
import { BlogsController } from './blogs.controller';

const router = express.Router();

router.post(
  '/',
  FileUploadConfig.upload.fields([{ name: 'coverImage' }]),
  (req: Request, res: Response, next: NextFunction) => {
    const parsedData = JSON.parse(req.body.data || '{}');
    req.body = { ...parsedData, ...req.body };
    req.body = JSON.parse(req.body.data);
    return BlogsController.getBlogs(req, res, next);
  },
);

router.get('/', BlogsController.getBlogs);

export const BlogsRoutes = router;
