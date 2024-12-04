"use client";

import { useEffect, useState } from "react";
import ChatsList from "@/app/chats/components/sidebar";
import MessageContainer from "@/app/chats/components/message-container";
import styles from "@/styles/pages/chats.module.css";
import { useRouter, useSearchParams } from "next/navigation";

const Page = () => {
  const [isMobileView, setIsMobileView] = useState<boolean>(false);
  const [view, setView] = useState<"chatsList" | "messageContainer">("chatsList");

  const searchParams = useSearchParams();
  const [chatId, setChatId] = useState<string | null>(null);

  useEffect(() => {
    if (searchParams.get("id")) setView("messageContainer");
    setChatId(searchParams.get("id"));
  }, [searchParams]);

  const router = useRouter();

  const closeChat = () => {
    setView("chatsList");
    router.replace(`/chats/`);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className={styles.chat_section}>
      {!isMobileView ? (
        <>
          <ChatsList />
          <MessageContainer chatId={chatId} closeChat={closeChat} />
        </>
      ) : (
        <>
          {view === "chatsList" ? (
            <ChatsList />
          ) : (
            <MessageContainer chatId={chatId} closeChat={closeChat} />
          )}
        </>
      )}
    </section>
  );
};

export default Page;
