"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getBookById } from "@/lib/features/books/booksSlice";
import { BookT } from "@/types/book";
import styles from "@/styles/pages/browse-books.module.css";

const Page = ({ params }: { params: Promise<{ bookId: string }> }) => {
  const [bookId, setBookId] = useState<string | null>(null);
  const books: Map<string, BookT> = useAppSelector((state) => state.books.booksMap);
  const [book, setBook] = useState<BookT | null>(null);

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
      <div className={styles.book_details}>
        <div className={styles.book_details_container}>
          <div className={styles.book_details__image_container}>
            <Image src={book.cover || "/thumbnail.jpg"} alt="book album" fill={true} />
          </div>

          <div className={styles.book_details__metadata_container}>
            <p>{book.title}</p>
            <p>{book.author}</p>
            <p>{book.genre}</p>
            <Link target="_blank" href={book.preview || "/404"}>
              Preview
            </Link>
            <p>Price: {book.price}</p>
            <button>Chat with seller</button>
            <button>Edit</button>
          </div>
        </div>

        <p className={styles.book_description}>{book.description}</p>
      </div>
    </section>
  );
};

export default Page;
