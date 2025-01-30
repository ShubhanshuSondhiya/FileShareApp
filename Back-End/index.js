import express, { urlencoded } from "express";
import cors from "cors";
import mongoose from "mongoose";
import "dotenv/config";
import FileRouter from "./routes/fileRouter.js";

const port = process.env.PORT;
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", FileRouter);
mongoose
  .connect(process.env.DBCONNECTION)
  .then(() => {
    app.listen(port, () => console.log("Server is up and Running"));
  })
  .catch((err) => console.log(err));
