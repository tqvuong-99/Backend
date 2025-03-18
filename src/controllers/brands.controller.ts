import { NextFunction, Request, Response } from "express";
import brandsService from "../services/brands.service";
import { sendJsonSuccess, httpStatus } from "../helpers/response.helper";
import mongoose from "mongoose";

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const brand = await brandsService.getAll(req.query);
    sendJsonSuccess(res, brand);
  } catch (error) {
    next(error);
  }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const brand = await brandsService.getById(
      new mongoose.Types.ObjectId(id)
    );
    sendJsonSuccess(res, brand);
  } catch (error) {
    next(error);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body;
    const brand = await brandsService.create(payload);
    sendJsonSuccess(
      res,
      brand,
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
    const brand = await brandsService.updateById(
      new mongoose.Types.ObjectId(id),
      payload
    );
    sendJsonSuccess(
      res,
      brand,
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
  const brand = await brandsService.deleteById(new mongoose.Types.ObjectId(id));
  sendJsonSuccess(
    res,
    brand,
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
