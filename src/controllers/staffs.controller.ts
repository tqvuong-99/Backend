import createError from 'http-errors';
import { Request, Response } from 'express';
import staffsService from '../services/staffs.service';
const staffs = [
    { id: 1, name: 'staff 1' },
    { id: 2, name: 'staff 2' },
     ];
// Controller:
 // - Nhận đầu vào từ router
 // - Nhận kết quả từ service tương ứng với đầu vào
 // - Response kết quả cho client
 // - Không nên xử lý nghiệp vụ ở controller
const getAll = (req: Request, res: Response) => {
    const staff = staffsService.getAll();
    res.status(200).json(staff);
}

const getById = (req: Request, res: Response) => {
    const { id } = req.params;
    const staff = staffsService.getById(Number(id));
    res.status(200).json(staff);
}

const create = (req: Request, res: Response) => {
    const payload = req.body;
        const staff = staffsService.create(payload);
    res.status(201).json(staff);
}

const updateById = (req: Request, res: Response) => {
    const { id } = req.params;
    const payload = req.body;
        const result = staffsService.updateById(Number(id), payload);
    res.status(200).json(result);
}

const deleteById = (req: Request, res: Response) => {
    const { id } = req.params;
    const staff = staffsService.deleteById(Number(id));
    res.status(200).json(staff);
}

export default {
    getAll, getById, create, updateById, deleteById
}