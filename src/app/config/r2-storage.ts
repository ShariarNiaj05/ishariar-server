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
  icon: {
    bucket: createS3Client('icons'),
    bucketUrl: config.r2Storage.url.icon,
  },
  DesignTemplate: {
    bucket: createS3Client('design-templates'),
    bucketURL: config.r2Storage.url.designTemplate,
  },
  CourseAndLearning: {
    bucket: createS3Client('course-and-learning'),
    bucketURL: config.r2Storage.url.courseAndLearning,
  },
  StockPhoto: {
    bucket: createS3Client('stock-photos'),
    bucketURL: config.r2Storage.url.stockPhoto,
  },
  SoftwareAndTool: {
    bucket: createS3Client('software-and-tools'),
    bucketURL: config.r2Storage.url.softwareAndTools,
  },
  Feedback: {
    bucket: createS3Client('feedback'),
    bucketURL: config.r2Storage.url.feedbackBucketURL,
  },
  Description: {
    bucket: createS3Client('software-big-description'),
    bucketURL: config.r2Storage.url.softwareDescriptionURL,
  },
  VideoTemplate: {
    bucket: createS3Client('video-template'),
    bucketURL: config.r2Storage.url.videoTemplateURL,
  },
};
