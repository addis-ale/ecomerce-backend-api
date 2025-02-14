import express from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
app.get("/", (req, res) => {
  res.send("yes,working");
});
app.listen(process.env.PORT || 8001, () => {
  console.log("app working");
});
