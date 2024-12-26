import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as booksAPI from "@/api/book";
import { BookT } from "@/types/book";

interface BooksSliceState {
  error: unknown;
  loading: boolean;
  books: Set<BookT>;
  results: Set<BookT>;
  myBooks: Set<BookT>;
  booksMap: Map<string, BookT>;
  authors: Set<string>;
  genres: Set<string>;
}

const initialState: BooksSliceState = {
  error: null,
  loading: false,
  books: new Set(),
  results: new Set(),
  myBooks: new Set(),
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
      (action.payload?.data as BookT[]).forEach((book) => state.books.add(book));
      state.results = new Set(action.payload?.data as BookT[]);
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
      (action.payload?.data as BookT[]).forEach((book) => state.myBooks.add(book));
    });
    builder.addCase(searchBooks.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(searchBooks.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      const book: BookT = action.payload?.data as BookT;
      state.books.add(book);
      state.results.add(book);
      state.booksMap.set(book.id, book);
    });
    builder.addCase(createBook.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(createBook.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      const book: BookT = action.payload?.data as BookT;
      state.books.add(book);
      state.results.add(book);
      state.myBooks.add(book);
      state.booksMap.set(book.id, book);
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
      state.books.forEach((book) => {
        if (book.id === action.meta.arg.id) state.books.delete(book);
      });
      state.myBooks.forEach((book) => {
        if (book.id === action.meta.arg.id) state.myBooks.delete(book);
      });
      state.books.add(book);
      state.myBooks.add(book);
    });
    builder.addCase(deleteBook.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });
    builder.addCase(deleteBook.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.booksMap.delete(action.meta.arg);
      state.books.forEach((book) => {
        if (book.id === action.meta.arg) state.books.delete(book);
      });
      state.myBooks.forEach((book) => {
        if (book.id === action.meta.arg) state.myBooks.delete(book);
      });
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

export const updateBook = createAsyncThunk("books/update", async (book: Partial<BookT>) => {
  return await booksAPI.updateBook(book);
});

export const deleteBook = createAsyncThunk("books/delete", async (id: string) => {
  return await booksAPI.deleteBook(id);
});

export type { BooksSliceState };
export const {} = booksSlice.actions;
export default booksSlice;
