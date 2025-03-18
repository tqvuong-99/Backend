import { NextFunction, Request, Response } from "express";
import order_itemsService from "../services/order_items.service";
import { sendJsonSuccess, httpStatus } from "../helpers/response.helper";
import mongoose from "mongoose";

const getAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const order_item = await order_itemsService.getAll(req.query);
    sendJsonSuccess(res, order_item);
  } catch (error) {
    next(error);
  }
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const order_item = await order_itemsService.getById(
      new mongoose.Types.ObjectId(id)
    );
    sendJsonSuccess(res, order_item);
  } catch (error) {
    next(error);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body;
    const order_item = await order_itemsService.create(payload);
    sendJsonSuccess(
      res,
      order_item,
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
    const order_item = await order_itemsService.updateById(
      new mongoose.Types.ObjectId(id),
      payload
    );
    sendJsonSuccess(
      res,
      order_item,
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
  const order_item = await order_itemsService.deleteById(new mongoose.Types.ObjectId(id));
  sendJsonSuccess(
    res,
    order_item,
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
