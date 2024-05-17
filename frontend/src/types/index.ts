export type Note = {
  _id: string;
  title: string;
  text?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type User = {
  _id: string;
  name: string;
  email: string;
};
