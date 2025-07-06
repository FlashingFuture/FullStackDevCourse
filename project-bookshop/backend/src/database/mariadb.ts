import mariadb from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

export const connection = mariadb.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: "Bookshop",
  waitForConnections: true,
  connectionLimit: 10,
  dateStrings: true,
});
