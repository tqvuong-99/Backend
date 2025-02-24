import createError from 'http-errors';
import productModel from '../models/product.model';
import { IProductCreate } from '../types/model';
import mongoose from "mongoose";
//Service
// - Nhận đầu vào từ ControllerController
//- Xử lý logic
//- Lấy dữ liệu return về controller
 
const getAll = async() => {
    const product = await productModel.find();
    return product;
}

const getById = async (id: mongoose.Types.ObjectId) => {
    const product = await productModel.findById(id);
        if (!product) 
        {
            throw createError(400, 'Product not found');
        }
        
        return product;
}

const create = async(payload: IProductCreate) => {
    // products.push(payload);
    const product = new productModel(payload);
    await product.save();
    // Trả về item vừa được tạo
    return product;
}
const updateById = async (id: mongoose.Types.ObjectId, payload: IProductCreate) => {
    const product = await productModel.findByIdAndUpdate(id);
    // console.log(product);
    if (!product) {
        throw createError(400, 'Product not found');
    }

    product.product_name = payload.product_name;
    product.description = payload.description;
    await product.save();
    return product;
}

const deleteById = async(id: mongoose.Types.ObjectId) => {
    try {        
        const product = await productModel.findById(id);
        if (!product) {
            throw createError(400, 'Product not found');
        }
        await product.deleteOne();
        return product;
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