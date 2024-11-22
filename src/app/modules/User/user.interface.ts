export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  profilePicture?: string;
  bio?: string;
  followers?: string[];
  following?: string[];
  contents?: string[];
  upvotedContents?: string[];
  downvotedContents?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}
