import createError from 'http-errors';
import productModel from '../models/product.model';
import { IProductCreate } from '../types/model';
import mongoose from "mongoose";
//Service
// - Nhận đầu vào từ ControllerController
//- Xử lý logic
//- Lấy dữ liệu return về controller
 
const getAll = async() => {
    const products = await productModel.find();
    return products;
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
    //Kiểm tra xem có tồn tại sản phẩm có tên giống nhau không 
    const productExist = await productModel.findOne({product_name: payload.product_name});
    if (productExist) {
        throw createError(400, 'Product already exists');
    }
    const product = new productModel(payload);
    await product.save();
    // Trả về item vừa được tạo
    return product;
}
const updateById = async (id: mongoose.Types.ObjectId, payload: IProductCreate) => {
    //Kiểm tra xem có tồn tại sản phẩm có id này không 
    const product = await getById(id);
    // Kiểm tra có tên giống nhau không
    const productExist = await productModel.findOne({product_name: payload.product_name});
    if (productExist && productExist._id.toString() !== id.toString()) {
        throw createError(400, 'Product name already exists');
    }
    // Cập nhật lại tên sản phẩm 
    Object.assign(product, payload); //trộn dữ liệu cũ và mới
    await product.save(); //lưu lại vào db
    return product;
}

const deleteById = async(id: mongoose.Types.ObjectId) => {     
        const product = await getById(id);
        if (!product) {
            throw createError(400, 'Product not found');
        }
        await product.deleteOne({_id:product._id});
        return product;
}
export default  {
    getAll,
    getById,
    create, 
    updateById, 
    deleteById
}