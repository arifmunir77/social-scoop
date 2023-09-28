import express from "express";
import connectDb from "./config/db.js";
import path from "path";
import userRoute from "./router/userRoute.js";

import { errorHandeler, notFound } from "./middleware/errorHandler.js";
import cors from "cors";
import dotenv from "dotenv";
const app = express();
app.use(cors());

dotenv.config();
connectDb();

app.listen(process.env.PORT, () => {
  console.log("Server is Running", process.env.PORT);
});

app.use(express.json());

// parse request data content type application/json

app.use("/api/user", userRoute);

app.use(errorHandeler);
app.use(notFound);
