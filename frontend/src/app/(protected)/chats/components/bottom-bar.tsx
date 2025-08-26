import { FormEvent, useRef } from "react";
import styles from "@/styles/pages/chats.module.css";

const Bottombar = ({ sendMessage, disabled }: { sendMessage: (text: string) => void, disabled: boolean }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputRef.current || disabled) return;
    const text = inputRef.current.value.trim();
    if (text) sendMessage(text);
    inputRef.current.value = "";
  };

  return (
    <form className={styles.bottom_bar} onSubmit={handleSubmit}>
      <input type="text" placeholder="Enter your message here" ref={inputRef} />
      <button type="submit" disabled={disabled}>
        Send
      </button>
    </form>
  );
};

export default Bottombar;
