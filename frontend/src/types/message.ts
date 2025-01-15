type MessageT = {
  id: string;
  type: string;
  content: string;
  isRead: boolean;
  senderId: string;
  receiverId: string;
  chatId: string;
  createdAt: string;
  updatedAt: string;
};

type MessageCreate = Omit<MessageT, "id" | "isRead" | "createdAt" | "updatedAt">;

export type { MessageT, MessageCreate };
