"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "@/styles/pages/browse-books.module.css";

const book = {
  id: "10001",
  title: "The Great Gatsby",
  thumbnail: "/thumbnail.jpg",
  description:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sem sem, bibendum nec nibh sed, pharetra eleifend lorem. Suspendisse dapibus pharetra pharetra. Praesent accumsan id ipsum quis varius. Proin auctor ornare urna, et porta mi pharetra eu. Etiam pellentesque feugiat nibh, id facilisis metus scelerisque et. Suspendisse semper turpis velit, at facilisis nibh posuere vel. Cras sed augue non nisi sollicitudin efficitur at sit amet tortor. In consectetur, enim sed fermentum dignissim, sapien diam accumsan risus, eget facilisis augue dolor a nisi. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Fusce massa nisi, semper quis semper at, aliquet et lectus. Fusce vestibulum tempus scelerisque. Sed maximus nisi nec nulla fermentum tempor. Suspendisse ullamcorper lacus feugiat lorem sodales, at vulputate massa tempus. Morbi eget libero semper, finibus ipsum dictum, suscipit urna. Aenean dignissim nunc velit, vitae consequat ipsum tincidunt sed. Nullam sapien erat, bibendum a efficitur eu, mattis quis libero.",
  author: "F. Scott Fitzgerald",
  genre: "Fiction",
  preview: "https://example.com/previews/great-gatsby.jpg",
  price: "5.99",
  sellerId: "seller12345",
  createdAt: "2024-11-22T10:30:00Z",
};

const Page = ({ params }: { params: Promise<{ bookId: string }> }) => {
  const [bookId, setBookId] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setBookId((await params).bookId);
    })();
  }, [params]);

  useEffect(() => {
    console.log(bookId);
  }, [bookId]);

  return (
    <section>
      <div className={styles.book_details}>
        <div className={styles.book_details_container}>
          <div className={styles.book_details__image_container}>
            <Image src={book.thumbnail} alt="book album" fill={true} />
          </div>

          <div className={styles.book_details__metadata_container}>
            <p>{book.title}</p>
            <p>{book.author}</p>
            <p>{book.genre}</p>
            <Link href={book.preview}>Preview</Link>
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
