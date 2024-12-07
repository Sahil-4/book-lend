type NotificationT = {
  id: string;
  timestamp: Date;
  type: string;
  content: string;
  isRead: boolean;
  userId: string;
};

export type { NotificationT };
