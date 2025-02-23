import {Request, Response, NextFunction} from 'express';
import createError from 'http-errors';
import order_itemsService from '../services/order_items.service';
const order_items = [
    { id: 1, name: 'order-items 1'},
    { id: 2, name: 'order-items 2'},
]

const getAll = (req: Request, res: Response) => {
    const order_items = order_itemsService.getAll();
    res.status(200).json(order_items);
}

const getById = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const order_item = order_itemsService.getById(Number(id));
    res.status(200).json(order_item);
}

const create = (req: Request, res: Response) => {
    const payload = req.body;
    const order_item = order_itemsService.create(payload);
    res.status(201).json(order_item);
}

const updateById = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const payload = req.body;
    const result = order_itemsService.updateById(Number(id), payload);
    res.status(200).json(result);
}

const deleteById = (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const order_item = order_itemsService.deleteById(Number(id));
    res.status(200).json(order_item);
}
export default {
    getAll, getById, create, updateById, deleteById
 
}