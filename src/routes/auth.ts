import express from "express";
import { check } from "express-validator";
import User from "../models/User";
import { loginController, signupController } from "../controllers/auth";

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
      .normalizeEmail(),
    check("name").trim().notEmpty().isAlphanumeric(),
    check("password").trim().notEmpty().isString().isLength({ min: 6 }),
  ],
  signupController
);

router.post("/login", [check("email").trim().isEmail()], loginController);

export default router;
