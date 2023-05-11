import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectToDataBase from "./dataBase/dataBase.js";

dotenv.config();
connectToDataBase();

const PORT = process.env.PORT || 3000;

const app = new express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.listen(
  PORT,
  console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}!!!`)
);

app.get("/", (req, res) => {
  res.send("API is running...");
});
