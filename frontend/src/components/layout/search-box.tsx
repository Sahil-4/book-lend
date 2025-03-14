"use client";

import { FormEvent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { getAllAuthors, getAllGenres, searchBooks } from "@/lib/features/books/booksSlice";
import styles from "@/styles/components/layout/search-box.module.css";

const SearchBox = () => {
  const dispatch = useAppDispatch();

  const authors: string[] = Array.from(useAppSelector((state) => state.books.authors));
  const genres: string[] = Array.from(useAppSelector((state) => state.books.genres));

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;

    const titleInput = form[0] as HTMLInputElement;
    const authorInput = form[2] as HTMLSelectElement;
    const genreInput = form[3] as HTMLSelectElement;

    if (!titleInput.value && !authorInput.value && !genreInput.value) return;

    const params = new URLSearchParams();

    params.append(titleInput.name, titleInput.value);
    params.append(authorInput.name, authorInput.value);
    params.append(genreInput.name, genreInput.value);

    dispatch(searchBooks({ query: params.toString(), limit: 100, page: 1 }));
  };

  useEffect(() => {
    dispatch(getAllAuthors());
    dispatch(getAllGenres());
  }, [dispatch]);

  return (
    <div className={styles.search_box_form_container}>
      <form onSubmit={handleFormSubmit}>
        <input name="title" type="text" placeholder="Discover your next great read" />
        <button type="submit">Search</button>

        <select name="author" id="author">
          <option value="">Looking for specific author?</option>
          {authors.map((author, index) => {
            return (
              <option value={author} key={index}>
                {author}
              </option>
            );
          })}
        </select>

        <select name="genre" id="genre">
          <option value="">Genre</option>
          {genres.map((genre, index) => {
            return (
              <option value={genre} key={index}>
                {genre}
              </option>
            );
          })}
        </select>
      </form>
    </div>
  );
};

export default SearchBox;
