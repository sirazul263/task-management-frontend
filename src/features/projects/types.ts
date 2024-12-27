export type Project = {
  id: number;
  name: string;
  key: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
  created_at: string;
  updated_at: string;
  image: string | null;
};
