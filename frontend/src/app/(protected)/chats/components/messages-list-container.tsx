import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-smart";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getChatMessages } from "@/lib/features/chats/chatsSlice";
import { formatTime } from "@/utils/formatters";
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
  const mine = message.senderId === user?.id;

  if (mine) return <SentMessage message={message} />;
  return <ReceivedMessage message={message} />;
};

const MessageListContainer = ({ chatId }: { chatId: ChatT["id"] }) => {
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const messageIds: string[] = useAppSelector(
    (state) => state.chats.messageIdByChatId[chatId] || [],
  );
  const dispatch = useAppDispatch();

  const loadMore = async () => {
    if (!hasMore) return;
    const data = await dispatch(getChatMessages({ chatId, page })).unwrap();
    setPage(() => (data?.meta?.currentPage as number) + 1);
    setHasMore(() => !!(data?.meta?.hasMore || false));
  };

  return (
    <InfiniteScroll className={styles.message_list_container} callback={loadMore} direction="top">
      {messageIds.map((messageId) => (
        <MessageBubble key={messageId} messageId={messageId} />
      ))}
    </InfiniteScroll>
  );
};

export default MessageListContainer;
