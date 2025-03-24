"use client";

import { useEffect, useState } from "react";
import ChatsList from "@/app/chats/components/sidebar";
import MessageContainer from "@/app/chats/components/message-container";
import styles from "@/styles/pages/chats.module.css";

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const [_id, setId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setId((await params).id);
    })();
  }, [params]);

  return (
    <section className={`${styles.chat_section} ${styles.chat_section_message_container}`}>
      <ChatsList />
      <MessageContainer _id={_id} />
    </section>
  );
};

export default Page;
