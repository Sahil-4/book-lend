"use client";

import { useCallback, useEffect } from "react";
import { List } from "@/components/sections";
import { BookItem } from "@/components/common";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getAllBooks } from "@/lib/features/books/booksSlice";
import { BookT } from "@/types/book";
import styles from "@/styles/components/common/books-list.module.css";

type PropsType = {
  userId: string;
};

const UserBooksList = (props: PropsType) => {
  const { userId } = props;

  const dispatch = useAppDispatch();

  const books: BookT[] = useAppSelector((state) => state.books.books);

  const loadMore = useCallback(() => {
    dispatch(getAllBooks());
  }, [dispatch]);

  useEffect(() => {
    loadMore();
  }, [loadMore]);

  return (
    <section className={styles.books_list_container}>
      <p>User books</p>
      <List className={styles.books_list} callback={loadMore}>
        {books.map((book) => {
          if (book.sellerId === userId) {
            return <BookItem key={book.id} book={book} />;
          }
        })}
      </List>
    </section>
  );
};

export default UserBooksList;
