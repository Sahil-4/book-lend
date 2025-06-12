import { useCallback, useEffect, useRef, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getChatMessages } from "@/lib/features/chats/chatsSlice";
import { formatTime } from "@/utils/formatters";
import { List } from "@/components/sections";
import { ChatT } from "@/types/chat";
import { MessageT } from "@/types/message";
import styles from "@/styles/pages/chats.module.css";

const SentMessage = ({ message }: { message: MessageT }) => {
  return (
    <div className={styles.chat_bubble_container}>
      <div className={styles.chat_bubble_sent}>
        <p>{message.content}</p>
        <p>{formatTime(message.createdAt)}</p>
      </div>
    </div>
  );
};

const ReceivedMessage = ({ message }: { message: MessageT }) => {
  return (
    <div className={styles.chat_bubble_container}>
      <div className={styles.chat_bubble_received}>
        <p>{message.content}</p>
        <p>{formatTime(message.createdAt)}</p>
      </div>
    </div>
  );
};

const MessageBubble = ({ messageId }: { messageId: string }) => {
  const user = useAppSelector((state) => state.auth.user);
  const message: MessageT = useAppSelector((state) => state.chats.messagesById[messageId]);
  const mine = message.senderId === user.id;

  if (mine) return <SentMessage message={message} />;
  return <ReceivedMessage message={message} />;
};

const MessageListContainer = ({ chat }: { chat: ChatT }) => {
  const [page, setPage] = useState<number>(1);

  const messageIds: string[] = useAppSelector(
    (state) => state.chats.messageIdByChatId[chat.id] || [],
  );
  const dispatch = useAppDispatch();

  const messageEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (!messageEndRef.current) return;
    messageEndRef.current.scroll({ top: messageEndRef.current.scrollHeight });
  }, []);

  const loadMore = () => {
    setPage((page) => page + 1);
    dispatch(getChatMessages({ chatId: chat.id, page }));
  };

  useEffect(() => {
    // !TODO - have to fix this,
    // need another way to prevent scroll to bottom if user is currently scrolling
    if (messageIds.length > 30) return;
    scrollToBottom();
  }, [scrollToBottom, messageIds]);

  useEffect(() => {
    if (messageIds.length) return;
    dispatch(getChatMessages({ chatId: chat.id }));
  }, [chat.id, dispatch, messageIds.length]);

  return (
    <div className={styles.message_list_container} ref={messageEndRef}>
      <List className={styles.message_list_messages} callback={loadMore}>
        {messageIds.map((messageId) => (
          <MessageBubble key={messageId} messageId={messageId} />
        ))}
      </List>
    </div>
  );
};

export default MessageListContainer;
