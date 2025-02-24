import { NextFunction, Request, Response } from "express";
import categorysService from "../services/categories.service";
import { sendJsonSuccess, httpStatus } from "../helpers/response.helper";
import mongoose from "mongoose";
// Controller:
// - Nhận đầu vào từ router
// - Nhận kết quả từ service tương ứng với đầu vào
// - Response kết quả cho client
// - Không nên xử lý nghiệp vụ ở controller
const getAll = async (req: Request, res: Response) => {
  const category = await categorysService.getAll();
  //res.status(200).json(category);
  sendJsonSuccess(res, category);
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const category = await categorysService.getById(new mongoose.Types.ObjectId(id));
    res.status(200).json({
      data: category,
    });
  } catch (error) {
    next(error);
  }
};

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = req.body;
    const category = await categorysService.create(payload);
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

const updateById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await categorysService.updateById(
    new mongoose.Types.ObjectId(id),
    payload
  );
  res.status(200).json(result);
};

const deleteById = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const category = categorysService.deleteById(new mongoose.Types.ObjectId(id));
  sendJsonSuccess(res, null);
};

export default {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
