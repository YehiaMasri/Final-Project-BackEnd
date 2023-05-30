import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectToDataBase from "./dataBase/dataBase.js";
import userRouter from "./routes/userRoute.js";
import socialRoute from "./routes/socialMediaRoute.js";
import orderRouter from "./routes/orderRoute.js"; 
import productRoute from "./routes/productRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import filmRoute from "./routes/filmRoute.js";
import palystationRoute from "./routes/playstationRoute.js";
import roomRoute from "./routes/entertainmentRoute.js";
import cookieParser from "cookie-parser";
import messageRouter from "./routes/messageRoute.js";


dotenv.config();
connectToDataBase();

const PORT = process.env.PORT || 3000;

const app = new express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.listen(
  PORT,
  console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}!!!`)
);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.use("/user", userRouter);
app.use("/room", roomRoute);
app.use("/socialmedia", socialRoute);
app.use("/order", orderRouter);
app.use("/product", productRoute);
app.use("/category", categoryRoute);
app.use("/film", filmRoute);
app.use("/game", palystationRoute);
app.use("/message" , messageRouter);

