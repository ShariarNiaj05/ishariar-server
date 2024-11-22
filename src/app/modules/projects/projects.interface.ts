export type IProjects = {
  title: string;
  company: string;
  location: string;
  startDate: Date;
  endDate?: Date;
  description: string;
  responsibilities: string[];
  keyInitiatives?: string[];
};
