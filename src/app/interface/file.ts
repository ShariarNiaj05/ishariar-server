export type IUploadFile = {
  fieldname: string;
  originalname: string;
  encoding: string;
  mimetype: string;
  destination: string;
  filename: string;
  path: string;
  size: number;
};

export type IR2Response = {
  ETag: string;
  VersionId: string;
  Location: string;
  key: string;
  Key: string;
  Bucket: string;
};

export type IR2FileUploadResponse = {
  ETag?: string;
  VersionId?: string;
  Location?: string;
  key?: string;
  Key?: string;
  Bucket?: string;
};

export type IR2UploadFile = {
  Bucket: string;
  Key: string;
  Body: Buffer;
  ContentType: string;
  ACL: string;
};

export type R2BucketKey = 'Experience' | 'Projects' | 'Skills' | 'Blogs';
