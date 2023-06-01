import { catchError } from "./error";
import express from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

const isAuth = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new Error("Not authenticated");
    res.status(401);
    throw error;
  }
  const token = req.get("Authorization").split(" ")[1];
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    if (!decodedToken) {
      const error = new Error("Not authenticated.");
      res.status(401);
      throw error;
    }
    (<any>req).userId = (<any>decodedToken).userId;
  } catch (err) {
    catchError(err, res, next);
  }
  next();
};

export default isAuth;
