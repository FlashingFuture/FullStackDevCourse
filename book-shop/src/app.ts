import "module-alias/register";
import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/users";
import bookRouter from "./routes/books";
import categoryRouter from "./routes/categories";
import likeRouter from "./routes/likes";
import shoppingCartRouter from "./routes/shoppingCarts";
import { errorHandler } from "./middlewares/errorHandler";

dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
app.use("/users", userRouter);
app.use("/books", bookRouter);
app.use("/categories", categoryRouter);
app.use("/likes", likeRouter);
app.use("/cart", shoppingCartRouter);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
