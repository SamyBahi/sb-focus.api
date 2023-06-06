import express from "express";
import { check } from "express-validator";
import User from "../models/User";
import {
  loginController,
  logoutController,
  signupController,
} from "../controllers/auth";
import isAuth from "../middleware/is-auth";

const router = express.Router();

router.post(
  "/signup",
  [
    check("email")
      .trim()
      .isEmail()
      .custom(async (value: any, { req: any }) => {
        const userDoc = await User.findOne({ email: value });
        if (userDoc) {
          return Promise.reject("E-mail already used.");
        }
      })
      .withMessage("Please enter a valid E-mail.")
      .normalizeEmail(),

    check("name").trim().notEmpty().isAlphanumeric(),
    check("password").trim().notEmpty().isString().isLength({ min: 6 }),
  ],
  signupController
);

router.post(
  "/login",
  [check("email").trim().isEmail().withMessage("Please enter a valid E-mail.")],
  loginController
);

router.post("/logout", isAuth, logoutController);

export default router;
