import Image from "next/image";
import Link from "next/link";
import { ChatT } from "@/types/chat";
import styles from "@/styles/pages/chats.module.css";

const Chat = ({ chat }: { chat: ChatT }) => {
  return (
    <div className={styles.chats_list_item}>
      <div className={styles.avatar_container}>
        <Image alt={chat.participants[0]} src={"/avatar.png"} fill={true} />
      </div>
      <Link href={`/chats?id=${chat.id}`}>{chat.participants[0]}</Link>
      <p>{chat.messages[0]}</p>
    </div>
  );
};

const ChatsList = () => {
  const chats: ChatT[] = [
    { id: "id1", participants: ["Name2", "Name1"], messages: ["this was my last message"] },
    { id: "id2", participants: ["Name3", "Name1"], messages: ["this was my last message"] },
    { id: "id3", participants: ["Name4", "Name1"], messages: ["not again"] },
    { id: "id4", participants: ["Name5", "Name1"], messages: ["this was my last message"] },
    { id: "id5", participants: ["Name12", "Name1"], messages: ["this was my last message"] },
    { id: "id6", participants: ["Name18", "Name1"], messages: ["not again"] },
  ];

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
