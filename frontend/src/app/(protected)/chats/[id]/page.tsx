"use client";

import { useEffect, useState } from "react";
import ChatsList from "@/app/(protected)/chats/components/sidebar";
import MessageContainer from "@/app/(protected)/chats/components/message-container";
import styles from "@/styles/pages/chats.module.css";

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const [chatId, setChatId] = useState<string>("");

  useEffect(() => {
    (async () => {
      setChatId((await params).id);
    })();
  }, [params]);

  return (
    <section className={`${styles.chat_section} ${styles.chat_section_message_container}`}>
      <ChatsList />
      <MessageContainer chatId={chatId} />
    </section>
  );
};

export default Page;
