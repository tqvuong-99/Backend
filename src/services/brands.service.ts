import createError from 'http-errors';
import brandModel from '../models/brand.model';
import { IBrandCreate } from '../types/model';
import mongoose from "mongoose";
//Service
// - Nhận đầu vào từ ControllerController
//- Xử lý logic
//- Lấy dữ liệu return về controller
 
const getAll = async() => {
    const brand = await brandModel.find();
    return brand;
}

const getById = async (id: mongoose.Types.ObjectId) => {
    const brand = await brandModel.findById(id);
        if (!brand) 
        {
            throw createError(400, 'Brand not found');
        }
        
        return brand;
}

const create = async(payload: IBrandCreate) => {
    // brands.push(payload);
    const brand = new brandModel(payload);
    await brand.save();
    // Trả về item vừa được tạo
    return brand;
}
const updateById = async (id: mongoose.Types.ObjectId, payload: IBrandCreate) => {
    const brand = await brandModel.findByIdAndUpdate(id);
    // console.log(brand);
    if (!brand) {
        throw createError(400, 'Brand not found');
    }

    brand.brand_name = payload.brand_name;
    brand.description = payload.description;
    await brand.save();
    return brand;
}

const deleteById = async(id: mongoose.Types.ObjectId) => {
    try {        
        const brand = await brandModel.findById(id);
        if (!brand) {
            throw createError(400, 'Brand not found');
        }
        await brand.deleteOne();
        return brand;
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