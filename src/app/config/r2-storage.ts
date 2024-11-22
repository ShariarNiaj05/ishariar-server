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
  experiences: {
    bucket: createS3Client('experiences'),
    bucketUrl: config.r2Storage.url.experiences,
  },
  projects: {
    bucket: createS3Client('projects'),
    bucketURL: config.r2Storage.url.projects,
  },
  skills: {
    bucket: createS3Client('skills'),
    bucketURL: config.r2Storage.url.skills,
  },
  blog: {
    bucket: createS3Client('blog'),
    bucketURL: config.r2Storage.url.blog,
  },
};
