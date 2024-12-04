import { useRef } from "react";
import styles from "@/styles/pages/chats.module.css";

const Bottombar = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const sendMessage = () => {
    if (!inputRef.current) return;
    console.log(inputRef.current.value);
  };

  return (
    <div className={styles.bottom_bar}>
      <input type="text" placeholder="Enter your message here" ref={inputRef} />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Bottombar;
