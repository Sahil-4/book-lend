import { prisma } from "../prisma/index.js";
import { User } from "./user.model.js";
import { Message } from "./message.model.js";

interface Chat {
  id: string;
  participants: Pick<User, "id" | "name" | "username" | "bio">[];
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}

export const getAllChatsCount = async (userId: string) => {
  return await prisma.chat.count({
    where: { participants: { some: { id: userId } } },
  });
};

export const getAllChats = async (
  userId: string,
  take: number,
  skip: number,
): Promise<Omit<Chat, "messages">[]> => {
  return await prisma.chat.findMany({
    where: { participants: { some: { id: userId } } },
    include: { participants: true },
    orderBy: {
      createdAt: "desc",
    },
    take: take,
    skip: skip,
  });
};

export const getChatById = async (userId: string, id: string): Promise<Chat | null> => {
  return await prisma.chat.findUnique({
    where: { id, participants: { some: { id: userId } } },
    include: { participants: true, messages: true },
  });
};

export const createChat = async (participants: string[]): Promise<Chat> => {
  const existingChat = await prisma.chat.findFirst({
    where: { participants: { every: { id: { in: participants } } } },
    include: { participants: true, messages: true },
  });
  if (existingChat) return existingChat;

  return await prisma.chat.create({
    data: { participants: { connect: participants.map((userId) => ({ id: userId })) } },
    include: { participants: true, messages: true },
  });
};

export const deleteChat = async (
  userId: string,
  id: string,
): Promise<Omit<Chat, "messages" | "participants">> => {
  return await prisma.chat.delete({
    where: { id, participants: { some: { id: userId } } },
  });
};

export type { Chat };
