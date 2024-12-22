"use client";

import Link from "next/link";
import { useAppSelector } from "@/lib/hooks";
import { UserT } from "@/types/user";
import styles from "@/styles/components/layout/header.module.css";

const ProfilePreview = () => {
  const user: UserT = useAppSelector((state) => state.auth.user);

  return (
    <div className={styles.header__menu__profile_preview}>
      <span className={styles.profile__avatar}>{user.name.charAt(0)}</span>
      <span>{user.username}</span>
      <span>
        <Link href={`/profile/${user.id}`}>Your profile</Link>
      </span>
    </div>
  );
};

export default ProfilePreview;
