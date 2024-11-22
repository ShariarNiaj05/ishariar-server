/* eslint-disable @typescript-eslint/no-explicit-any */
import { IR2Response, IR2UploadFile, R2BucketKey } from '../interface/file';
import { r2 } from '../config/r2-storage';

import { StatusCodes } from 'http-status-codes';
import { PutObjectPayload } from '../utils/utils';
import ApiError from '../error/apiError';

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
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
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
  IconFileUploadIntoR2,
  DesignTemplateUploadIntoR2,
  CourseAndLearningUploadIntoR2,
  StockPhotosUploadIntoR2,
  SoftwareAndToolsUploadIntoR2,
  FeedbackFileUploadIntoR2,
  BigDescriptionFileUploadIntoR2,
  VideoTemplateUploadIntoR2,
};
