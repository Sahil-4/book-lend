import { prisma } from "../prisma/index.js";
import { User } from "./user.model.js";

enum Status {
  "Sell",
  "Rent"
}

interface Book {
  id: string;
  title: string;
  description: string;
  author: string;
  genre: string;
  preview: string | null;
  price: number;
  status: Status;
  seller: User;
  sellerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export const getAllBooks = async (): Promise<Book[]> => {
  return await prisma.book.findMany();
};

export const getSellersBooks = async (sellerId: string): Promise<Book[]> => {
  return await prisma.book.findMany({
    where: { sellerId },
  });
};

export const getBookById = async (id: string): Promise<Book | null> => {
  return await prisma.book.findUnique({
    where: { id },
  });
};

export const searchBooks = async (
  queryObj: Partial<Pick<Book, "title" | "description" | "author" | "genre">>,
): Promise<Book[]> => {
  return await prisma.book.findMany({
    where: {
      OR: [
        { title: { contains: queryObj.title } },
        { description: { contains: queryObj.description } },
        { author: { contains: queryObj.author } },
        { genre: { contains: queryObj.genre } },
      ],
    },
  });
};

export const createBook = async (
  book: Omit<Book, "id" | "createdAt" | "updatedAt">,
): Promise<Book> => {
  return await prisma.book.create({
    data: { ...book },
  });
};

export const updateBook = async (
  id: string,
  book: Partial<Omit<Book, "id" | "createdAt" | "updatedAt" | "sellerId">>,
): Promise<Book | null> => {
  return await prisma.book.update({
    where: { id },
    data: { ...book },
  });
};

export const deleteBook = async (id: string): Promise<Book> => {
  return await prisma.book.delete({
    where: { id },
  });
};

export const getAllAuthors = async (): Promise<string[]> => {
  const result = await prisma.book.findMany({
    distinct: ["author"],
    select: { author: true },
  });

  return result.map((book: Book) => book.author);
};

export const getAllGenres = async (): Promise<string[]> => {
  const result = await prisma.book.findMany({
    distinct: ["genre"],
    select: { genre: true },
  });

  return result.map((book: Book) => book.genre);
};

export type { Book };
