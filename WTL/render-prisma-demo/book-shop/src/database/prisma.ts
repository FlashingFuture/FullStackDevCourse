import dotenv from "dotenv";
dotenv.config();

let prismaInstance: any;

export const getPrisma = () => {
  if (!prismaInstance) {
    const { PrismaClient } = require("@prisma/client"); // <-- 여기 핵심
    prismaInstance = new PrismaClient();
  }
  return prismaInstance;
};