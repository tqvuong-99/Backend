import createError from 'http-errors';
import { NextFunction, Request, Response } from 'express';
import brandsService from '../services/brands.service';
import { sendJsonSuccess, httpStatus } from '../helpers/response.helper';
// Controller:
 // - Nhận đầu vào từ router
 // - Nhận kết quả từ service tương ứng với đầu vào
 // - Response kết quả cho client
 // - Không nên xử lý nghiệp vụ ở controller
const getAll = async(req: Request, res: Response) => {
    const brand = await brandsService.getAll();
    //res.status(200).json(brand);
    sendJsonSuccess(res, brand)
}

const getById = (req: Request, res: Response) => {
    const { id } = req.params;
    const brand = brandsService.getById(Number(id));
    res.status(200).json(brand);
}

const create = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const payload = req.body;
        const brand = await brandsService.create(payload);
        sendJsonSuccess(res, brand, httpStatus.CREATED.statusCode,httpStatus.CREATED.message);
    } catch (error) {
        next(error);
}};

const updateById = (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;
        const result = brandsService.updateById(Number(id), payload);
    res.status(200).json(result);
}

const deleteById = (req: Request, res: Response) => {
    const { id } = req.params;
    const brand = brandsService.deleteById(Number(id));
    res.status(200).json(brand);
}

export default {
    getAll, getById, create, updateById, deleteById
}