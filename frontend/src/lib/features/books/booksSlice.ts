import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as booksAPI from "@/api/book";
import { RootState } from "@/lib/store";
import { BookT } from "@/types/book";

interface BooksSliceState {
  error: unknown;
  loading: boolean;
  booksById: Record<string, BookT>;
  resultIds: string[];
  bookIds: string[];
  myBookIds: string[];
  authors: string[];
  genres: string[];
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
  booksById: {},
  resultIds: [],
  bookIds: [],
  myBookIds: [],
  authors: [],
  genres: [],
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
      state.resultIds = [];
      (action.payload?.data as BookT[]).forEach((book) => {
        state.booksById[book.id] = book;
        if (!state.resultIds.includes(book.id)) state.resultIds.push(book.id);
        if (!state.bookIds.includes(book.id)) state.bookIds.push(book.id);
      });
      state.loading = false;
      state.error = null;
      state.hasMore_books = !!action.payload?.meta?.hasMore;
      state.page_books = state.page_books + 1;
    });
    builder.addCase(getAllAuthors.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getAllAuthors.fulfilled, (state, action) => {
      (action.payload?.data as string[]).forEach((author) => {
        if (!state.authors.includes(author)) state.authors.push(author);
      });
      state.loading = false;
      state.error = null;
      state.hasMore_authors = !!action.payload?.meta?.hasMore;
      state.page_authors = state.page_authors + 1;
    });
    builder.addCase(getAllGenres.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getAllGenres.fulfilled, (state, action) => {
      (action.payload?.data as string[]).forEach((genre) => {
        if (!state.genres.includes(genre)) state.genres.push(genre);
      });
      state.loading = false;
      state.error = null;
      state.hasMore_genres = !!action.payload?.meta?.hasMore;
      state.page_genres = state.page_genres + 1;
    });
    builder.addCase(getBookById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getBookById.fulfilled, (state, action) => {
      const book: BookT = action.payload?.data as BookT;
      state.booksById[book.id] = book;
      if (!state.bookIds.includes(book.id)) state.bookIds.push(book.id);
      if (!state.resultIds.includes(book.id)) state.resultIds.push(book.id);
      state.loading = false;
      state.error = null;
    });
    builder.addCase(getMyBooks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(getMyBooks.fulfilled, (state, action) => {
      (action.payload?.data as BookT[]).forEach((book) => {
        state.booksById[book.id] = book;
        if (!state.bookIds.includes(book.id)) state.bookIds.push(book.id);
        if (!state.myBookIds.includes(book.id)) state.myBookIds.push(book.id);
      });
      state.loading = false;
      state.error = null;
      state.hasMore_myBooks = !!action.payload?.meta?.hasMore;
      state.page_myBooks = state.page_myBooks + 1;
    });
    builder.addCase(searchBooks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(searchBooks.fulfilled, (state, action) => {
      state.resultIds = [];
      (action.payload?.data as BookT[]).forEach((book) => {
        state.booksById[book.id] = book;
        if (!state.bookIds.includes(book.id)) state.bookIds.push(book.id);
        if (!state.resultIds.includes(book.id)) state.resultIds.push(book.id);
      });
      state.loading = false;
      state.error = null;
    });
    builder.addCase(createBook.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(createBook.fulfilled, (state, action) => {
      const book: BookT = action.payload?.data as BookT;
      state.booksById[book.id] = book;
      if (!state.resultIds.includes(book.id)) state.resultIds.push(book.id);
      if (!state.bookIds.includes(book.id)) state.bookIds.push(book.id);
      if (!state.myBookIds.includes(book.id)) state.myBookIds.push(book.id);
      state.loading = false;
      state.error = null;
    });
    builder.addCase(updateBook.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(updateBook.fulfilled, (state, action) => {
      const book: BookT = action.payload?.data as BookT;
      state.booksById[book.id] = book;
      if (!state.resultIds.includes(book.id)) state.resultIds.push(book.id);
      if (!state.bookIds.includes(book.id)) state.bookIds.push(book.id);
      if (!state.myBookIds.includes(book.id)) state.myBookIds.push(book.id);
      state.loading = false;
      state.error = null;
    });
    builder.addCase(deleteBook.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(deleteBook.fulfilled, (state, action) => {
      const bookId = action.meta.arg;
      delete state.booksById[bookId];
      state.bookIds = state.bookIds.filter((id) => id !== bookId);
      state.resultIds = state.resultIds.filter((id) => id !== bookId);
      state.myBookIds = state.myBookIds.filter((id) => id !== bookId);
      state.loading = false;
      state.error = null;
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
