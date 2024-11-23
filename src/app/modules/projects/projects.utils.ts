import fs from 'fs';
import { r2 } from '../../config/r2-storage';
import { IR2Response, IUploadFile } from '../../interface/file';
import { r2StorageUpload } from '../../utils/fileUploadHelper';
import {
  filePayload,
  FileUpdatePayload,
  generatePreviewFile,
  splitFileKey,
} from '../../utils/serviceUtils';

export const ProjectsFileUploadOrUpdateIntoR2 = async (
  file: IUploadFile,
  BucketName: string,
  key?: string,
): Promise<{ result: IR2Response; url: string }> => {
  let payload;
  if (!key) {
    payload = filePayload(file, BucketName);
  } else {
    payload = FileUpdatePayload(file, BucketName, key);
  }
  const result = await r2StorageUpload.ProjectsUploadIntoR2(payload);

  // split Key
  const finalResultKey = splitFileKey(result);

  // generate file url
  const previewUrl = generatePreviewFile(
    r2.Projects.bucketURL as string,
    BucketName,
    finalResultKey,
  );

  // remove file from local
  if (result) {
    fs.unlinkSync(file.path);
  }

  return {
    result: result,
    url: previewUrl,
  };
};
FileUploadOrUpdateIntoR2 = async (
  file: IUploadFile,
  BucketName: string,
  key?: string,
): Promise<{ result: IR2Response; url: string }> => {
  let payload;
  if (!key) {
    payload = filePayload(file, BucketName);
  } else {
    payload = FileUpdatePayload(file, BucketName, key);
  }
  const result = await r2StorageUpload.VideoTemplateUploadIntoR2(payload);

  // split Key
  const finalResultKey = splitFileKey(result);

  // generate file url
  const previewUrl = generatePreviewFile(
    r2.VideoTemplate.bucketURL as string,
    BucketName,
    finalResultKey,
  );

  // remove file from local
  if (result) {
    fs.unlinkSync(file.path);
  }

  return {
    result: result,
    url: previewUrl,
  };
};
