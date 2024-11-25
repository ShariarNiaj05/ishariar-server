export type ISkill = {
  name: string;
  category:
    | 'Language'
    | 'Backend'
    | 'Frontend'
    | 'APIs'
    | 'Tools'
    | 'Others'
    | 'Interpersonal';
  media: [
    {
      url: string;
      key: string;
    },
  ];

  title: string;
  company: string;
  location: string;
  startDate: Date;

  endDate?: Date;
  description: string;
  responsibilities: string[];
  keyInitiatives?: string[];
};
