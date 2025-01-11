import { MessageT } from "@/types/message";
import { UserT } from "@/types/user";

type ChatT = {
  id: string;
  participants: Pick<UserT, "id" | "username" | "name" | "avatar" | "bio">[];
  messages: MessageT[];
  createdAt: Date;
  updatedAt: Date;
};

export type { ChatT };
