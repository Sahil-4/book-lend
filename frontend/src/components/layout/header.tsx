"use client";

import Link from "next/link";
import { useCallback, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import Menu from "@/components/layout/menu";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getUser, issueAccessToken, logout } from "@/lib/features/auth/authSlice";
import { JWTDecoded, UserT } from "@/types/user";
import styles from "@/styles/components/layout/header.module.css";

const Header = () => {
  const authenticated = useAppSelector((state) => state.auth.authenticated);
  const user: UserT = useAppSelector((state) => state.auth.user);

  const dispatch = useAppDispatch();

  const navLinks = [
    { key: "101", name: "Home", href: "/" },
    { key: "102", name: "Browse Books", href: "/browse" },
    { key: "103", name: "Lend Book", href: "/add" },
  ];

  const verifyTokens = useCallback(async () => {
    if (!user) return;
    try {
      const accessToken: JWTDecoded = jwtDecode(user.accessToken || "");
      const refreshToken: JWTDecoded = jwtDecode(user.refreshToken || "");

      // if refresh token is expired log out user and return
      if (refreshToken.exp <= Date.now() / 1000) {
        throw new Error("refreshToken expired");
      }

      // if access token is expired request new access token
      if (accessToken.exp <= Date.now() / 1000) {
        console.log("issueAccessToken", accessToken.exp - Date.now() / 1000);
        dispatch(issueAccessToken());
        return;
      }
    } catch (error) {
      console.log(error);
      dispatch(logout());
    }
  }, [dispatch, user]);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  useEffect(() => {
    verifyTokens();
  }, [verifyTokens]);

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
