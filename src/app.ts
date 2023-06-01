import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth";
import tasksRoutes from "./routes/tasks";
import listsRoutes from "./routes/lists";
import groupsRoutes from "./routes/group";

const MONGODB_URI = process.env.MONGODB_URI;

const app = express();

app.use(express.json());

//cors
app.use(
  (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, PATCH, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    next();
  }
);

//error
app.use(
  (
    error: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.log(error);
    const message = error.message;
    res.json({ message: message });
  }
);

//routes
app.use("/auth", authRoutes);
app.use("/tasks", tasksRoutes);
app.use("/lists", listsRoutes);
app.use("/groups", groupsRoutes);

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
