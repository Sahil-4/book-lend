interface UserT {
  id: string;
  username: string;
  avatar: string | null;
  name: string;
  phone: string;
  bio: string | null;
  accessToken: string | null;
  authToken: string | null;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

type UserLogin = Pick<UserT, "username" | "phone" | "password">;

type UserSignup = Pick<UserT, "username" | "name" | "phone" | "bio" | "password">;

type UserProfile = Omit<UserT, "password">;

type JWTDecoded = {
  exp: number;
  iat: number;
  id: string;
  username: string;
};

export type { UserT, UserLogin, UserSignup, UserProfile, JWTDecoded };
