"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getBookById } from "@/lib/features/books/booksSlice";
import { BookT } from "@/types/book";
import { UserT } from "@/types/user";
import styles from "@/styles/pages/browse-books.module.css";

const Page = ({ params }: { params: Promise<{ bookId: string }> }) => {
  const [bookId, setBookId] = useState<string | null>(null);
  const books: Map<string, BookT> = useAppSelector((state) => state.books.booksMap);
  const [book, setBook] = useState<BookT | null>(null);
  const user: UserT = useAppSelector((state) => state.auth.user);

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
            {user && user.id !== book.sellerId && (
              <Link href={`/chats?uid=${book.sellerId}`} className={styles.book_details__link_button}>
                Chat with seller
              </Link>
            )}
            {user && user.id === book.sellerId && (
              <Link href={`/browse/${book.id}/edit`} className={styles.book_details__link_button}>
                Edit
              </Link>
            )}
          </div>
        </div>

        <p className={styles.book_description}>{book.description}</p>
      </div>
    </section>
  );
};

export default Page;
