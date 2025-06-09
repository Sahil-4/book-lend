"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { updateUserProfile } from "@/lib/features/auth/authSlice";
import { UserT } from "@/types/user";
import styles from "@/styles/pages/edit-profile.module.css";

const Page = () => {
  const [avatar, setAvatar] = useState<string>("");
  const user: UserT | null = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const updateAvatarURI = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) setAvatar(URL.createObjectURL(file));
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    dispatch(updateUserProfile(form));
    router.push(`/profile/${user?.id}`);
  };

  const goBack = () => {
    router.back();
  };

  if (!user) return;
  return (
    <section>
      <div className={styles.edit_profile_form_container}>
        <h1>Edit Profile</h1>
        <form onSubmit={handleFormSubmit} className={styles.edit_profile_form}>
          <div className={styles.edit_profile_form_left}>
            <input
              type="file"
              name="avatar"
              id="avatar"
              accept="image/*"
              onChange={updateAvatarURI}
            />
            <label htmlFor="avatar">
              {avatar ? <Image src={avatar} alt={avatar} fill={true} /> : "Avatar"}
            </label>
          </div>

          <div className={styles.edit_profile_form_right}>
            <input type="text" name="username" disabled={true} value={user.username} />
            <input type="text" placeholder="name" name="name" />
            <input
              type="number"
              placeholder="phone "
              name="phone"
              disabled={true}
              value={user.phone}
            />
            <textarea placeholder="bio" name="bio" />
          </div>

          <button type="submit">Update profile</button>
          <button type="button" onClick={goBack}>Cancel</button>
        </form>
      </div>
    </section>
  );
};

export default Page;
