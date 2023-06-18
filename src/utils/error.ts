import { validationResult } from "express-validator";
import express from "express";

export const validateInput = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error("validation failed." + errors.array()[0].msg);
    res.status(422);
    throw error;
  }
};

export const catchError = (
  err: Error,
  res: express.Response,
  next: express.NextFunction
) => {
  if (!res.statusCode) {
    res.status(500);
  }
  next(err);
};
