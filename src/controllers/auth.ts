import express, { NextFunction } from "express";
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
    const { email, name, password } = req.body;
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
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      const error = new Error("Invalid email or password.");
      res.status(401);
      throw error;
    }
    const token = jwt.sign(
      {
        userId: user._id.toString(),
      },
      JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      message: "Successfully logged in.",
      user: {
        _id: user._id.toString(),
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    catchError(err, res, next);
  }
};

export const logoutController = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: "User logged out" });
};
