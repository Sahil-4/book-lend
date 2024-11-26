"use client";

import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import styles from "@/styles/pages/auth.module.css";

const SignupForm = ({
  setMode,
}: {
  setMode: Dispatch<SetStateAction<"login" | "signup" | "verify">>;
}) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create account</h3>
      <input type="text" name="username" placeholder="Username" />
      <input type="text" name="name" placeholder="Name" />
      <input type="text" name="phone" placeholder="Phone" />
      <input type="text" name="password" placeholder="Password" />

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
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Welcome back</h3>
      <input type="text" placeholder="Username or phone" name="user" />
      <input type="password" placeholder="Password" name="password" />

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
