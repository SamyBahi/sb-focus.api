import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/auth";
import tasksRoutes from "./routes/tasks";
import listsRoutes from "./routes/lists";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";

const MONGODB_URI = process.env.MONGODB_URI;

const corsOptions = {
  origin: "http://localhost:5173", // Remplacez par l'URL de votre front-end local
  methods: ["GET", "POST"], // Ajoutez les méthodes nécessaires
  credentials: true, // Active la prise en charge des "credentials" (cookies)
};

const app = express();

app.use(compression());
app.use(express.json());
app.use(cookieParser());

//cors
app.use(cors(corsOptions));

//routes
app.use("/auth", authRoutes);
app.use("/tasks", tasksRoutes);
app.use("/lists", listsRoutes);

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
