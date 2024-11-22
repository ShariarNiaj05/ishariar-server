import { ObjectCannedACL, PutObjectCommand } from '@aws-sdk/client-s3';
import { IR2Response, IR2UploadFile, IUploadFile } from '../interface/file';
import fs from 'fs';
import { r2StorageUpload } from './fileUploadHelper';
import { r2 } from '../config/r2-storage';

//* Split fine mimetype and get fist index
export function getFileType(file: IUploadFile): string {
  const mimeTypeParts = file.mimetype.split('/');
  return mimeTypeParts[1] ? mimeTypeParts[1] : 'Unknown';
}

export const filePayload = (file: IUploadFile, BucketName: string) => {
  const fileContent = fs.readFileSync(file.path);

  //* R2 storage payload data
  const Payload = {
    Bucket: BucketName,
    Key: `${Date.now()}_${file.originalname}`,
    Body: fileContent,
    ContentType: file.mimetype,
    ACL: 'public-read',
  };
  return Payload;
};

export const FileUpdatePayload = (
  file: IUploadFile,
  BucketName: string,
  key: string,
) => {
  const fileContent = fs.readFileSync(file.path);

  //* R2 storage payload data
  const Payload = {
    Bucket: BucketName,
    Key: key,
    Body: fileContent,
    ContentType: file.mimetype,
    ACL: 'public-read',
  };
  return Payload;
};

export const splitFileKey = (uploadResult: IR2Response) => {
  let finalResultKey;
  const modifyKey = uploadResult?.Key?.split('/')[1];
  if (modifyKey) {
    finalResultKey = modifyKey;
    uploadResult.Key = modifyKey;
  } else {
    finalResultKey = uploadResult?.Key;
  }
  return finalResultKey;
};

export const generatePreviewFile = (
  bucketURL: string,
  BucketName: string,
  finalResultKey: string,
) => {
  const previewURL = `${bucketURL}/${BucketName}/${finalResultKey}`;
  return previewURL;
};

export const PutObjectPayload = (payload: IR2UploadFile) => {
  return new PutObjectCommand({
    ...payload,
    ACL: payload.ACL as ObjectCannedACL,
  });
};

export const FileUpload = async (
  file: IUploadFile,
  BucketName: string,
): Promise<{ result: IR2Response; url: string }> => {
  //* R2 storage payload data
  const Payload = filePayload(file, BucketName);

  const result = await r2StorageUpload.ExperienceUploadIntoR2(Payload);

  //* Split key
  const finalResultKey = splitFileKey(result);

  //* Generate r2 file preview url
  const previewURL = generatePreviewFile(
    r2.experiences.bucketURL as string,
    BucketName,
    finalResultKey,
  );

  /*
   * If Upload file then remove file into local file folder
   */
  if (result) {
    fs.unlinkSync(file.path);
  }
  return {
    result: result,
    url: previewURL,
  };
};
