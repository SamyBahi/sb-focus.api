import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth";
import tasksRoutes from "./routes/tasks";
import listsRoutes from "./routes/lists";
import groupsRoutes from "./routes/group";
import cookieParser from "cookie-parser";
import cors from "cors";

const MONGODB_URI = process.env.MONGODB_URI;

const app = express();

app.use(express.json());
app.use(cookieParser());

//cors
app.use(cors({ origin: true, credentials: true }));

//routes
app.use("/auth", authRoutes);
app.use("/tasks", tasksRoutes);
app.use("/lists", listsRoutes);
app.use("/groups", groupsRoutes);

//error
app.use(
  (
    error: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const message = error.message;
    return res.json({ message: message });
  }
);

//db
mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    console.log("connected");
    app.listen(process.env.PORT || 8080);
  })
  .catch((err) => {
    console.log(err);
  });
