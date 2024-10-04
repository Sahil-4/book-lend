import { Router } from "express";
import {
  getSellersBooks,
  getAllBooks,
  getBookById,
  searchBooks,
  createBook,
  updateBook,
  deleteBook,
} from "../controllers/book.controllers.js";
import { validateRequest } from "../middlewares/validateRequest.js";
import { authenticate } from "../middlewares/authenticate.js";

const router = Router();

router.use(authenticate);

router.get("/", getSellersBooks);

router.get("/all", getAllBooks);

router.get("/search", searchBooks);

router.get("/search/:id", getBookById);

router.post("/", createBook);

router.put("/:id", updateBook);

router.delete("/:id", deleteBook);

export default router;
