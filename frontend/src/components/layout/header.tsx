"use client";

import Link from "next/link";
import Menu from "@/components/layout/menu";
import { useAppSelector } from "@/lib/hooks";
import styles from "@/styles/components/layout/header.module.css";

const Header = () => {
  const authenticated = useAppSelector((state) => state.auth.authenticated);

  const navLinks = [
    { key: "101", name: "Home", href: "/" },
    { key: "102", name: "Browse Books", href: "/browse" },
    { key: "103", name: "Lend Book", href: "/add" },
  ];

  return (
    <header className={styles.header}>
      <span className={styles.header__logo}>
        <Link href="/">Book lend</Link>
      </span>

      <nav className={styles.header__nav}>
        <ul>
          {navLinks.map((val) => {
            return (
              <li key={val.key}>
                <Link href={val.href}>{val.name}</Link>
              </li>
            );
          })}
          {!authenticated && (
            <li>
              <Link href="/auth">Login</Link>
            </li>
          )}
        </ul>
        <Menu />
      </nav>
    </header>
  );
};

export default Header;
