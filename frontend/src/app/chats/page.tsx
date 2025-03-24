"use client";

import ChatsList from "@/app/chats/components/sidebar";
import styles from "@/styles/pages/chats.module.css";

const Page = () => {
  return (
    <section className={`${styles.chat_section} ${styles.chat_section_sidebar}`}>
      <ChatsList />
      <div className={styles.messages_container} />
    </section>
  );
};

export default Page;
