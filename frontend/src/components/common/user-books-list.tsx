"use client";

import InfiniteScroll from "react-infinite-scroll-smart";
import { BookItem } from "@/components/common";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getAllBooks, getBooksByUserId } from "@/lib/features/books/booksSlice";
import { BookT } from "@/types/book";
import styles from "@/styles/components/common/books-list.module.css";

type PropsType = {
  userId: string;
};

const UserBooksList = (props: PropsType) => {
  const { userId } = props;

  const dispatch = useAppDispatch();

  const books: BookT[] = useAppSelector((state) => getBooksByUserId(state.books, userId));
  const hasNext: boolean = useAppSelector((state) => state.books.hasMore_myBooks);

  const loadMore = async () => {
    await dispatch(getAllBooks());
  };

  return (
    <section className={styles.books_list_container}>
      <p>User books</p>
      <InfiniteScroll
        callback={loadMore}
        disabled={!hasNext}
        direction="bottom"
        useWindowScroll={true}>
        <div className={styles.books_list}>
          {books.map((book) => {
            return <BookItem key={book.id} bookId={book.id} />;
          })}
        </div>
      </InfiniteScroll>
    </section>
  );
};

export default UserBooksList;
