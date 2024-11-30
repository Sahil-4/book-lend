"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { BooksList } from "@/components/common";
import styles from "@/styles/pages/user-profile.module.css";

const UserProfile = ({ userId }: { userId: string | null }) => {
  const user = {
    id: userId,
    avatar: "/avatar.png",
    username: "@some_user123",
    name: "Some user",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget dolor id nulla luctus euismod. Nulla sit amet ipsum ac lorem mollis placerat. Nunc accumsan tortor sit amet vehicula consequat.",
  };

  return (
    <div className={styles.user_profile}>
      <div className={styles.user_profile__avatar_container}>
        <Image src={user.avatar} alt={user.username} fill={true} />
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

  useEffect(() => {
    (async () => {
      setUserId((await params).userId);
    })();
  }, [params]);

  return (
    <section>
      <UserProfile userId={userId} />
      <BooksList books={[]} slugName="Your books" />
    </section>
  );
};

export default Page;
