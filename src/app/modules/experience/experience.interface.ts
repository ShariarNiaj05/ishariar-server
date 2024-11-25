export type IExperience = {
  title: string;
  company: string;
  location: string;
  startDate: Date;
  media: [
    {
      url: string;
      key: string;
    },
  ];
  endDate?: Date;
  description: string;
  responsibilities: string[];
  keyInitiatives?: string[];
};
