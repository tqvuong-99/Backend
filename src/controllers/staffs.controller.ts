import { NextFunction, Request, Response } from "express";
import staffsService from "../services/staffs.service";
import { sendJsonSuccess, httpStatus } from "../helpers/response.helper";
import mongoose from "mongoose";

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const staff = await staffsService.getAll(req.query);
    sendJsonSuccess(res, staff);
  } catch (error) {
    next(error);
  }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const staff = await staffsService.getById(
      new mongoose.Types.ObjectId(id)
    );
    sendJsonSuccess(res, staff);
  } catch (error) {
    next(error);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body;
    const staff = await staffsService.create(payload);
    sendJsonSuccess(
      res,
      staff,
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
    const staff = await staffsService.updateById(
      new mongoose.Types.ObjectId(id),
      payload
    );
    sendJsonSuccess(
      res,
      staff,
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
  const staff = await staffsService.deleteById(new mongoose.Types.ObjectId(id));
  sendJsonSuccess(
    res,
    staff,
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
