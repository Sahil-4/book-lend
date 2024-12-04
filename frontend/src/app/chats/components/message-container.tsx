"use client";

import Toolbar from "@/app/chats/components/tool-bar";
import Bottombar from "@/app/chats/components/bottom-bar";
import MessageListContainer from "@/app/chats/components/messages-list-container";
import styles from "@/styles/pages/chats.module.css";

type propsT = {
  chatId: string | null;
  closeChat: () => void;
};

const MessageContainer = ({ chatId, closeChat }: propsT) => {
  if (!chatId) return <div className={styles.messages_container}></div>;
  return (
    <div className={styles.messages_container}>
      <Toolbar closeChat={closeChat} />
      <MessageListContainer chatId={chatId} />
      <Bottombar />
    </div>
  );
};

export default MessageContainer;
