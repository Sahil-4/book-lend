"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch } from "@/lib/hooks";
import { createBook } from "@/lib/features/books/booksSlice";
import styles from "@/styles/components/sections/add-book-form.module.css";

const Form = () => {
  const [cover, setCover] = useState<string>("");
  const dispatch = useAppDispatch();
  const router = useRouter();

  const validateFormData = (form: FormData): boolean => {
    for (const [, v] of form.entries()) {
      if (v === "") return false;
      if (v instanceof File && v.name === "") return false;
    }
    return true;
  };

  const updateCoverURI = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) setCover(URL.createObjectURL(file));
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    if (!validateFormData(form)) return alert("All feilds are required");
    dispatch(createBook(form));
    router.push("/browse");
  };

  return (
    <form onSubmit={handleFormSubmit} className={styles.add_book_form}>
      <div className={styles.add_book_form__left_area}>
        <input type="file" name="cover" id="cover" accept="image/*" onChange={updateCoverURI} />
        <label htmlFor="cover">
          {cover ? <Image src={cover} alt={cover} fill={true} /> : "Thumbnail"}
        </label>

        <select name="status" id="status">
          <option value="Sell">Sell</option>
          <option value="Rent">Rent</option>
        </select>
        <input type="number" placeholder="Price in Rupees (INR)" name="price" min={1} />
      </div>

      <div className={styles.add_book_form__right_area}>
        <input type="text" placeholder="Book Title" name="title" />

        <textarea placeholder="Description" name="description" />

        <input type="text" placeholder="Author" name="author" />
        <input type="text" placeholder="Genre" name="genre" />

        <input type="file" name="preview" id="preview" accept="application/pdf" />
        <label htmlFor="preview">Preview</label>
      </div>

      <div className={styles.add_book_form__buttons}>
        <button type="submit">Post</button>
        <button type="reset">Clear</button>
      </div>
    </form>
  );
};

const Page = () => {
  return (
    <section>
      <Form />
    </section>
  );
};

export default Page;
