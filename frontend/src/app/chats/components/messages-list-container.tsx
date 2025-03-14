import { useCallback, useEffect, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getChatMessages } from "@/lib/features/chats/chatsSlice";
import { ChatT } from "@/types/chat";
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

const MessageBubble = ({ message, mine }: { message: MessageT; mine: boolean }) => {
  if (mine) return <SentMessage message={message} />;
  return <ReceivedMessage message={message} />;
};

const MessageListContainer = ({ chat }: { chat: ChatT }) => {
  const user = useAppSelector((state) => state.auth.user);
  const messages: MessageT[] = useAppSelector((state) => state.chats.chatsMessages.get(chat.id));
  const dispatch = useAppDispatch();

  const messageEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (!messageEndRef.current) return;
    messageEndRef.current.scroll({ top: messageEndRef.current.scrollHeight });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom, messages]);

  useEffect(() => {
    if (messages) return;
    dispatch(getChatMessages({ chatId: chat.id }));
  }, [chat.id, dispatch, messages]);

  return (
    <div className={styles.message_list_container} ref={messageEndRef}>
      {messages?.map((message) => (
        <MessageBubble key={message.id} message={message} mine={user.id === message.senderId} />
      ))}
    </div>
  );
};

export default MessageListContainer;
