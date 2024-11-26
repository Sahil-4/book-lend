type UserT = {
  id: string;
  username: string;
  name: string;
  phone: string;
  bio: string | null;
  accessToken: string | null;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

export type { UserT };
