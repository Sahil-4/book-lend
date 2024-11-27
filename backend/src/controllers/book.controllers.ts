import { Request, Response } from "express";
import { APIResponse } from "../utils/APIResponse.js";
import logger from "../utils/logger.js";
import * as Book from "../models/book.model.js";

const getSellersBooks = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const books = await Book.getSellersBooks(id);
    res.status(200).send(new APIResponse(200, books, "books fetched"));
  } catch (error: any) {
    logger.error(error.message);
    res.status(501).send(new APIResponse(501, null, "failed to get books"));
  }
};

const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.getAllBooks();
    res.status(200).send(new APIResponse(200, books, "books fetched"));
  } catch (error: any) {
    logger.error(error.message);
    res.status(501).send(new APIResponse(501, null, "failed to get books"));
  }
};

const getBookById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const book = await Book.getBookById(id);

    if (!book) {
      return res.status(404).send(new APIResponse(404, null, "book not found"));
    }

    res.status(200).send(new APIResponse(200, book, "book fetched"));
  } catch (error: any) {
    logger.error(error.message);
    res.status(501).send(new APIResponse(501, null, "failed to get book"));
  }
};

const searchBooks = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    const { title, description, author, genre } = query;

    if (!title && !description && !author && !genre) {
      return res.status(400).send(new APIResponse(400, null, "missing query parameter"));
    }

    const queryObj: Partial<Pick<Book.Book, "title" | "description" | "author" | "genre">> = {};

    if (title?.toString() != "") queryObj.title = title?.toString();
    if (description?.toString() != "") queryObj.description = description?.toString();
    if (author?.toString() != "") queryObj.author = author?.toString();
    if (genre?.toString() != "") queryObj.genre = genre?.toString();

    const books: Book.Book[] = await Book.searchBooks(queryObj);

    res.status(200).send(new APIResponse(200, books, "books found"));
  } catch (error: any) {
    logger.error(error.message);
    res.status(501).send(new APIResponse(501, null, "failed to search books"));
  }
};

const createBook = async (req: Request, res: Response) => {
  try {
    const body = req.body;

    const bookObj: Omit<Book.Book, "id" | "createdAt" | "updatedAt"> = {
      title: body.title,
      description: body.description,
      author: body.author,
      genre: body.genre,
      preview: body.preview,
      price: body.price,
      status: body.status,
      sellerId: body.sellerId,
    };

    const book = await Book.createBook(bookObj);

    res.status(200).send(new APIResponse(200, book, "book created"));
  } catch (error: any) {
    logger.error(error.message);
    res.status(501).send(new APIResponse(501, null, "failed to create new book"));
  }
};

const updateBook = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const body = req.body;

    const bookObj: Partial<Omit<Book.Book, "id" | "createdAt" | "updatedAt" | "sellerId">> = {};
    if (body.title) bookObj.title = body.title;
    if (body.description) bookObj.description = body.description;
    if (body.author) bookObj.author = body.author;
    if (body.genre) bookObj.genre = body.genre;
    if (body.preview) bookObj.preview = body.preview;
    if (body.price) bookObj.price = body.price;
    if (body.status) bookObj.status = body.status;

    const updatedBook = await Book.updateBook(id, bookObj);

    if (!updatedBook) {
      return res.status(404).send(new APIResponse(404, null, "book not found"));
    }

    res.status(200).send(new APIResponse(200, updatedBook, "book updated"));
  } catch (error: any) {
    logger.error(error.message);
    res.status(501).send(new APIResponse(501, null, "failed to update book"));
  }
};

const deleteBook = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    await Book.deleteBook(id);
    res.status(200).send(new APIResponse(200, null, "book deleted"));
  } catch (error: any) {
    logger.error(error.message);
    res.status(501).send(new APIResponse(501, null, "failed to delete book"));
  }
};

const getAllAuthors = async (req: Request, res: Response) => {
  try {
    const authors = await Book.getAllAuthors();
    res.status(200).send(new APIResponse(200, authors, "fetched authors"));
  } catch (error: any) {
    logger.error(error.message);
    res.status(501).send(new APIResponse(501, null, "failed to fetch authors"));
  }
};

const getAllGenres = async (req: Request, res: Response) => {
  try {
    const genres = await Book.getAllGenres();
    res.status(200).send(new APIResponse(200, genres, "fetched genres"));
  } catch (error: any) {
    logger.error(error.message);
    res.status(501).send(new APIResponse(501, null, "failed to fetch genres"));
  }
};

export {
  getSellersBooks,
  getAllBooks,
  getBookById,
  createBook,
  searchBooks,
  updateBook,
  deleteBook,
  getAllAuthors,
  getAllGenres,
};
