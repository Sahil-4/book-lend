"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { UserBooksList } from "@/components/common";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { AuthSliceState } from "@/lib/features/auth/authSlice";
import { UserT } from "@/types/user";
import styles from "@/styles/pages/user-profile.module.css";

const UserProfile = ({ user, flag }: { user: UserT | null; flag: boolean }) => {
  const defaultAvatar = "/avatar.png";

  if (!user) return;
  return (
    <div className={styles.user_profile}>
      <div>
        <div className={styles.user_profile__avatar_container}>
          <Image src={user.avatar ? user.avatar : defaultAvatar} alt={user.username} fill={true} />
        </div>
        {flag && <Link href={"/profile/edit"}>Edit</Link>}
      </div>

      <p>{user.name}</p>
      <p>{user.username}</p>
      <p>{user.bio}</p>
    </div>
  );
};

const Page = ({ params }: { params: Promise<{ userId: string }> }) => {
  const [userId, setUserId] = useState<string | null>(null);
  const [user, setUser] = useState<UserT | null>(null);

  const authState: AuthSliceState = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      setUserId((await params).userId);
    })();
  }, [params]);

  useEffect(() => {
    if (authState.user && authState.user?.id == userId) {
      setUser(authState.user);
    }
  }, [authState.user, dispatch, userId]);

  if (!user) return <div>Loading...</div>;
  return (
    <section>
      <UserProfile user={user} flag={authState.user?.id === userId} />
      <UserBooksList userId={user.id} />
    </section>
  );
};

export default Page;
