import createError from 'http-errors';
import staffModel from '../models/staff.model';
import { IStaffCreate } from '../types/model';
import mongoose from "mongoose";
//Service
// - Nhận đầu vào từ ControllerController
//- Xử lý logic
//- Lấy dữ liệu return về controller
 
const getAll = async() => {
    const staff = await staffModel.find();
    return staff;
}

const getById = async (id: mongoose.Types.ObjectId) => {
    const staff = await staffModel.findById(id);
        if (!staff) 
        {
            throw createError(400, 'Staff not found');
        }
        
        return staff;
}

const create = async(payload: IStaffCreate) => {
    // staffs.push(payload);
    const staff = new staffModel(payload);
    await staff.save();
    // Trả về item vừa được tạo
    return staff;
}
const updateById = async (id: mongoose.Types.ObjectId, payload: IStaffCreate) => {
    const staff = await staffModel.findByIdAndUpdate(id);
    // console.log(staff);
    if (!staff) {
        throw createError(400, 'Staff not found');
    }

    staff.staff_name = payload.staff_name;
    staff.description = payload.description;
    await staff.save();
    return staff;
}

const deleteById = async(id: mongoose.Types.ObjectId) => {
    try {        
        const staff = await staffModel.findById(id);
        if (!staff) {
            throw createError(400, 'Staff not found');
        }
        await staff.deleteOne();
        return staff;
    } catch (error) {
        console.log(error);
    }
}
export default  {
    getAll,
    getById,
    create, 
    updateById, 
    deleteById
}