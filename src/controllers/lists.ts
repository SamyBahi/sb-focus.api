import express from "express";
import { catchError, validateInput } from "../utils/error";
import List from "../models/List";

export const postListController = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    validateInput(req, res, next);
    const title = req.body.title;
    const list = new List({
      title,
      userId: (<any>req).userId,
    });
    const result = await list.save();
    res.status(201).json({ message: "List successfully created", result });
  } catch (err) {
    catchError(err, res, next);
  }
};

export const getListsController = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const lists = await List.find({ userId: (<any>req).userId });
    res.status(200).json({ message: "Successfully fetched lists.", lists });
  } catch (err) {
    catchError(err, res, next);
  }
};

export const putListController = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    validateInput(req, res, next);
    const listId = req.params.listId;
    const list = await List.findById(listId);
    if (!list) {
      const error = new Error("List not found.");
      res.status(404);
      throw error;
    }
    if (list.userId.toString() !== (<any>req).userId.toString()) {
      const error = new Error("Unauthorized.");
      res.status(401);
      throw error;
    }
    list.title = req.body.title;
    const result = await list.save();
    res.status(200).json({ message: "Successfully updated list.", result });
  } catch (err) {
    catchError(err, res, next);
  }
};

export const deleteListController = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const listId = req.params.listId;
    const list = await List.findById(listId);
    if (!list) {
      const error = new Error("List not found.");
      res.status(404);
      throw error;
    }
    if (list.userId.toString() !== (<any>req).userId.toString()) {
      const error = new Error("Unauthorized.");
      res.status(401);
      throw error;
    }
    const result = await List.findByIdAndDelete(listId);
    res.status(200).json({ message: "Successfully deleted list.", result });
  } catch (err) {
    catchError(err, res, next);
  }
};
