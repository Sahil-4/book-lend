import { Prisma } from "@prisma/client";
import { prisma } from "../prisma/index.js";

interface Message {
  id: string;
  type: string;
  content: string;
  isRead: boolean;
  senderId: string | null;
  receiverId: string | null;
  chatId: string;
  createdAt: Date;
  updatedAt: Date;
}

export const getMessagesCount = async (chatId: string) => {
  return await prisma.message.count({
    where: { chatId },
  });
};

export const getMessagesByChatId = async (
  id: string,
  take: number,
  skip: number,
): Promise<Message[]> => {
  return await prisma.message.findMany({
    where: { chatId: id },
    orderBy: {
      createdAt: "desc",
    },
    take: take,
    skip: skip,
  });
};

export const getMessageById = async (id: string): Promise<Message | null> => {
  return await prisma.message.findUnique({
    where: { id },
    include: {
      sender: true,
      receiver: true,
      chat: true,
    },
  });
};

export const createMessage = async (
  message: Omit<Message, "id" | "createdAt" | "updatedAt" | "isRead">,
): Promise<Message> => {
  return await prisma.message.create({
    data: { ...message },
  });
};

export const updateMessage = async (
  id: string,
  message: Partial<Omit<Message, "id" | "createdAt" | "updatedAt">>,
): Promise<Message | null> => {
  return await prisma.message.update({
    where: { id },
    data: { ...message },
  });
};

export const deleteMessage = async (senderId: string, id: string): Promise<Message> => {
  return await prisma.message.delete({
    where: { id, senderId },
  });
};

export const deleteAllMessages = async (
  userId: string,
  chatId: string,
): Promise<Prisma.BatchPayload> => {
  return await prisma.message.deleteMany({
    where: { senderId: userId, chatId: chatId },
  });
};

export type { Message };
