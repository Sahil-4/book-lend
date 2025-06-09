"use client";

import { useRouter } from "next/navigation";
import { Dispatch, FormEvent, SetStateAction, useRef, useState } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { login, signup } from "@/lib/features/auth/authSlice";
import styles from "@/styles/pages/auth.module.css";

const SignupForm = ({
  setMode,
}: {
  setMode: Dispatch<SetStateAction<"login" | "signup" | "verify">>;
}) => {
  const username_input_ref = useRef<HTMLInputElement | null>(null);
  const name_input_ref = useRef<HTMLInputElement | null>(null);
  const phone_input_ref = useRef<HTMLInputElement | null>(null);
  const password_input_ref = useRef<HTMLInputElement | null>(null);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = name_input_ref.current?.value;
    const phone = phone_input_ref.current?.value;
    const username = username_input_ref.current?.value;
    const password = password_input_ref.current?.value;

    if (!name || !phone || !username || !password) return;

    dispatch(signup({ name, phone, username, password, bio: "" }))
      .unwrap()
      .then((resp) => {
        if (resp?.success) {
          router.push("/");
        }
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create account</h3>
      <input
        type="text"
        name="username"
        placeholder="Username"
        required={true}
        ref={username_input_ref}
      />
      <input type="text" name="name" placeholder="Name" required={true} ref={name_input_ref} />
      <input type="text" name="phone" placeholder="Phone" required={true} ref={phone_input_ref} />
      <input
        type="text"
        name="password"
        placeholder="Password"
        required={true}
        ref={password_input_ref}
      />

      <button>Sign up</button>
      <p>
        Already have an account <button onClick={() => setMode("login")}>Login here</button>
      </p>
    </form>
  );
};

const LoginForm = ({
  setMode,
}: {
  setMode: Dispatch<SetStateAction<"login" | "signup" | "verify">>;
}) => {
  const username_input_ref = useRef<HTMLInputElement | null>(null);
  const password_input_ref = useRef<HTMLInputElement | null>(null);

  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const phone = username_input_ref.current?.value;
    const username = username_input_ref.current?.value;
    const password = password_input_ref.current?.value;

    if (!phone || !username || !password) return;

    dispatch(login({ phone, username, password }))
      .unwrap()
      .then((resp) => {
        if (resp?.success) {
          router.push("/");
        }
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Welcome back</h3>
      <input
        type="text"
        placeholder="Username or phone"
        name="user"
        required={true}
        ref={username_input_ref}
      />
      <input
        type="password"
        placeholder="Password"
        name="password"
        required={true}
        ref={password_input_ref}
      />

      <button>Login</button>
      <p>
        Dont have an account <button onClick={() => setMode("signup")}>sign up here</button>
      </p>
    </form>
  );
};

const Form = () => {
  const [mode, setMode] = useState<"login" | "signup" | "verify">("login");

  return (
    <div className={styles.form_container}>
      {mode === "signup" && <SignupForm setMode={setMode} />}
      {mode === "login" && <LoginForm setMode={setMode} />}
    </div>
  );
};

const page = () => {
  return (
    <section>
      <Form />
    </section>
  );
};

export default page;
