"use client";

import { useRouter } from "next/navigation";
import Toolbar from "@/app/chats/components/tool-bar";
import Bottombar from "@/app/chats/components/bottom-bar";
import MessageListContainer from "@/app/chats/components/messages-list-container";
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

  const recipient = chat.participants.find((p) => p.id !== user.id)!;

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
      <MessageListContainer chat={chat} />
      <Bottombar sendMessage={sendMessage} />
    </div>
  );
};

export default MessageContainer;
