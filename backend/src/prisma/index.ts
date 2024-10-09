import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({
  omit: {
    user: {
      phone: true,
      password: true,
      accessToken: true,
      updatedAt: true,
    },
  },
});

export { prisma };
