import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { enableMapSet } from "immer";
import * as booksAPI from "@/api/book";
import { BookT } from "@/types/book";

enableMapSet();

interface BooksSliceState {
  error: unknown;
  loading: boolean;
  books: BookT[];
  results: BookT[];
  myBooks: BookT[];
  booksMap: Map<string, BookT>;
  myBooksMap: Map<string, BookT>;
  authors: Set<string>;
  genres: Set<string>;
}

const initialState: BooksSliceState = {
  error: null,
  loading: false,
  books: [],
  results: [],
  myBooks: [],
  myBooksMap: new Map(),
  booksMap: new Map(),
  authors: new Set(),
  genres: new Set(),
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllBooks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getAllBooks.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      (action.payload?.data as BookT[]).forEach((book) => state.booksMap.set(book.id, book));
      state.results = action.payload?.data as BookT[];
      state.books = Array.from(state.booksMap.values());
    });
    builder.addCase(getAllAuthors.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getAllAuthors.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      (action.payload?.data as string[]).forEach((author) => state.authors.add(author));
    });
    builder.addCase(getAllGenres.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getAllGenres.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      (action.payload?.data as string[]).forEach((genre) => state.genres.add(genre));
    });
    builder.addCase(getBookById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getBookById.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      const book: BookT = action.payload?.data as BookT;
      state.booksMap.set(book.id, book);
    });
    builder.addCase(getMyBooks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getMyBooks.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      (action.payload?.data as BookT[]).forEach((book) => state.myBooksMap.set(book.id, book));
      state.myBooks = Array.from(state.myBooksMap.values());
    });
    builder.addCase(searchBooks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(searchBooks.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      const books: BookT[] = action.payload?.data as BookT[];
      state.results = books;
      books.forEach((book) => state.booksMap.set(book.id, book));
    });
    builder.addCase(createBook.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(createBook.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      const book: BookT = action.payload?.data as BookT;
      state.books.push(book);
      state.results.push(book);
      state.myBooks.push(book);
      state.booksMap.set(book.id, book);
      state.myBooksMap.set(book.id, book);
    });
    builder.addCase(updateBook.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(updateBook.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      const book: BookT = action.payload?.data as BookT;
      state.booksMap.set(book.id, book);
      state.myBooksMap.set(book.id, book);
      state.books = Array.from(state.booksMap.values());
      state.myBooks = Array.from(state.myBooksMap.values());
    });
    builder.addCase(deleteBook.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(deleteBook.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.booksMap.delete(action.meta.arg);
      state.myBooksMap.delete(action.meta.arg);
      state.books = Array.from(state.booksMap.values());
      state.myBooks = Array.from(state.myBooksMap.values());
    });
    builder.addMatcher(
      (action) => action.type.endsWith("/pending"),
      (state) => {
        state.loading = true;
      },
    );
  },
});

export const getAllBooks = createAsyncThunk("books/all", async () => {
  return await booksAPI.getAllBooks();
});

export const getAllAuthors = createAsyncThunk("books/authors", async () => {
  return await booksAPI.getAllAuthors();
});

export const getAllGenres = createAsyncThunk("books/genres", async () => {
  return await booksAPI.getAllGenres();
});

export const getBookById = createAsyncThunk("books/id", async (id: string) => {
  return await booksAPI.getBookById(id);
});

export const getMyBooks = createAsyncThunk("books/mine", async () => {
  return await booksAPI.getMyBooks();
});

export const searchBooks = createAsyncThunk("books/search", async (query: string) => {
  return await booksAPI.searchBooks(query);
});

export const createBook = createAsyncThunk("books/create", async (book: FormData) => {
  return await booksAPI.createBook(book);
});

export const updateBook = createAsyncThunk("books/update", async (payload: {book: FormData, id: string}) => {
  return await booksAPI.updateBook(payload.book, payload.id);
});

export const deleteBook = createAsyncThunk("books/delete", async (id: string) => {
  return await booksAPI.deleteBook(id);
});

export type { BooksSliceState };
export const {} = booksSlice.actions;
export default booksSlice;
