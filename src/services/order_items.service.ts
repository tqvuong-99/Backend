import createError from 'http-errors';
import order_itemModel from '../models/order_item.model';
import { IOrder_itemCreate } from '../types/model';
import mongoose from "mongoose";
//Service
// - Nhận đầu vào từ ControllerController
//- Xử lý logic
//- Lấy dữ liệu return về controller
 
const getAll = async() => {
    const order_item = await order_itemModel.find();
    return order_item;
}

const getById = async (id: mongoose.Types.ObjectId) => {
    const order_item = await order_itemModel.findById(id);
        if (!order_item) 
        {
            throw createError(400, 'Order_item not found');
        }
        
        return order_item;
}

const create = async(payload: IOrder_itemCreate) => {
    // order_items.push(payload);
    const order_item = new order_itemModel(payload);
    await order_item.save();
    // Trả về item vừa được tạo
    return order_item;
}
const updateById = async (id: mongoose.Types.ObjectId, payload: IOrder_itemCreate) => {
    const order_item = await order_itemModel.findByIdAndUpdate(id);
    // console.log(order_item);
    if (!order_item) {
        throw createError(400, 'Order_item not found');
    }

    order_item.order_item_name = payload.order_item_name;
    order_item.description = payload.description;
    await order_item.save();
    return order_item;
}

const deleteById = async(id: mongoose.Types.ObjectId) => {
    try {        
        const order_item = await order_itemModel.findById(id);
        if (!order_item) {
            throw createError(400, 'Order_item not found');
        }
        await order_item.deleteOne();
        return order_item;
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