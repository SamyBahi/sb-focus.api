import express from "express";
import { check } from "express-validator";
import isAuth from "../middleware/is-auth";
import {
  deleteGroupController,
  getGroupsController,
  postGroupController,
  putGroupController,
} from "../controllers/group";

const router = express.Router();

router.post("/postGroup", isAuth, [
  check("title").trim().isString().isLength({ min: 1 }),
  postGroupController,
]);

router.get("/getGroups", isAuth, getGroupsController);

router.put(
  "/putGroup/:groupId",
  isAuth,
  [check("title").trim().isString().isLength({ min: 1 })],
  putGroupController
);

router.delete("/deleteGroup/:groupId", isAuth, deleteGroupController);

export default router;
