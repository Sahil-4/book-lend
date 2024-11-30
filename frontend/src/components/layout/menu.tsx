"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
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

  const menuRef = useRef<HTMLDivElement | null>(null);
  const [menuOpenState, setMenuOpenState] = useState<boolean>(false);

  const closeMenu = () => {
    setMenuOpenState(false);
  };

  const openMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setMenuOpenState(true);
  };

  useEffect(() => {
    if (menuOpenState) {
      window.addEventListener("click", closeMenu);
    } else {
      window.removeEventListener("click", closeMenu);
    }

    return () => window.removeEventListener("click", closeMenu);
  }, [menuOpenState]);

  return (
    <>
      {authenticated ? (
        <button className={styles.header__profilePreview} onClick={openMenu}>
          A
        </button>
      ) : (
        <button className={styles.header__menu_open_btn} onClick={openMenu}>
          Open menu
        </button>
      )}
      <div className={`${styles.header__menu} ${!menuOpenState ? "_hidden_" : ""}`} ref={menuRef}>
        {authenticated && <ProfilePreview />}

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
          {authenticated && menuLinks.map((link) => {
            return (
              <li key={link.key}>
                <Link href={link.href}>{link.name}</Link>
              </li>
            );
          })}
        </ul>

        {authenticated ? (
          <button className={styles.header__menu__logout_btn}>Log out</button>
        ) : (
          <Link href="/auth">Login</Link>
        )}
      </div>
    </>
  );
};

export default Menu;