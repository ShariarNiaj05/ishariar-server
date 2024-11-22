/* eslint-disable no-undef */
import { Request } from 'express';
import multer from 'multer';
import path from 'path';
import httpStatus from 'http-status';
import AppError from '../app/errors/AppError';

const validateFile = (
  file: Express.Multer.File,
  allowedTypes: string[],
  maxSize?: number,
) => {
  const fileExt = path.extname(file.originalname).toLowerCase();
  if (!allowedTypes.includes(fileExt)) {
    return `Invalid file format. Allowed formats: ${allowedTypes.join(', ')}`;
  }

  if (maxSize && file.size > maxSize) {
    return `File size exceeds the maximum limit of ${
      maxSize / (1024 * 1024)
    } MB.`;
  }
  return null;
};

// const designTemplateFileFilter = (
//   req: Request,
//   file: Express.Multer.File,
//   cb: multer.FileFilterCallback
// ) => {
//   let error = null;
//   if (file.fieldname === "asset-file") {
//     error = validateFile(file, [".jpg", ".jpeg", ".png", ".zip"]);
//   } else if (file.fieldname === "preview-file") {
//     error = validateFile(file, [".jpg", ".jpeg", ".png", ".svg", ".webp"]);
//   } else {
//     error = "Unexpected field name";
//   }
//   if (error) {
//     cb(new ApiError(httpStatus.BAD_REQUEST, error));
//   } else {
//     cb(null, true);
//   }
// };

// const courseAndLearningFileFilter = (
//   req: Request,
//   file: Express.Multer.File,
//   cb: multer.FileFilterCallback
// ) => {
//   let error;
//   if (file.fieldname === "asset-file") {
//     error = validateFile(file, [".zip", ".pdf"]);
//   } else if (file.fieldname === "preview-file") {
//     error = validateFile(file, [".jpg", ".jpeg", ".png", ".svg", ".webp"]);
//   } else {
//     error = "Unexpected field name";
//   }

//   if (error) {
//     cb(new ApiError(StatusCodes.BAD_REQUEST, error));
//   } else {
//     cb(null, true);
//   }
// };

// const iconFileFilter = (
//   req: Request,
//   file: Express.Multer.File,
//   cb: multer.FileFilterCallback
// ) => {
//   const allowMaxFileSize = 3 * 1024 * 1024;
//   const error = validateFile(
//     file,
//     [".jpg", ".jpeg", ".png", ".svg", ".webp"],
//     allowMaxFileSize
//   );

//   if (error) {
//     cb(new ApiError(StatusCodes.BAD_REQUEST, error));
//   } else {
//     cb(null, true);
//   }
// };

// const feedbackFileFilter = (
//   req: Request,
//   file: Express.Multer.File,
//   cb: multer.FileFilterCallback
// ) => {
//   //* This Means File Allow size 3MB
//   const allowMaxFileSize = 3 * 1024 * 1024;
//   const error = validateFile(
//     file,
//     [".jpg", ".jpeg", ".png", ".svg", ".webp"],
//     allowMaxFileSize
//   );
//   if (error) {
//     cb(new ApiError(StatusCodes.BAD_REQUEST, error));
//   } else {
//     cb(null, true);
//   }
// };

// const stockPhotoFilter = (
//   req: Request,
//   file: Express.Multer.File,
//   cb: multer.FileFilterCallback
// ) => {
//   const error = validateFile(file, [".jpg", ".jpeg", ".png", ".svg", ".webp"]);
//   if (error) {
//     cb(new ApiError(StatusCodes.BAD_REQUEST, error));
//   } else {
//     cb(null, true);
//   }
// };

// const softwareAndToolsFilter = (
//   req: Request,
//   file: Express.Multer.File,
//   cb: multer.FileFilterCallback
// ) => {
//   const error = validateFile(file, [".jpg", ".jpeg", ".png", ".svg", ".webp"]);
//   if (error) {
//     cb(new ApiError(StatusCodes.BAD_REQUEST, error));
//   } else {
//     cb(null, true);
//   }
// };

const projectsFileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  let error;
  if (file.fieldname === 'main-file') {
    error = validateFile(file, ['.zip', '.mogrt']);
  } else if (file.fieldname === 'mediaLinks') {
    error = validateFile(file, ['.jpg', '.jpeg', '.png', '.svg', '.webp']);
  } else if (file.fieldname === 'demonstration') {
    error = validateFile(file, ['.mp4', '.gif', 'mkv']);
  }
  if (error) {
    cb(
      new AppError(
        httpStatus.BAD_REQUEST,
        error ?? 'Project media upload failed',
      ),
    );
  } else {
    cb(null, true);
  }
};

export const Validation = {
  projectsFileFilter,
};
