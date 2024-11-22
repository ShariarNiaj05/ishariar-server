/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from 'http-status';
import { r2 } from '../config/r2-storage';
import AppError from '../errors/AppError';
import { IR2Response, IR2UploadFile, R2BucketKey } from '../interface/file';
import { PutObjectPayload } from './serviceUtils';

const uploadFileToR2 = async (
  payload: IR2UploadFile,
  bucketName: R2BucketKey,
): Promise<IR2Response> => {
  try {
    const uploadCommand = PutObjectPayload(payload);
    const result: IR2Response = (await r2[bucketName].bucket.send(
      uploadCommand,
    )) as any;
    result.Key = uploadCommand.input.Key as string;
    result.ETag = result.ETag ?? '';
    return result;
  } catch (error) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Error uploading file to ${bucketName}: Error uploading file:`,
    );
  }
};

const ExperienceUploadIntoR2 = (payload: IR2UploadFile): Promise<IR2Response> =>
  uploadFileToR2(payload, 'Experience');

const ProjectsUploadIntoR2 = (payload: IR2UploadFile): Promise<IR2Response> =>
  uploadFileToR2(payload, 'Projects');

const SkillsUploadIntoR2 = (payload: IR2UploadFile): Promise<IR2Response> =>
  uploadFileToR2(payload, 'Skills');

const BlogsUploadIntoR2 = (payload: IR2UploadFile): Promise<IR2Response> =>
  uploadFileToR2(payload, 'Blogs');

export const r2StorageUpload = {
  ExperienceUploadIntoR2,
  ProjectsUploadIntoR2,
  SkillsUploadIntoR2,
  BlogsUploadIntoR2,
};
