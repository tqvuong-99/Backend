import { Request, Response } from 'express';
import categoriesService from '../services/categories.service';
import { sendJsonSuccess } from '../helpers/response.helper';
import { Types } from 'mongoose';

const getAll = async (req: Request, res: Response) => {
    const category =  await categoriesService.getAll();
    //res.status(200).json(category);
    sendJsonSuccess(res, category)
};

const getById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const category = await categoriesService.getById(id);
    res.status(200).json(category);
}
 
const create = (req: Request, res: Response) => {
    const payload = req.body;
    const category = categoriesService.create(payload);
    res.status(201).json(category);
}

const updateById = (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;
    const result = categoriesService.updateById(Number(id), payload);
    res.status(200).json(result);
}

const deleteById = (req: Request, res: Response) => {
    const { id } = req.params;
    const category = categoriesService.deleteById(Number(id));
    res.status(200).json(category);
}
export default {
    getAll, 
    getById, 
    create, 
    updateById, 
    deleteById
 }