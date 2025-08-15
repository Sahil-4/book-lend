interface UserT {
  id: string;
  username: string;
  avatar: string | null;
  name: string;
  phone: string;
  bio: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  password: string;
  createdAt: string;
  updatedAt: string;
}

type UserLogin = Pick<UserT, "username" | "phone" | "password">;

type UserSignup = Pick<UserT, "username" | "name" | "phone" | "password">;

type UserProfile = Omit<UserT, "password">;

type JWTDecoded = {
  exp: number;
  iat: number;
  id: string;
  username: string;
};

export type { UserT, UserLogin, UserSignup, UserProfile, JWTDecoded };
