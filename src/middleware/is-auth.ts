import { catchError } from "../utils/error";
import express from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

const isAuth = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const token = req.cookies.jwt;
  if (!token) {
    const error = new Error("Not authenticated, no token.");
    res.status(401);
    throw error;
  }
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    if (!decodedToken) {
      const error = new Error("Not authenticated, invalid token.");
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
