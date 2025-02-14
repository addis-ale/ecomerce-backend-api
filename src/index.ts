import express, { Request, Response } from "express";
import dotenv from "dotenv";
import rootRouter from "./routes";
dotenv.config();
const app = express();
app.use(express.json());

app.use("/api", rootRouter);

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
