"use client";

import { useEffect } from "react";
import { BooksList } from "@/components/common";
import { SearchBox } from "@/components/layout";
import { getAllBooks } from "@/lib/features/books/booksSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { BookT } from "@/types/book";

const Page = () => {
  const dispatch = useAppDispatch();
  const books: BookT[] = useAppSelector((state) => state.books.results);

  useEffect(() => {
    dispatch(getAllBooks());
  }, [dispatch]);

  return (
    <main>
      <SearchBox />
      <BooksList books={books} slugName="Results" />
    </main>
  );
};

export default Page;
