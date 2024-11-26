import { FormEvent } from "react";
import styles from "@/styles/components/layout/search-box.module.css";

const SearchBox = () => {
  const handleFormSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
  };

  return (
    <div className={styles.search_box_form_container}>
      <form onSubmit={handleFormSubmit}>
        <input type="text" placeholder="Discover your next great read" />
        <button type="submit">Search</button>

        <select name="author" id="author">
          <option value="default">Looking for specific author?</option>
          <option value="author_1">Author 1</option>
        </select>

        <select name="genre" id="genre">
          <option value="default">Genre</option>
          <option value="genre_1">Genre 1</option>
        </select>
      </form>
    </div>
  );
};

export default SearchBox;
