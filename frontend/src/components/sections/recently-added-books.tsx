"use client";

import { useEffect } from "react";
import BookItem from "../common/book-item";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getAllBooks } from "@/lib/features/books/booksSlice";
import { BookT } from "@/types/book";
import styles from "@/styles/components/common/books-list.module.css";

const RecentlyAddedBooks = () => {
  const dispatch = useAppDispatch();
  const books: BookT[] = useAppSelector((state) => state.books.books);

  useEffect(() => {
    dispatch(getAllBooks());
  }, [dispatch]);

  return (
    <section className={styles.books_list_container}>
      <p>Recently Added Books</p>
      <div className={styles.books_list}>
        {books.length === 0 && <p>Nothing to show here.</p>}
        {books.slice(0, 20).map((book: BookT) => {
          return <BookItem key={book.id} book={book} />;
        })}
      </div>
    </section>
  );
};

export default RecentlyAddedBooks;
