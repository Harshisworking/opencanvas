import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const client =
    globalForPrisma.prisma ||
    new PrismaClient({
        log: ["query"],
        // You must explicitly pass the URL here now:
        datasourceUrl: process.env.DATABASE_URL,
    });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = client;

export * from "@prisma/client";