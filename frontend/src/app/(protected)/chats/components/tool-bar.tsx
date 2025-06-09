import Image from "next/image";
import { DeleteIcon, CloseIcon } from "@/components/common/icons";
import { UserT } from "@/types/user";
import styles from "@/styles/pages/chats.module.css";

type propsT = {
  closeChat: () => void;
  recipient: Pick<UserT, "name" | "id" | "username" | "avatar" | "bio">;
};

const Toolbar = ({ closeChat, recipient }: propsT) => {
  const options = [
    {
      id: "option_10011",
      name: "Delete chat",
      Icon: DeleteIcon,
      action: () => {
        console.log("delete chat");
      },
    },
    {
      id: "option_10010",
      name: "Close chat",
      Icon: CloseIcon,
      action: closeChat,
    },
  ];

  return (
    <div className={styles.toolbar}>
      <div className={styles.toolbar__avatar_container}>
        <Image fill={true} alt="profile" src={recipient.avatar || "/avatar.png"} />
      </div>
      <span>{recipient.name}</span>
      {options.map(({ id, name, Icon, action }) => {
        return <Icon key={id} title={name} onClick={action} />;
      })}
    </div>
  );
};

export default Toolbar;
