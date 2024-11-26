"use client";

import Link from "next/link";
import { useState } from "react";
import ProfilePreview from "@/components/layout/profilepreview";
import styles from "@/styles/components/layout/header.module.css";

type propsTypes = {
  authenticated: boolean;
};

const Menu = (props: propsTypes) => {
  const { authenticated } = props;

  const navLinks = [
    { key: "101", name: "Home", href: "/" },
    { key: "102", name: "Browse Books", href: "/browse" },
    { key: "103", name: "List Book", href: "/add" },
  ];
  const menuLinks = [
    { key: "301", name: "Your books", href: "/browse" },
    { key: "302", name: "Chats", href: "/chats" },
    { key: "303", name: "Help", href: "/help" },
    { key: "304", name: "Feedback", href: "/feedback" },
  ];

  const [menuOpenState, setMenuOpenState] = useState<boolean>(false);

  return (
    <>
      {authenticated && (
        <button className={styles.header__profilePreview} onClick={() => setMenuOpenState(true)}>
          A
        </button>
      )}
      <div className={`${styles.header__menu} ${!menuOpenState ? "_hidden_" : ""}`}>
        <ProfilePreview />

        {/* for mobile view only */}
        <ul className={styles.header__menu__nav_links}>
          {navLinks.map((link) => {
            return (
              <li key={link.key}>
                <Link href={link.href}>{link.name}</Link>
              </li>
            );
          })}
        </ul>

        <ul className={styles.header__menu__links}>
          {menuLinks.map((link) => {
            return (
              <li key={link.key}>
                <Link href={link.href}>{link.name}</Link>
              </li>
            );
          })}
        </ul>

        <button className={styles.header__menu__logout_btn}>Log out</button>
      </div>
    </>
  );
};

export default Menu;
