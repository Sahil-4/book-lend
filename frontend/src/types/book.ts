type BookT = {
  id: string;
  title: string;
  description: string;
  author: string;
  genre: string;
  preview: string | null;
  rentingPrice: number | null;
  sellingPrice: number | null;
  status: string;
  sellerId: string;
  createdAt: Date;
  updatedAt: Date;
};

export type { BookT };
