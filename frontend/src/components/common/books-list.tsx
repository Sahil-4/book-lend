"use client";

import { List } from "../sections";
import { useCallback, useEffect } from "react";
import { BookItem } from "@/components/common";
import { getAllBooks } from "@/lib/features/books/booksSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { BookT } from "@/types/book";
import styles from "@/styles/components/common/books-list.module.css";

const BooksList = () => {
  const dispatch = useAppDispatch();
  const books: BookT[] = useAppSelector((state) => state.books.results);

  const loadMore = useCallback(() => {
    dispatch(getAllBooks());
  }, [dispatch]);

  useEffect(() => {
    loadMore();
  }, [loadMore]);

  return (
    <section className={styles.books_list_container}>
      <p>Results</p>
      <List className={styles.books_list} callback={loadMore}>
        {books.map((book) => {
          return <BookItem key={book.id} book={book} />;
        })}
      </List>
    </section>
  );
};

export default BooksList;
