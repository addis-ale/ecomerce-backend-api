import express from "express";
import dotenv from "dotenv";
import rootRouter from "./routes";
import { PrismaClient } from "@prisma/client";
import { errorMiddleware } from "./middleware/errors";
import { SignUpSchema } from "./models/users";
dotenv.config();
const app = express();
app.use(express.json());
export const prismaClient = new PrismaClient({
  log: ["query"],
});
app.use("/api", rootRouter);
app.use(errorMiddleware);

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
