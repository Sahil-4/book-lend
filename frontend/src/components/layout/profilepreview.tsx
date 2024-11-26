import Link from "next/link";
import styles from "@/styles/components/layout/header.module.css";

const ProfilePreview = () => {
  const user = {
    avatar: "A",
    username: "Alpha",
    profile: "/profile/id",
  };

  return (
    <div className={styles.header__menu__profile_preview}>
      <span className={styles.profile__avatar}>{user.avatar}</span>
      <span>{user.username}</span>
      <span>
        <Link href={user.profile}>Your profile</Link>
      </span>
    </div>
  );
};

export default ProfilePreview;
