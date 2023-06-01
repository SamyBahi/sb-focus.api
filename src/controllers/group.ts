import express from "express";
import { catchError, validateInput } from "../utils/error";
import Group from "../models/Group";

export const postGroupController = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    validateInput(req, res, next);
    const title = req.body.title;
    const group = new Group({
      title,
      userId: (<any>req).userId,
    });
    const result = await group.save();
    res.status(201).json({ message: "Group successfully created", result });
  } catch (err) {
    catchError(err, res, next);
  }
};

export const getGroupsController = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const groups = await Group.find({ userId: (<any>req).userId });
    res.status(200).json({ message: "Successfully fetched groups.", groups });
  } catch (err) {
    catchError(err, res, next);
  }
};

export const putGroupController = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    validateInput(req, res, next);
    const groupId = req.params.groupId;
    const group = await Group.findById(groupId);
    if (!group) {
      const error = new Error("Group not found.");
      res.status(404);
      throw error;
    }
    if (group.userId.toString() !== (<any>req).userId.toString()) {
      const error = new Error("Unauthorized.");
      res.status(401);
      throw error;
    }
    group.title = req.body.title;
    const result = await group.save();
    res.status(200).json({ message: "Successfully updated Group.", result });
  } catch (err) {
    catchError(err, res, next);
  }
};

export const deleteGroupController = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const groupId = req.params.groupId;
    const group = await Group.findById(groupId);
    if (!group) {
      const error = new Error("Group not found.");
      res.status(404);
      throw error;
    }
    if (group.userId.toString() !== (<any>req).userId.toString()) {
      const error = new Error("Unauthorized.");
      res.status(401);
      throw error;
    }
    const result = await Group.findByIdAndDelete(groupId);
    res.status(200).json({ message: "Successfully deleted group.", result });
  } catch (err) {
    catchError(err, res, next);
  }
};
