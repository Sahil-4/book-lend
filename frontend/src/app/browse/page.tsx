"use client";

import { useEffect, useState } from "react";
import { BooksList } from "@/components/common";
import { SearchBox } from "@/components/layout";
import { BookT } from "@/types/book";

const Page = () => {
  const [books, setBooks] = useState<BookT[]>([]);

  const updateBooks = async () => {
    const resp = await fetch("/static-data.json");
    const body = await resp.json();
    setBooks(body.books);
  };

  useEffect(() => {
    updateBooks();
  }, []);

  return (
    <main>
      <SearchBox />
      <BooksList books={books} slugName="Results" />
    </main>
  );
};

export default Page;
