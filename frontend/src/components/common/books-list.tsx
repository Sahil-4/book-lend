"use client";

import InfiniteScroll from "react-infinite-scroll-smart";
import { BookItem } from "@/components/common";
import { getAllBooks } from "@/lib/features/books/booksSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import styles from "@/styles/components/common/books-list.module.css";

const BooksList = () => {
  const dispatch = useAppDispatch();
  const bookIds: string[] = useAppSelector((state) => state.books.resultIds);
  const hasNext: boolean = useAppSelector((state) => state.books.hasMore_books);

  const loadMore = async () => {
    await dispatch(getAllBooks());
  };

  return (
    <section className={styles.books_list_container}>
      <p>Results</p>
      <InfiniteScroll
        callback={loadMore}
        disabled={!hasNext}
        direction="bottom"
        useWindowScroll={true}>
        <div className={styles.books_list}>
          {bookIds.map((bookId) => {
            return <BookItem key={bookId} bookId={bookId} />;
          })}
        </div>
      </InfiniteScroll>
    </section>
  );
};

export default BooksList;
