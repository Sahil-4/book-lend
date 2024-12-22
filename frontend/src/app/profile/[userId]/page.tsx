"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { BooksList } from "@/components/common";
import { useAppSelector } from "@/lib/hooks";
import { AuthSliceState } from "@/lib/features/auth/authSlice";
import { UserT } from "@/types/user";
import styles from "@/styles/pages/user-profile.module.css";

const UserProfile = ({ user }: { user: UserT | null }) => {
  const defaultAvatar = "/avatar.png";

  if (!user) return;
  return (
    <div className={styles.user_profile}>
      <div className={styles.user_profile__avatar_container}>
        <Image src={user.avatar ? user.avatar : defaultAvatar} alt={user.username} fill={true} />
      </div>

      <p>{user.name}</p>
      <p>{user.username}</p>
      <p>{user.bio}</p>
      {/* <div className={styles.user_profile__details}></div> */}
    </div>
  );
};

const Page = ({ params }: { params: Promise<{ userId: string }> }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [user, setUser] = useState<UserT | null>(null);

  const authState: AuthSliceState = useAppSelector((state) => state.auth);

  useEffect(() => {
    (async () => {
      setUserId((await params).userId);
    })();
  }, [params]);

  useEffect(() => {
    // !TODO - use `userId` to update user and show profile
    if (authState.user?.id == userId) setUser(authState.user);
  }, [authState.user, userId]);

  return (
    <section>
      <UserProfile user={user} />
      <BooksList books={[]} slugName="Your books" />
    </section>
  );
};

export default Page;
