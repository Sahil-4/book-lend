import { prisma } from "../prisma/index.js";
import { User } from "./user.model.js";

type Status = "Sell" | "Rent";

interface Book {
  id: string;
  title: string;
  description: string;
  author: string;
  genre: string;
  cover: string | null;
  preview: string | null;
  price: number;
  status: Status;
  seller: Partial<User>;
  sellerId: string;
  createdAt: Date;
  updatedAt: Date;
}

export const getBooksCount = async () => {
  return await prisma.book.count();
};

export const getAuthorsCount = async () => {
  const results = await prisma.book.findMany({
    distinct: ["author"],
    select: {
      author: true,
    },
  });

  return results.length;
};

export const getGenresCount = async () => {
  const results = await prisma.book.findMany({
    distinct: ["genre"],
    select: {
      genre: true,
    },
  });

  return results.length;
};

export const getAllBooks = async (take: number, skip: number): Promise<Book[]> => {
  return await prisma.book.findMany({
    include: {
      seller: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: take,
    skip: skip,
  });
};

export const getSellersBooks = async (
  sellerId: string,
  take: number,
  skip: number,
): Promise<Book[]> => {
  return await prisma.book.findMany({
    where: { sellerId },
    include: {
      seller: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: take,
    skip: skip,
  });
};

export const getBookById = async (id: string): Promise<Book | null> => {
  return await prisma.book.findUnique({
    where: { id },
    include: {
      seller: true,
    },
  });
};

export const searchBooks = async (
  queryObj: Partial<Pick<Book, "title" | "description" | "author" | "genre">>,
  take: number,
  skip: number,
): Promise<Book[]> => {
  return await prisma.book.findMany({
    where: {
      AND: [
        { title: { contains: queryObj.title, mode: "insensitive" } },
        { description: { contains: queryObj.description, mode: "insensitive" } },
        { author: { contains: queryObj.author } },
        { genre: { contains: queryObj.genre } },
      ],
    },
    include: {
      seller: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: take,
    skip: skip,
  });
};

export const createBook = async (
  book: Omit<Book, "id" | "createdAt" | "updatedAt" | "seller">,
): Promise<Book> => {
  return await prisma.book.create({
    data: { ...book },
    include: {
      seller: true,
    },
  });
};

export const updateBook = async (
  id: string,
  book: Partial<Omit<Book, "id" | "createdAt" | "updatedAt" | "sellerId" | "seller">>,
): Promise<Book | null> => {
  return await prisma.book.update({
    where: { id },
    data: { ...book },
    include: {
      seller: true,
    },
  });
};

export const deleteBook = async (id: string): Promise<Book> => {
  return await prisma.book.delete({
    where: { id },
    include: {
      seller: true,
    },
  });
};

export const getAllAuthors = async (take: number, skip: number): Promise<string[]> => {
  const result = await prisma.book.findMany({
    distinct: ["author"],
    select: { author: true },
    orderBy: {
      createdAt: "desc",
    },
    take: take,
    skip: skip,
  });

  return result.map((book) => book.author);
};

export const getAllGenres = async (take: number, skip: number): Promise<string[]> => {
  const result = await prisma.book.findMany({
    distinct: ["genre"],
    select: { genre: true },
    orderBy: {
      createdAt: "desc",
    },
    take: take,
    skip: skip,
  });

  return result.map((book) => book.genre);
};

export type { Book };
