import { prisma } from "../prisma/index.js";

interface Notification {
  id: string;
  timestamp: Date;
  type: string;
  content: string;
  isRead: boolean;
  userId: string;
}

export const getAllNotifications = async (userId: string): Promise<Notification[]> => {
  return await prisma.notification.findMany({
    where: { userId },
  });
};

export const createNotification = async (
  notification: Omit<Notification, "id" | "timestamp" | "isRead">,
): Promise<Notification> => {
  return await prisma.notification.create({
    data: { ...notification },
  });
};

export const markReadNotification = async (userId: string) => {
  await prisma.notification.updateMany({
    where: { userId },
    data: { isRead: true },
  });
};

export const deleteNotification = async (userId: string, id: string): Promise<Notification> => {
  return await prisma.notification.delete({
    where: { userId, id, isRead: true },
  });
};

export type { Notification };
