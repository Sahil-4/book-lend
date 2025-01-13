"use client";

import Toolbar from "@/app/chats/components/tool-bar";
import Bottombar from "@/app/chats/components/bottom-bar";
import MessageListContainer from "@/app/chats/components/messages-list-container";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addChatMessage, getChatById } from "@/lib/features/chats/chatsSlice";
import { UserT } from "@/types/user";
import { MessageCreate } from "@/types/message";
import styles from "@/styles/pages/chats.module.css";

type propsT = {
  chatId: string | null;
  closeChat: () => void;
};

const MessageContainer = ({ chatId, closeChat }: propsT) => {
  const user: UserT = useAppSelector((state) => state.auth.user);
  const chat = useAppSelector((state) => getChatById(state.chats, chatId!));

  const dispatch = useAppDispatch();

  if (!chat) return <div className={styles.messages_container}></div>;

  const recipient =
    chat.participants[0].id !== user.id ? chat.participants[0] : chat.participants[1];

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

  return (
    <div className={styles.messages_container}>
      <Toolbar closeChat={closeChat} recipient={recipient} />
      <MessageListContainer chat={chat} />
      <Bottombar sendMessage={sendMessage} />
    </div>
  );
};

export default MessageContainer;
