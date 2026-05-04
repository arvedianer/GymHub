import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

function getPrismaClient(): PrismaClient {
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = new PrismaClient();
    if (process.env.NODE_ENV !== "production") {
      globalForPrisma.prisma = globalForPrisma.prisma;
    }
  }
  return globalForPrisma.prisma;
}

// Lazy proxy: PrismaClient is only instantiated on first actual use.
// This prevents build crashes when DATABASE_URL is missing during static generation.
export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    const client = getPrismaClient();
    const value = (client as any)[prop];
    return typeof value === "function" ? value.bind(client) : value;
  },
});
