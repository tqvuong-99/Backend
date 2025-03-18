import { NextFunction, Request, Response } from "express";
import customersService from "../services/customers.service";
import { sendJsonSuccess, httpStatus } from "../helpers/response.helper";
import mongoose from "mongoose";

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customer = await customersService.getAll(req.query);
    sendJsonSuccess(res, customer);
  } catch (error) {
    next(error);
  }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const customer = await customersService.getById(
      new mongoose.Types.ObjectId(id)
    );
    sendJsonSuccess(res, customer);
  } catch (error) {
    next(error);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body;
    const customer = await customersService.create(payload);
    sendJsonSuccess(
      res,
      customer,
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
    const customer = await customersService.updateById(
      new mongoose.Types.ObjectId(id),
      payload
    );
    sendJsonSuccess(
      res,
      customer,
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
  const customer = await customersService.deleteById(new mongoose.Types.ObjectId(id));
  sendJsonSuccess(
    res,
    customer,
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
