import express from "express";
import { check } from "express-validator";
import isAuth from "../middleware/is-auth";
import {
  deleteListController,
  getListsController,
  postListController,
  putListController,
} from "../controllers/lists";

const router = express.Router();

router.post(
  "/postList",
  isAuth,
  [check("title").trim().isString().isLength({ min: 1 })],
  postListController
);

router.get("/getLists", isAuth, getListsController);

router.put(
  "/putList/:listId",
  isAuth,
  [check("title").trim().isString().isLength({ min: 1 })],
  putListController
);

router.delete("/deleteList/:listId", isAuth, deleteListController);

export default router;
