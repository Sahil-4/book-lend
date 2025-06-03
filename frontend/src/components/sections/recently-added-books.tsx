"use client";

import { useEffect } from "react";
import BookItem from "../common/book-item";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getAllBooks } from "@/lib/features/books/booksSlice";
import styles from "@/styles/components/common/books-list.module.css";

const RecentlyAddedBooks = () => {
  const dispatch = useAppDispatch();
  const bookIds: string[] = useAppSelector((state) => state.books.bookIds);

  useEffect(() => {
    dispatch(getAllBooks());
  }, [dispatch]);

  return (
    <section className={styles.books_list_container}>
      <p>Recently Added Books</p>
      <div className={styles.books_list}>
        {bookIds.length === 0 && <p>Nothing to show here.</p>}
        {bookIds.slice(0, 20).map((bookId) => {
          return <BookItem key={bookId} bookId={bookId} />;
        })}
      </div>
    </section>
  );
};

export default RecentlyAddedBooks;
