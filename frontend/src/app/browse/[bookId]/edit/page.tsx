"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getBookById, updateBook } from "@/lib/features/books/booksSlice";
import { BookT } from "@/types/book";
import styles from "@/styles/components/sections/add-book-form.module.css";

type FormPropsT = {
  book: BookT;
  setBook: Dispatch<SetStateAction<BookT | null>>;
};

const Form = (props: FormPropsT) => {
  const { book, setBook } = props;

  const router = useRouter();
  const dispatch = useAppDispatch();
  const [cover, setCover] = useState<string>(book.cover || "");

  const updateCoverURI = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) setCover(URL.createObjectURL(file));
  };

  const updateBookDetails = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    dispatch(updateBook({ book: form, id: book.id }));
    router.push("/browse");
  };

  return (
    <form onSubmit={handleFormSubmit} className={styles.add_book_form}>
      <div className={styles.add_book_form__left_area}>
        <input type="file" name="cover" id="cover" accept="image/*" onChange={updateCoverURI} />
        <label htmlFor="cover">
          {cover ? <Image src={cover} alt={cover} fill={true} /> : "Thumbnail"}
        </label>

        <select name="status" id="status" value={book.status} onChange={updateBookDetails}>
          <option value="Sell">Sell</option>
          <option value="Rent">Rent</option>
        </select>
        <input
          type="number"
          placeholder="Price in Rupees (INR)"
          name="price"
          min={1}
          value={book.price}
          onChange={updateBookDetails}
        />
      </div>

      <div className={styles.add_book_form__right_area}>
        <input
          type="text"
          placeholder="Book Title"
          name="title"
          onChange={updateBookDetails}
          value={book.title}
        />

        <textarea
          placeholder="Description"
          name="description"
          onChange={updateBookDetails}
          value={book.description}
        />

        <input
          type="text"
          placeholder="Author"
          name="author"
          onChange={updateBookDetails}
          value={book.author}
        />
        <input
          type="text"
          placeholder="Genre"
          name="genre"
          onChange={updateBookDetails}
          value={book.genre}
        />

        <input
          type="file"
          name="preview"
          id="preview"
          accept="application/pdf"
          onChange={updateBookDetails}
        />
        <label htmlFor="preview">Preview</label>
      </div>

      <div className={styles.add_book_form__buttons}>
        <button type="submit">Post</button>
      </div>
    </form>
  );
};

const Page = ({ params }: { params: Promise<{ bookId: string }> }) => {
  const [bookId, setBookId] = useState<string | null>(null);
  const [book, setBook] = useState<BookT | null>(null);

  const books: Map<string, BookT> = useAppSelector((state) => state.books.myBooksMap);

  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      setBookId((await params).bookId);
    })();
  }, [params]);

  useEffect(() => {
    if (!bookId) return;
    if (!books.get(bookId)) dispatch(getBookById(bookId));
    setBook(books.get(bookId) || null);
  }, [bookId, books, dispatch]);

  if (!book) return;
  return (
    <section>
      <Form book={book} setBook={setBook} />
    </section>
  );
};

export default Page;
