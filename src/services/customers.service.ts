import createError from 'http-errors';
import customerModel from '../models/customer.model';
import { ICustomerCreate } from '../types/model';
import mongoose from "mongoose";
//Service
// - Nhận đầu vào từ ControllerController
//- Xử lý logic
//- Lấy dữ liệu return về controller
 
const getAll = async() => {
    const customer = await customerModel.find();
    return customer;
}

const getById = async (id: mongoose.Types.ObjectId) => {
    const customer = await customerModel.findById(id);
        if (!customer) 
        {
            throw createError(400, 'Customer not found');
        }
        
        return customer;
}

const create = async(payload: ICustomerCreate) => {
    // customers.push(payload);
    const customer = new customerModel(payload);
    await customer.save();
    // Trả về item vừa được tạo
    return customer;
}
const updateById = async (id: mongoose.Types.ObjectId, payload: ICustomerCreate) => {
    const customer = await customerModel.findByIdAndUpdate(id);
    // console.log(customer);
    if (!customer) {
        throw createError(400, 'Customer not found');
    }

    customer.customer_name = payload.customer_name;
    customer.description = payload.description;
    await customer.save();
    return customer;
}

const deleteById = async(id: mongoose.Types.ObjectId) => {
    try {        
        const customer = await customerModel.findById(id);
        if (!customer) {
            throw createError(400, 'Customer not found');
        }
        await customer.deleteOne();
        return customer;
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