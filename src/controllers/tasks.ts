import express from "express";
import { catchError, validateInput } from "../utils/error";
import Task from "../models/Task";
import mongoose from "mongoose";

export const postTaskController = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    validateInput(req, res, next);
    const title = req.body.title;
    const dueDate = req.body.dueDate;
    const myDay = req.body.myDay;
    const listId = req.body.listId;
    const important = req.body.important;
    const task = new Task({
      title,
      myDay: myDay ? myDay : false,
      ...(listId && { listId }),
      important: important ? important : false,
      completed: false,
      index: {
        ...(myDay && { myDay: 1 }),
        list: 1,
      },
      userId: (<any>req).userId,
      ...(dueDate && { dueDate }),
    });
    await task.save();
    res.status(201).json({ message: "Successfully added task", task });
  } catch (err) {
    catchError(err, res, next);
  }
};

export const getAllTasksController = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const tasks = await Task.find({
      userId: (<any>req).userId,
    });
    res
      .status(200)
      .json({ message: "Successfully fetched myday tasks.", tasks });
  } catch (err) {
    catchError(err, res, next);
  }
};

export const getTaskController = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const taskId = req.params.taskId;
    const task = await Task.findById(taskId);
    if (!task) {
      const error = new Error("Task not found.");
      res.status(404);
      throw error;
    }
    res.status(200).json({ message: "Successfully fetched task", task });
  } catch (err) {
    catchError(err, res, next);
  }
};

export const putTaskTitleController = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    validateInput(req, res, next);
    const taskId = req.params.taskId;
    const task = await Task.findById(taskId);
    if (!task) {
      const error = new Error("Task not found.");
      res.status(404);
      throw error;
    }
    if (task.userId.toString() !== (<any>req).userId.toString()) {
      const error = new Error("Unauthorized.");
      res.status(401);
      throw error;
    }
    task.title = req.body.title;
    const result = await task.save();
    res
      .status(200)
      .json({ message: "Task title successfully updated.", result });
  } catch (err) {
    catchError(err, res, next);
  }
};

export const putTaskMyDayController = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    validateInput(req, res, next);
    const taskId = req.params.taskId;
    const task = await Task.findById(taskId);
    if (!task) {
      const error = new Error("Task not found.");
      res.status(404);
      throw error;
    }
    if (task.userId.toString() !== (<any>req).userId.toString()) {
      const error = new Error("Unauthorized.");
      res.status(401);
      throw error;
    }
    task.myDay = req.body.myDay;
    const result = await task.save();
    res
      .status(200)
      .json({ message: "Task myDay successfully updated.", result });
  } catch (err) {
    catchError(err, res, next);
  }
};

export const putTaskDueDateController = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    validateInput(req, res, next);
    const taskId = req.params.taskId;
    const task = await Task.findById(taskId);
    if (!task) {
      const error = new Error("Task not found.");
      res.status(404);
      throw error;
    }
    if (task.userId.toString() !== (<any>req).userId.toString()) {
      const error = new Error("Unauthorized.");
      res.status(401);
      throw error;
    }
    task.dueDate = req.body.dueDate;
    const result = await task.save();
    res
      .status(200)
      .json({ message: "Task dueDate successfully updated.", result });
  } catch (err) {
    catchError(err, res, next);
  }
};

export const putTaskImportantController = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    validateInput(req, res, next);
    const taskId = req.params.taskId;
    const task = await Task.findById(taskId);
    if (!task) {
      const error = new Error("Task not found.");
      res.status(404);
      throw error;
    }
    if (task.userId.toString() !== (<any>req).userId.toString()) {
      const error = new Error("Unauthorized.");
      res.status(401);
      throw error;
    }
    task.important = req.body.important;
    const result = await task.save();
    res
      .status(200)
      .json({ message: "Task important successfully updated.", result });
  } catch (err) {
    catchError(err, res, next);
  }
};

export const putTaskCompletedController = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    validateInput(req, res, next);
    const taskId = req.params.taskId;
    const task = await Task.findById(taskId);
    if (!task) {
      const error = new Error("Task not found.");
      res.status(404);
      throw error;
    }
    if (task.userId.toString() !== (<any>req).userId.toString()) {
      const error = new Error("Unauthorized.");
      res.status(401);
      throw error;
    }
    task.completed = req.body.completed;
    const result = await task.save();
    res
      .status(200)
      .json({ message: "Task completed successfully updated.", result });
  } catch (err) {
    catchError(err, res, next);
  }
};

export const putTaskStepsController = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    validateInput(req, res, next);
    const taskId = req.params.taskId;
    const task = await Task.findById(taskId);
    if (!task) {
      const error = new Error("Task not found.");
      res.status(404);
      throw error;
    }
    if (task.userId.toString() !== (<any>req).userId.toString()) {
      const error = new Error("Unauthorized.");
      res.status(401);
      throw error;
    }
    task.steps = req.body.steps;
    const result = await task.save();
    res
      .status(200)
      .json({ message: "Task steps successfully updated.", result });
  } catch (err) {
    catchError(err, res, next);
  }
};

export const putTaskListController = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    validateInput(req, res, next);
    const taskId = req.params.taskId;
    const task = await Task.findById(taskId);
    if (!task) {
      const error = new Error("Task not found.");
      res.status(404);
      throw error;
    }
    if (task.userId.toString() !== (<any>req).userId.toString()) {
      const error = new Error("Unauthorized.");
      res.status(401);
      throw error;
    }
    task.listId = req.body.listId;
    const result = await task.save();
    res
      .status(200)
      .json({ message: "Task listId successfully updated.", result });
  } catch (err) {
    catchError(err, res, next);
  }
};

export const putTaskIndexMyDayController = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    validateInput(req, res, next);
    const taskId = req.params.taskId;
    const task = await Task.findById(taskId);
    if (!task) {
      const error = new Error("Task not found.");
      res.status(404);
      throw error;
    }
    if (task.userId.toString() !== (<any>req).userId.toString()) {
      const error = new Error("Unauthorized.");
      res.status(401);
      throw error;
    }
    task.index.myDay = req.body.index;
    const result = await task.save();
    res
      .status(200)
      .json({ message: "Task index successfully updated.", result });
  } catch (err) {
    catchError(err, res, next);
  }
};

export const putTaskIndexListController = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    validateInput(req, res, next);
    const taskId = req.params.taskId;
    const task = await Task.findById(taskId);
    if (!task) {
      const error = new Error("Task not found.");
      res.status(404);
      throw error;
    }
    if (task.userId.toString() !== (<any>req).userId.toString()) {
      const error = new Error("Unauthorized.");
      res.status(401);
      throw error;
    }
    task.index.list = req.body.index;
    const result = await task.save();
    res
      .status(200)
      .json({ message: "Task index successfully updated.", result });
  } catch (err) {
    catchError(err, res, next);
  }
};

export const putTaskNoteController = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    validateInput(req, res, next);
    const taskId = req.params.taskId;
    const task = await Task.findById(taskId);
    if (!task) {
      const error = new Error("Task not found.");
      res.status(404);
      throw error;
    }
    if (task.userId.toString() !== (<any>req).userId.toString()) {
      const error = new Error("Unauthorized.");
      res.status(401);
      throw error;
    }
    task.note = req.body.note;
    const result = await task.save();
    res
      .status(200)
      .json({ message: "Task note successfully updated.", result });
  } catch (err) {
    catchError(err, res, next);
  }
};

export const deleteTaskController = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const taskId = req.params.taskId;
    const task = await Task.findById(taskId);
    if (!task) {
      const error = new Error("Task not found.");
      res.status(404);
      throw error;
    }
    if (task.userId.toString() !== (<any>req).userId.toString()) {
      const error = new Error("Unauthorized.");
      res.status(401);
      throw error;
    }
    const result = await Task.findByIdAndDelete(taskId);
    res.status(200).json({ message: "Task successfully deleted.", result });
  } catch (err) {
    catchError(err, res, next);
  }
};
