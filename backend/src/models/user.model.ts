import { prisma } from "../prisma/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface User {
  id: string;
  username: string;
  avatar: string | null;
  name: string;
  phone: string;
  bio: string | null;
  refreshToken: string | null;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export const getAllUsersCount = async () => {
  return await prisma.user.count();
};

export const getAllUsers = async (
  take: number,
  skip: number,
): Promise<Omit<User, "password" | "updatedAt" | "phone" | "refreshToken">[]> => {
  return await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: take,
    skip: skip,
  });
};

export const getUserById = async (
  id: string,
): Promise<Omit<User, "password" | "refreshToken"> | null> => {
  return await prisma.user.findUnique({
    where: { id },
    omit: {
      phone: false,
      updatedAt: false,
    },
  });
};

export const createUser = async (
  user: Omit<User, "id" | "createdAt" | "updatedAt">,
): Promise<Omit<User, "password" | "refreshToken"> | null> => {
  return await prisma.user.create({
    data: { ...user },
    omit: {
      phone: false,
      updatedAt: false,
    },
  });
};

export const getUserByUsernameORPhone = async (
  username?: string,
  phone?: string,
): Promise<Omit<User, "password"> | null> => {
  if (!username && !phone) return null;

  return await prisma.user.findFirst({
    where: {
      OR: [{ username: username }, { phone: phone }],
    },
    omit: {
      refreshToken: false,
      phone: false,
      updatedAt: false,
    },
  });
};

export const updateUser = async (
  id: string,
  user: Partial<Omit<User, "id" | "password" | "createdAt" | "updatedAt">>,
): Promise<Omit<User, "password" | "refreshToken"> | null> => {
  return await prisma.user.update({
    where: { id },
    data: { ...user },
    omit: {
      phone: false,
      updatedAt: false,
    },
  });
};

export const deleteUser = async (id: string) => {
  await prisma.user.delete({
    where: { id },
  });
};

export const __hashPassword__ = async (password: string): Promise<string> => {
  const __SALT_ROUNDS__ = 12;
  const hashed_password = await bcrypt.hash(password, __SALT_ROUNDS__);
  return hashed_password;
};

export const __generateAccessToken__ = (user: Omit<User, "password" | "refreshToken">) => {
  const __payload__ = { id: user.id, username: user.username };
  const __JWT_SECRET__ = String(process.env.JWT_SECRET);
  const __options__ = { expiresIn: "1h" };

  const __access_token__ = jwt.sign(__payload__, __JWT_SECRET__, __options__);

  return __access_token__;
};

export const __generateRefreshToken__ = async (user: Omit<User, "password" | "refreshToken">) => {
  const __payload__ = { id: user.id, username: user.username };
  const __JWT_SECRET__ = String(process.env.JWT_SECRET);
  const __options__ = { expiresIn: "3h" };

  const __refresh_token__ = jwt.sign(__payload__, __JWT_SECRET__, __options__);

  await updateUser(user.id, { refreshToken: __refresh_token__ });

  return __refresh_token__;
};

export const __generateAuthAndAccessToken__ = async (
  user: Omit<User, "password" | "refreshToken">,
) => {
  const __access_token__ = __generateAccessToken__(user);
  const __refresh_token__ = await __generateRefreshToken__(user);

  return { __access_token__, __refresh_token__ };
};

export const __matchUserPassword__ = async (iPassword: string, uPassword: string) => {
  return await bcrypt.compare(iPassword, uPassword);
};

export const __getUser__ = async (id: string) => {
  return await prisma.user.findFirst({
    where: { id },
    omit: {
      password: false,
      phone: false,
      updatedAt: false,
      refreshToken: false,
    },
  });
};

export const __getUserByUsernameORPhone__ = async (
  username?: string,
  phone?: string,
): Promise<User | null> => {
  return await prisma.user.findFirst({
    where: {
      OR: [{ username: username }, { phone: phone }],
    },
    omit: {
      password: false,
      phone: false,
      updatedAt: false,
      refreshToken: false,
    },
  });
};

export type { User };
