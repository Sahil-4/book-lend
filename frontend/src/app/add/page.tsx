"use client";

import { FormEvent } from "react";
import styles from "@/styles/components/sections/add-book-form.module.css";

const Form = () => {
  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.target);
  };

  return (
    <form onSubmit={handleFormSubmit} className={styles.add_book_form}>
      <div className={styles.add_book_form__left_area}>
        <input type="file" name="cover" id="cover" />
        <label htmlFor="cover">Thumbnail</label>

        <select name="sell_or_rent" id="sell_or_rent">
          <option value="default">Sell or rent ?</option>
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

        <input type="file" name="preview" id="preview" />
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
