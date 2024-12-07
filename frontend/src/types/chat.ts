import { MessageT } from "@/types/message";
import { UserT } from "@/types/user";

type ChatT = {
  id: string;
  participants: Pick<UserT, "id" | "name" | "username" | "bio">[];
  messages: MessageT[];
  createdAt: Date;
  updatedAt: Date;
};

export type { ChatT };
