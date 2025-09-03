"use client";

import { useRouter } from "next/navigation";
import Toolbar from "@/app/(protected)/chats/components/tool-bar";
import Bottombar from "@/app/(protected)/chats/components/bottom-bar";
import MessageListContainer from "@/app/(protected)/chats/components/messages-list-container";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addChatMessage } from "@/lib/features/chats/chatsSlice";
import { ChatT } from "@/types/chat";
import { UserT } from "@/types/user";
import { MessageCreate } from "@/types/message";
import styles from "@/styles/pages/chats.module.css";

type propsT = {
  chatId: string;
};

const MessageContainer = ({ chatId }: propsT) => {
  const user: UserT = useAppSelector((state) => state.auth.user);
  const chat: ChatT = useAppSelector((state) => state.chats.chatsById[chatId]);

  const dispatch = useAppDispatch();
  const router = useRouter();

  if (!chat) return <div className={styles.messages_container} />;

  const recipient: Pick<UserT, "name" | "id" | "username" | "avatar" | "bio"> =
    chat.participants.find((p) => p.id !== user.id) || {
      id: "",
      name: "Deleted User",
      username: "Deleted User",
      avatar: null,
      bio: "",
    };

  const sendMessage = (text: string) => {
    const message: MessageCreate = {
      chatId: chat.id,
      type: "text",
      content: text,
      senderId: user.id,
      receiverId: recipient.id,
    };
    dispatch(addChatMessage({ id: message.chatId, message }));
  };

  const closeChat = () => {
    router.replace(`/chats`);
  };

  return (
    <div className={styles.messages_container}>
      <Toolbar closeChat={closeChat} recipient={recipient} />
      <MessageListContainer chatId={chat.id} />
      <Bottombar sendMessage={sendMessage} disabled={recipient.id !== ""} />
    </div>
  );
};

export default MessageContainer;
