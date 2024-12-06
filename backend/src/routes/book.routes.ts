import { Router } from "express";
import {
  getSellersBooks,
  getAllBooks,
  getAllAuthors,
  getAllGenres,
  getBookById,
  searchBooks,
  createBook,
  updateBook,
  deleteBook,
} from "../controllers/book.controllers.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { bookSchema, bookSchemaUpdate } from "../schema/validationSchema.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = Router();

router.use(authenticate);

router.get("/", getSellersBooks);

router.get("/all", getAllBooks);

router.get("/search", searchBooks);

router.get("/search/:id", getBookById);

router.get("/authors", getAllAuthors);

router.get("/genres", getAllGenres);

router.post("/", validateRequest(bookSchema), createBook);

router.put("/:id", validateRequest(bookSchemaUpdate), updateBook);

router.delete("/:id", deleteBook);

export default router;
