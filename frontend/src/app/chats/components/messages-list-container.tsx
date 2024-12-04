import { useEffect, useMemo, useRef } from "react";
import { MessageT } from "@/types/message";
import styles from "@/styles/pages/chats.module.css";

const SentMessage = ({ message }: { message: MessageT }) => {
  return (
    <div className={styles.chat_bubble_container}>
      <div className={styles.chat_bubble_sent}>
        <p>{message.content}</p>
        <p>{message.createdAt}</p>
      </div>
    </div>
  );
};

const ReceivedMessage = ({ message }: { message: MessageT }) => {
  return (
    <div className={styles.chat_bubble_container}>
      <div className={styles.chat_bubble_received}>
        <p>{message.content}</p>
        <p>{message.createdAt}</p>
      </div>
    </div>
  );
};

const MessageBubble = ({ message }: { message: MessageT }) => {
  const me = "user_id_001";
  if (message.senderId == me) return <SentMessage message={message} />;
  return <ReceivedMessage message={message} />;
};

const MessageListContainer = ({ chatId }: { chatId: string }) => {
  console.log(chatId);
  const messages: MessageT[] = useMemo(
    () => [
      {
        id: "message_id_001",
        chatId: "chat_id_001",
        type: "text",
        content: "Hello",
        isRead: true,
        senderId: "user_id_001",
        receiverId: "user_id_002",
        createdAt: "16:12",
      },
      {
        id: "message_id_002",
        chatId: "chat_id_001",
        type: "text",
        content: "Hello",
        isRead: true,
        senderId: "user_id_002",
        receiverId: "user_id_001",
        createdAt: "16:12",
      },
    ],
    [],
  );

  const messageEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (!messageEndRef.current) return;
    messageEndRef.current.scroll({ top: messageEndRef.current.scrollHeight });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className={styles.message_list_container} ref={messageEndRef}>
      {messages.map((message) => (
        <MessageBubble key={message.id} message={message} />
      ))}
    </div>
  );
};

export default MessageListContainer;
