import createError from 'http-errors';
import orderModel from '../models/orders.model';
import { IOrderCreate } from '../types/model';
import mongoose from "mongoose";
//Service
// - Nhận đầu vào từ ControllerController
//- Xử lý logic
//- Lấy dữ liệu return về controller
 
const getAll = async() => {
    const order = await orderModel.find();
    return order;
}

const getById = async (id: mongoose.Types.ObjectId) => {
    const order = await orderModel.findById(id);
        if (!order) 
        {
            throw createError(400, 'Order not found');
        }
        
        return order;
}

const create = async(payload: IOrderCreate) => {
    // orders.push(payload);
    const order = new orderModel(payload);
    await order.save();
    // Trả về item vừa được tạo
    return order;
}
const updateById = async (id: mongoose.Types.ObjectId, payload: IOrderCreate) => {
    const order = await orderModel.findByIdAndUpdate(id);
    // console.log(order);
    if (!order) {
        throw createError(400, 'Order not found');
    }

    order.order_item_id = payload.order_item_id;
    await order.save();
    return order;
}

const deleteById = async(id: mongoose.Types.ObjectId) => {
    try {        
        const order = await orderModel.findById(id);
        if (!order) {
            throw createError(400, 'Order not found');
        }
        await order.deleteOne();
        return order;
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