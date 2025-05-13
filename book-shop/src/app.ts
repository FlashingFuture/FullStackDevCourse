import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/users";

dotenv.config();
const app = express();
app.use(express.json());
app.use("/users", userRouter);
const PORT = process.env.PORT;

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
