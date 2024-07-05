import { PrismaClient } from "@prisma/client";

// This file is responsible for initializing and exporting the Prisma client instance.

// The `globalForPrisma` object is used to store the Prisma client instance globally.
// It is casted as `unknown` and then as `globalThis` to access the global object.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// The `prisma` constant is exported and used as the Prisma client instance.
// If the `globalForPrisma.prisma` is already defined, it is used as the instance.
// Otherwise, a new instance of `PrismaClient` is created and assigned to `globalForPrisma.prisma`.
export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"],
  });

// In non-production environments, the `prisma` instance is assigned to `globalForPrisma.prisma`.
// This allows the instance to be reused across multiple requests, improving performance.
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
