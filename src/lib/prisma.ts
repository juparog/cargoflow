import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

const globalForPrisma = global as unknown as { prisma: typeof client };

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = client;

export default client;
