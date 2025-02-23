import createError from 'http-errors';
import { Request, Response } from 'express';
import customersService from '../services/customers.service';
const customers = [
    { id: 1, name: 'customer 1' },
    { id: 2, name: 'customer 2' },
     ];
// Controller:
 // - Nhận đầu vào từ router
 // - Nhận kết quả từ service tương ứng với đầu vào
 // - Response kết quả cho client
 // - Không nên xử lý nghiệp vụ ở controller
const getAll = (req: Request, res: Response) => {
    const customer = customersService.getAll();
    res.status(200).json(customer);
}

const getById = (req: Request, res: Response) => {
    const { id } = req.params;
    const customer = customersService.getById(Number(id));
    res.status(200).json(customer);
}

const create = (req: Request, res: Response) => {
    const payload = req.body;
        const customer = customersService.create(payload);
    res.status(201).json(customer);
}

const updateById = (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;
        const result = customersService.updateById(Number(id), payload);
    res.status(200).json(result);
}

const deleteById = (req: Request, res: Response) => {
    const { id } = req.params;
    const customer = customersService.deleteById(Number(id));
    res.status(200).json(customer);
}

export default {
    getAll, getById, create, updateById, deleteById
}