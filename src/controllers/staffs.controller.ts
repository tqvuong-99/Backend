import { NextFunction, Request, Response } from "express";
import staffsService from "../services/staffs.service";
import { sendJsonSuccess, httpStatus } from "../helpers/response.helper";
import mongoose from "mongoose";
// Controller:
// - Nhận đầu vào từ router
// - Nhận kết quả từ service tương ứng với đầu vào
// - Response kết quả cho client
// - Không nên xử lý nghiệp vụ ở controller
const getAll = async (req: Request, res: Response) => {
  const staff = await staffsService.getAll();
  //res.status(200).json(staff);
  sendJsonSuccess(res, staff);
};

const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const staff = await staffsService.getById(new mongoose.Types.ObjectId(id));
    res.status(200).json({
      data: staff,
    });
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

const updateById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const payload = req.body;
  const result = await staffsService.updateById(
    new mongoose.Types.ObjectId(id),
    payload
  );
  res.status(200).json(result);
};

const deleteById = (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const staff = staffsService.deleteById(new mongoose.Types.ObjectId(id));
  sendJsonSuccess(res, null);
};

export default {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
