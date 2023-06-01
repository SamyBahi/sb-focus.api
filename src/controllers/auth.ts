import express from "express";
import { catchError, validateInput } from "../utils/error";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const signupController = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    validateInput(req, res, next);
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;
    const hashedPw = await bcrypt.hash(password, 12);
    const user = new User({
      email,
      name,
      password: hashedPw,
    });
    await user.save();
    res.status(201).json({
      message: "User successfully created.",
    });
  } catch (err) {
    catchError(err, res, next);
  }
};

export const loginController = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    validateInput(req, res, next);
    const email = req.body.email;
    const password = req.body.password;
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error("Email doesn't exists.");
      res.status(401);
      throw error;
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      const error = new Error("Wrong password.");
      res.status(401);
      throw error;
    }
    const token = jwt.sign(
      {
        userId: user._id.toString(),
      },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({
      message: "Successfully logged in.",
      token,
      userId: user._id.toString(),
    });
  } catch (err) {
    catchError(err, res, next);
  }
};
