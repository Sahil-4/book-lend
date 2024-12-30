import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  omit: {
    user: {
      phone: true,
      password: true,
      refreshToken: true,
      updatedAt: true,
    },
  },
});

export { prisma };
