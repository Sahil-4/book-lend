import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getAllChats } from "@/lib/features/chats/chatsSlice";
import { UserT } from "@/types/user";
import { ChatT } from "@/types/chat";
import styles from "@/styles/pages/chats.module.css";

const Chat = ({ chat }: { chat: ChatT }) => {
  const user: UserT = useAppSelector((state) => state.auth.user);
  const participant =
    chat.participants[0].id !== user.id ? chat.participants[0] : chat.participants[1];

  return (
    <div className={styles.chats_list_item}>
      <div className={styles.avatar_container}>
        <Image alt={participant.username} src={participant.avatar || "/avatar.png"} fill={true} />
      </div>
      <Link href={`/chats?cid=${chat.id}`}>{participant.name}</Link>
      <p>{chat.messages && chat.messages[0]?.content}</p>
    </div>
  );
};

const ChatsList = () => {
  const chats: ChatT[] = useAppSelector((state) => state.chats.chats);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllChats());
  }, [dispatch]);

  return (
    <div className={styles.chats_list_container}>
      <p>Chats</p>
      <ul className={styles.chats_list}>
        {chats.map((chat) => (
          <Chat key={chat.id} chat={chat} />
        ))}
      </ul>
    </div>
  );
};

export default ChatsList;
