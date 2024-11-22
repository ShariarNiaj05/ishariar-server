import config from '.';
import { S3Client } from '@aws-sdk/client-s3';

//* Main config file
export const createS3Client = (path: string) => {
  return new S3Client({
    endpoint: `${config.r2Storage.endpoint}/${path}`,
    credentials: {
      accessKeyId: config.r2Storage.accessKeyId as string,
      secretAccessKey: config.r2Storage.secretAccessKey as string,
    },
    region: config.r2Storage.region,
    forcePathStyle: true,
  });
};

export const r2 = {
  Experiences: {
    bucket: createS3Client('experiences'),
    bucketURL: config.r2Storage.url.experiences,
  },
  Projects: {
    bucket: createS3Client('projects'),
    bucketURL: config.r2Storage.url.projects,
  },
  Skills: {
    bucket: createS3Client('skills'),
    bucketURL: config.r2Storage.url.skills,
  },
  Blogs: {
    bucket: createS3Client('blogs'),
    bucketURL: config.r2Storage.url.blog,
  },
};
