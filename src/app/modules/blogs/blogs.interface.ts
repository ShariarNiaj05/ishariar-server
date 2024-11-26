export type IBlog = {
  title: string;
  content: string;
  coverImage: {
    url: string;
    key: string;
  };
  status: 'Draft' | 'Published';
  views: number;
  likes: number;
  comments?: {
    name: string;
    email: string;
    comment: string;
    date: Date;
  }[];
};
