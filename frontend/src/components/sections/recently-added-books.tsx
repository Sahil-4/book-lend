"use client";

import { useEffect, useState } from "react";
import { BooksList } from "@/components/common";
import { BookT } from "@/types/book";

const RecentlyAddedBooks = () => {
  const [books, setBooks] = useState<BookT[]>([]);

  const updateBooks = async () => {
    const resp = await fetch("/static-data.json");
    const body = await resp.json();
    setBooks(body.books);
  };

  useEffect(() => {
    updateBooks();
  }, []);

  return <BooksList books={books} slugName="Recently added" />;
};

export default RecentlyAddedBooks;
