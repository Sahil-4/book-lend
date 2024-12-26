import { UserT } from "@/types/user";

enum Status {
  "Sell",
  "Rent"
}

type BookT = {
  id: string;
  title: string;
  description: string;
  author: string;
  genre: string;
  cover: string | null;
  preview: string | null;
  price: number;
  status: Status;
  seller: UserT;
  sellerId: string;
  createdAt: Date;
  updatedAt: Date;
};

type BookCreate = Omit<BookT, "id" | "seller" | "createdAt" | "updatedAt">;

export type { BookT, BookCreate };
