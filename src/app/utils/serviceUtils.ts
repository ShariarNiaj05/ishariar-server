import { IR2Response, IUploadFile } from '../interface/file';
import fs from 'fs';

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
