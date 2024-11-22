export type IProjects = {
  name: string;
  description: string;
  techStack: string[];
  features: string[];
  role: string;
  challengesSolved: string[];
  clientLink: string;
  serverLink: string;
  liveDemo?: string;
  mediaLinks?: string[];
  createdAt?: Date;
  updatedAt?: Date;
};
