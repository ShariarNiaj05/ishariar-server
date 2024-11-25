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
};
