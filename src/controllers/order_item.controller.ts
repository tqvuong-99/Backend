import { NextFunction, Request, Response } from "express";
import order_itemsService from "../services/order_items.service";
import { sendJsonSuccess, httpStatus } from "../helpers/response.helper";
import mongoose from "mongoose";
// Controller:
// - Nhận đầu vào từ router
// - Nhận kết quả từ service tương ứng với đầu vào
// - Response kết quả cho client
// - Không nên xử lý nghiệp vụ ở controller
const getAll = async (req: Request, res: Response) => {
  const order_item = await order_itemsService.getAll();
  //res.status(200).json(order_item);
  sendJsonSuccess(res, order_item);
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const order_item = await order_itemsService.getById(new mongoose.Types.ObjectId(id));
    res.status(200).json({
      data: order_item,
    });
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

const updateById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await order_itemsService.updateById(
    new mongoose.Types.ObjectId(id),
    payload
  );
  res.status(200).json(result);
};

const deleteById = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const order_item = order_itemsService.deleteById(new mongoose.Types.ObjectId(id));
  sendJsonSuccess(res, null);
};

export default {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
