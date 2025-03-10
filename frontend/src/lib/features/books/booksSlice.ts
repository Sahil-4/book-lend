import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { enableMapSet } from "immer";
import * as booksAPI from "@/api/book";
import { RootState } from "@/lib/store";
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
  page_books: number;
  limit_books: number;
  hasMore_books: boolean;
  page_myBooks: number;
  limit_myBooks: number;
  hasMore_myBooks: boolean;
  page_authors: number;
  limit_authors: number;
  hasMore_authors: boolean;
  page_genres: number;
  limit_genres: number;
  hasMore_genres: boolean;
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
  page_books: 1,
  limit_books: 10,
  hasMore_books: true,
  page_myBooks: 1,
  limit_myBooks: 10,
  hasMore_myBooks: true,
  page_authors: 1,
  limit_authors: 10,
  hasMore_authors: true,
  page_genres: 1,
  limit_genres: 10,
  hasMore_genres: true,
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
      const bookIds = new Set(state.results.map((book) => book.id));
      (action.payload?.data as BookT[]).map((book) => {
        if (!bookIds.has(book.id)) state.results.push(book);
      });
      state.books = Array.from(state.booksMap.values());
      state.hasMore_books = !!action.payload?.meta?.hasMore;
      state.page_books = state.page_books + 1;
    });
    builder.addCase(getAllAuthors.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getAllAuthors.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      (action.payload?.data as string[]).forEach((author) => state.authors.add(author));
      state.hasMore_authors = !!action.payload?.meta?.hasMore;
      state.page_authors = state.page_authors + 1;
    });
    builder.addCase(getAllGenres.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getAllGenres.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      (action.payload?.data as string[]).forEach((genre) => state.genres.add(genre));
      state.hasMore_genres = !!action.payload?.meta?.hasMore;
      state.page_genres = state.page_genres + 1;
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
      state.hasMore_myBooks = !!action.payload?.meta?.hasMore;
      state.page_myBooks = state.page_myBooks + 1;
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

export const getAllBooks = createAsyncThunk("books/all", async (_, { getState }) => {
  const { page_books, limit_books } = (getState() as RootState).books;
  return await booksAPI.getAllBooks(page_books, limit_books);
});

export const getAllAuthors = createAsyncThunk("books/authors", async (_, { getState }) => {
  const { page_authors, limit_authors } = (getState() as RootState).books;
  return await booksAPI.getAllAuthors(page_authors, limit_authors);
});

export const getAllGenres = createAsyncThunk("books/genres", async (_, { getState }) => {
  const { page_genres, limit_genres } = (getState() as RootState).books;
  return await booksAPI.getAllGenres(page_genres, limit_genres);
});

export const getBookById = createAsyncThunk("books/id", async (id: string) => {
  return await booksAPI.getBookById(id);
});

export const getMyBooks = createAsyncThunk("books/mine", async (_, { getState }) => {
  const { page_myBooks, limit_myBooks } = (getState() as RootState).books;
  return await booksAPI.getMyBooks(page_myBooks, limit_myBooks);
});

export const searchBooks = createAsyncThunk(
  "books/search",
  async ({ query, page, limit }: { query: string; page: number; limit: number }) => {
    return await booksAPI.searchBooks(query, page, limit);
  },
);

export const createBook = createAsyncThunk("books/create", async (book: FormData) => {
  return await booksAPI.createBook(book);
});

export const updateBook = createAsyncThunk(
  "books/update",
  async (payload: { book: FormData; id: string }) => {
    return await booksAPI.updateBook(payload.book, payload.id);
  },
);

export const deleteBook = createAsyncThunk("books/delete", async (id: string) => {
  return await booksAPI.deleteBook(id);
});

export type { BooksSliceState };
export const {} = booksSlice.actions;
export default booksSlice;
