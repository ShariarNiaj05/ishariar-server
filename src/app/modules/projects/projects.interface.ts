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
  mediaLinks: [
    {
      url: string;
      key: string;
    },
  ]; //media
  demonstration?: string; //media
  createdAt?: Date;
  updatedAt?: Date;
};
