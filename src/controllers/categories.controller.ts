import { NextFunction, Request, Response } from "express";
import categoriesService from "../services/categories.service";
import { sendJsonSuccess, httpStatus } from "../helpers/response.helper";
import mongoose from "mongoose";

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = await categoriesService.getAll(req.query);
    sendJsonSuccess(res, category);
  } catch (error) {
    next(error);
  }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const category = await categoriesService.getById(
      new mongoose.Types.ObjectId(id)
    );
    sendJsonSuccess(res, category);
  } catch (error) {
    next(error);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body;
    const category = await categoriesService.create(payload);
    sendJsonSuccess(
      res,
      category,
      httpStatus.CREATED.statusCode,
      httpStatus.CREATED.message
    );
  } catch (error) {
    next(error);
  }
};

const updateById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const category = await categoriesService.updateById(
      new mongoose.Types.ObjectId(id),
      payload
    );
    sendJsonSuccess(
      res,
      category,
      httpStatus.CREATED.statusCode,
      httpStatus.CREATED.message
    );
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
  const { id } = req.params;
  const category = await categoriesService.deleteById(new mongoose.Types.ObjectId(id));
  sendJsonSuccess(
    res,
    category,
    httpStatus.CREATED.statusCode,
    httpStatus.CREATED.message
  );
} catch (error) {
  next(error);
}
};

export default {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
