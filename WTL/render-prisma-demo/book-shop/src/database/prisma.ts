import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();

let prismaInstance: PrismaClient | null = null;

export const getPrisma = () => {
  if (!prismaInstance) {
    prismaInstance = new PrismaClient();
  }
  return prismaInstance;
};
