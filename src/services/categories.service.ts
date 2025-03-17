import createError from 'http-errors';
import categoryModel from '../models/category.model';
import { ICategoryCreate } from '../types/model';
import mongoose from "mongoose";
//Service
// - Nhận đầu vào từ ControllerController
//- Xử lý logic
//- Lấy dữ liệu return về controller
 
const getAll = async() => {
    const category = await categoryModel.find();
    return category;
}

const getById = async (id: mongoose.Types.ObjectId) => {
    const category = await categoryModel.findById(id);
        if (!category) 
        {
            throw createError(400, 'Category not found');
        }
        
        return category;
}

const create = async(payload: ICategoryCreate) => {
    // categorys.push(payload);
    const category = new categoryModel(payload);
    await category.save();
    // Trả về item vừa được tạo
    return category;
}
const updateById = async (id: mongoose.Types.ObjectId, payload: ICategoryCreate) => {
    const category = await categoryModel.findByIdAndUpdate(id);
    // console.log(category);
    if (!category) {
        throw createError(400, 'Category not found');
    }

    category.category_name = payload.category_name;
    category.description = payload.description;
    await category.save();
    return category;
}

const deleteById = async(id: mongoose.Types.ObjectId) => {
    try {        
        const category = await categoryModel.findById(id);
        if (!category) {
            throw createError(400, 'Category not found');
        }
        await category.deleteOne();
        return category;
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