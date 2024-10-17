import { prisma } from "../prisma/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface User {
  id: string;
  username: string;
  name: string;
  phone: string;
  bio: string | null;
  accessToken: string | null;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

export const getAllUsers = async (): Promise<
  Omit<User, "password" | "updatedAt" | "phone" | "accessToken">[]
> => {
  return await prisma.user.findMany();
};

export const getUserById = async (
  id: string,
): Promise<Omit<User, "password" | "accessToken"> | null> => {
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
): Promise<Omit<User, "password" | "accessToken"> | null> => {
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
      accessToken: false,
      phone: false,
      updatedAt: false,
    },
  });
};

export const updateUser = async (
  id: string,
  user: Partial<Omit<User, "id" | "password" | "createdAt" | "updatedAt">>,
): Promise<Omit<User, "password" | "accessToken"> | null> => {
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

export const __generateAuthToken__ = (user: Omit<User, "password" | "accessToken">) => {
  const __payload__ = { id: user.id, username: user.username };
  const __JWT_SECRET__ = String(process.env.JWT_SECRET);
  const __options__ = { expiresIn: "1h" };

  const __auth_token__ = jwt.sign(__payload__, __JWT_SECRET__, __options__);

  return __auth_token__;
};

export const __generateAccessToken__ = async (user: Omit<User, "password" | "accessToken">) => {
  const __payload__ = { id: user.id, username: user.username };
  const __JWT_SECRET__ = String(process.env.JWT_SECRET);
  const __options__ = { expiresIn: "3h" };

  const __access_token__ = jwt.sign(__payload__, __JWT_SECRET__, __options__);

  await updateUser(user.id, { accessToken: __access_token__ });

  return __access_token__;
};

export const __generateAuthAndAccessToken__ = async (
  user: Omit<User, "password" | "accessToken">,
) => {
  const __auth_token__ = __generateAuthToken__(user);
  const __access_token__ = await __generateAccessToken__(user);

  return { __auth_token__, __access_token__ };
};

export const __matchUserPassword__ = async (iPassword: string, uPassword: string) => {
  return await bcrypt.compare(iPassword, uPassword);
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
      accessToken: false,
    },
  });
};

export type { User };
