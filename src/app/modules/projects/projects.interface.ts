import { Types } from 'mongoose';

export type IProjects = {
  name: string;
  description: string;
  techStack: string[] | Types.ObjectId[];
  features: string[];
  role: string;
  challengesSolved: string[];
  clientLink: string;
  serverLink: string;
  liveLink: string;
  mediaLinks: [
    {
      url: string;
      key: string;
    },
  ]; //media
  demonstration?: {
    url: string;
    key: string;
  }; //media
  createdAt?: Date;
  updatedAt?: Date;
};
