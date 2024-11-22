export type IProjects = {
  name: string;
  description: string;
  techStack: string[];
  features: string[];
  role: string;
  challengesSolved: string[];
  clientLink: string;
  serverLink: string;
  liveLink: string;
  mediaLinks: string[];
  demonstration?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
