import "module-alias/register";
import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/users";

import { errorHandler } from "./middlewares/errorHandler";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use("/users", userRouter);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
