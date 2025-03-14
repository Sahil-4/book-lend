"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import ChatsList from "@/app/chats/components/sidebar";
import MessageContainer from "@/app/chats/components/message-container";
import { createChat, findChatByUserIds } from "@/lib/features/chats/chatsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { UserT } from "@/types/user";
import styles from "@/styles/pages/chats.module.css";

const Page = () => {
  const [isMobileView, setIsMobileView] = useState<boolean>(false);
  const [view, setView] = useState<"chatsList" | "messageContainer">("chatsList");

  const handleResize = () => {
    setIsMobileView(window.innerWidth <= 768);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [userId, setUserId] = useState<string | null>(null);
  const [chatId, setChatId] = useState<string | null>(null);

  const user: UserT = useAppSelector((state) => state.auth.user);
  const chat = useAppSelector((state) => findChatByUserIds(state.chats, user.id, userId!));

  useEffect(() => {
    if (searchParams.get("cid")) {
      setChatId(searchParams.get("cid"));
      setView("messageContainer");
    }
    if (searchParams.get("uid")) {
      setUserId(searchParams.get("uid"));
    }
  }, [searchParams, setView]);

  useEffect(() => {
    if (chatId) return;

    if (chat) setChatId(chat.id);
    if (chatId) return;

    if (!userId) return;

    dispatch(createChat({ participant1: user.id, participant2: userId }));
  }, [chat, chatId, dispatch, user.id, userId]);

  useEffect(() => {
    if (!chatId) return;
    router.push(`/chats?cid=${chatId}`);
  }, [chatId, router]);

  const closeChat = () => {
    router.replace(`/chats`);
    setUserId(null);
    setChatId(null);
    setView("chatsList");
  };

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

const Wrapper = () => {
  return (
    <Suspense>
      <Page />
    </Suspense>
  );
};

export default Wrapper;
