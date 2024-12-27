"use client";

import { useEffect } from "react";
import { BooksList } from "@/components/common";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getAllBooks } from "@/lib/features/books/booksSlice";
import { BookT } from "@/types/book";

const RecentlyAddedBooks = () => {
  const dispatch = useAppDispatch();
  const books: BookT[] = useAppSelector((state) => state.books.books);

  useEffect(() => {
    dispatch(getAllBooks());
  }, [dispatch]);

  return <BooksList books={books} slugName="Recently added" />;
};

export default RecentlyAddedBooks;
