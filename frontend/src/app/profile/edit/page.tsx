"use client";

import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { updateUserProfile } from "@/lib/features/auth/authSlice";
import { UserT } from "@/types/user";
import styles from "@/styles/pages/edit-profile.module.css";

const Page = () => {
  const user: UserT | null = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    dispatch(updateUserProfile(form));
    router.push(`/profile/${user?.id}`);
  };

  if (!user) return;
  return (
    <section>
      <div className={styles.edit_profile_form_container}>
        <h1>Edit Profile</h1>
        <form onSubmit={handleFormSubmit} className={styles.edit_profile_form}>
          <div className={styles.edit_profile_form_left}>
            <input type="file" name="avatar" id="avatar" accept="image/*" />
            <label htmlFor="avatar">Avatar</label>
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
        </form>
      </div>
    </section>
  );
};

export default Page;
