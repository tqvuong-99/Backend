import createError from 'http-errors';
import { Request, Response } from 'express';
import productsService from '../services/products.service';
const products = [
    { id: 1, name: 'product 1' },
    { id: 2, name: 'product 2' },
     ];
// Controller:
 // - Nhận đầu vào từ router
 // - Nhận kết quả từ service tương ứng với đầu vào
 // - Response kết quả cho client
 // - Không nên xử lý nghiệp vụ ở controller
const getAll = (req: Request, res: Response) => {
    const product = productsService.getAll();
    res.status(200).json(product);
}

const getById = (req: Request, res: Response) => {
    const { id } = req.params;
    const product = productsService.getById(Number(id));
    res.status(200).json(product);
}

const create = (req: Request, res: Response) => {
    const payload = req.body;
        const product = productsService.create(payload);
    res.status(201).json(product);
}

const updateById = (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;
        const result = productsService.updateById(Number(id), payload);
    res.status(200).json(result);
}

const deleteById = (req: Request, res: Response) => {
    const { id } = req.params;
    const product = productsService.deleteById(Number(id));
    res.status(200).json(product);
}

export default {
    getAll, getById, create, updateById, deleteById
}