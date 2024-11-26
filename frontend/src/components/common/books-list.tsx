import Link from "next/link";
import { BookT } from "@/types/book";
import styles from "@/styles/components/common/books-list.module.css";

const BookItem = ({ book }: { book: BookT }) => {
  return (
    <div className={styles.book_item}>
      <Link href={`/browse/${book.id}`}>{book.title}</Link>
      <p>{book.author}</p>
      <p>{book.description}</p>
    </div>
  );
};

const BooksList = ({ books, slugName }: { books: BookT[]; slugName: string }) => {
  return (
    <section className={styles.books_list_container}>
      <p>{slugName}</p>

      <div className={styles.books_list}>
        {books.length === 0 && <p>Nothing to show here.</p>}
        {books.map((book: BookT) => {
          return <BookItem key={book.id} book={book} />;
        })}
      </div>
    </section>
  );
};

export { BookItem };
export default BooksList;
