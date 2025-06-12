import { useRef } from "react";
import styles from "@/styles/pages/chats.module.css";

const Bottombar = ({ sendMessage }: { sendMessage: (text: string) => void }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleClick = () => {
    if (!inputRef.current) return;
    const text = inputRef.current.value.trim();
    if (text) sendMessage(text);
    inputRef.current.value = "";
  };

  return (
    <div className={styles.bottom_bar}>
      <input type="text" placeholder="Enter your message here" ref={inputRef} />
      <button onClick={handleClick}>Send</button>
    </div>
  );
};

export default Bottombar;
