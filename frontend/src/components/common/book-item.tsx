import Link from "next/link";
import { BookT } from "@/types/book";
import styles from "@/styles/components/common/books-item.module.css";
import { useAppSelector } from "@/lib/hooks";

const BookItem = ({ bookId }: { bookId: string }) => {
  const book: BookT = useAppSelector((state) => state.books.booksById[bookId]);

  return (
    <div className={styles.book_item}>
      <Link href={`/browse/${book.id}`}>{book.title}</Link>
      <p>{book.author}</p>
      <p>{book.description}</p>
    </div>
  );
};

export default BookItem;
