"use client";

import { createChat, findChatByUserIds } from "@/lib/features/chats/chatsSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { ChatT } from "@/types/chat";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = ({ params }: { params: Promise<{ id: string }> }) => {
  const [resolvedId, setResolvedId] = useState<string>("");
  const userIdSelf = useAppSelector((state) => state.auth.user?.id) || "";
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    (async () => {
      setResolvedId((await params).id);
    })();
  }, [params]);

  const chat = useAppSelector((state) => findChatByUserIds(state.chats, userIdSelf, resolvedId));

  useEffect(() => {
    if (!resolvedId || !userIdSelf) return;

    if (chat?.id) {
      router.push(`/chats/${chat.id}`);
    } else {
      dispatch(createChat({ participant1: userIdSelf, participant2: resolvedId }))
        .unwrap()
        .then((res) => {
          router.push(`/chats/${(res?.data as ChatT).id}`);
        });
    }
  }, [chat, dispatch, router, resolvedId, userIdSelf]);

  return <div />;
};

export default Page;
