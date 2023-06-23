import express from "express";
import isAuth from "../middleware/is-auth";
import { check } from "express-validator";

import {
  deleteTaskController,
  getAllTasksController,
  getTaskController,
  postTaskController,
  putTaskCompletedController,
  putTaskDueDateController,
  putTaskImportantController,
  putTaskIndexListController,
  putTaskIndexMyDayController,
  putTaskListController,
  putTaskMyDayController,
  putTaskNoteController,
  putTaskStepsController,
  putTaskTitleController,
} from "../controllers/tasks";

const router = express.Router();

router.post(
  "/postTask",
  [
    check("title").trim().isString().isLength({ min: 1 }),
    check("dueDate").optional().isDate(),
    check("myDay").isBoolean().optional(),
    check("list").trim().isString().optional(),
  ],
  isAuth,
  postTaskController
);

router.get("/getAllTasks", isAuth, getAllTasksController);

router.get("/getTask/:taskId", isAuth, getTaskController);

router.put(
  "/putTaskTitle/:taskId",
  isAuth,
  [check("title").trim().isString().isLength({ min: 1 })],
  putTaskTitleController
);

router.put(
  "/putTaskDueDate/:taskId",
  isAuth,
  [check("dueDate").optional({ nullable: true }).isDate()],
  putTaskDueDateController
);

router.put(
  "/putTaskMyDay/:taskId",
  isAuth,
  [check("myDay").isBoolean()],
  putTaskMyDayController
);

router.put(
  "/putTaskImportant/:taskId",
  isAuth,
  [check("important").isBoolean()],
  putTaskImportantController
);

router.put(
  "/putTaskCompleted/:taskId",
  isAuth,
  [check("completed").isBoolean()],
  putTaskCompletedController
);

router.put(
  "/putTaskSteps/:taskId",
  isAuth,
  [check("steps").isArray()],
  putTaskStepsController
);

router.put(
  "/putTaskIndexMyDay/:taskId",
  isAuth,
  [check("index").isNumeric()],
  putTaskIndexMyDayController
);

router.put(
  "/putTaskIndexList/:taskId",
  isAuth,
  [check("index").isNumeric()],
  putTaskIndexListController
);

router.put(
  "/putTaskNote/:taskId",
  isAuth,
  [check("note").trim().isString()],
  putTaskNoteController
);

router.put(
  "/putTaskList/:taskId",
  isAuth,
  [check("List").trim().isString()],
  putTaskListController
);

router.delete("/deleteTask/:taskId", isAuth, deleteTaskController);

export default router;
