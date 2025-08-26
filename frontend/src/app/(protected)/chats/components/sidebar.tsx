import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getAllChats } from "@/lib/features/chats/chatsSlice";
import { UserT } from "@/types/user";
import { ChatT } from "@/types/chat";
import styles from "@/styles/pages/chats.module.css";

const Chat = ({ chatId }: { chatId: string }) => {
  const user: UserT = useAppSelector((state) => state.auth.user);
  const chat: ChatT = useAppSelector((state) => state.chats.chatsById[chatId]);
  const recipient: Pick<UserT, "username" | "name" | "avatar"> = chat.participants.find(
    (p) => p.id !== user.id,
  ) || {
    username: "Deleted User",
    name: "Deleted User",
    avatar: null,
  };

  return (
    <div className={styles.chats_list_item}>
      <div className={styles.avatar_container}>
        <Image alt={recipient.username} src={recipient.avatar || "/avatar.png"} fill={true} />
      </div>
      <Link href={`/chats/c/${chat.id}`}>{recipient.name}</Link>
      <p>{chat.messages && chat.messages[0]?.content}</p>
    </div>
  );
};

const ChatsList = () => {
  const chatIds: string[] = useAppSelector((state) => state.chats.chatIds);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllChats());
  }, [dispatch]);

  return (
    <div className={styles.chats_list_container}>
      <p>Chats</p>
      <ul className={styles.chats_list}>
        {chatIds.map((chatId) => (
          <Chat key={chatId} chatId={chatId} />
        ))}
      </ul>
    </div>
  );
};

export default ChatsList;
