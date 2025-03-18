import createError from 'http-errors';
import orderModel from '../models/orders.model';
import { IOrderCreate } from '../types/model';
import mongoose from "mongoose";
//Service
// - Nhận đầu vào từ ControllerController
//- Xử lý logic
//- Lấy dữ liệu return về controller
 
const getAll = async (query: any) => {
    //Lấy ra các tham số truyền vào
    //page = query.page, nếu page không tồn tại thì mặc định là 1
  const { page = 1, limit = 10, sort_type = 'desc', sort_by='createdAt' } = query;

  //Nếu tồn tại sortType và sortBy thì sẽ sắp xếp theo sortType và sortBy
    //Nếu không tồn tại thì sẽ sắp xếp theo createdAt
    let sortObject = {};
    sortObject = { ...sortObject, [sort_by]: sort_type === 'desc' ? -1 : 1 };

    console.log('<<=== 🚀sortObject  ===>>',sortObject);

    // //Tìm kiếm theo điều kiện
    let where = {};
    // //Nếu có tìm kiếm theo tên sản phẩm
    // if (query.order_item_name && query.order_item_name.length > 0) {
    //     where = { ...where, order_item_name: { $regex: query.order_item_name, $options: 'i' } };
    // }
    // //Nếu tìm kiếm theo danh mục
    // if (query.category && query.category.length > 0) {
    //     where = { ...where, category: query.category };
    // }
    // //Nếu tìm kiếm theo thương hiệu
    // if (query.order_item_id && query.order_item_id.length > 0) {
    //     where = { ...where, order_item_id: query.order_item_id };
    // }

    //Thêm các điều kiện khác nếu cần

  const orders = await orderModel
  .find(where)
  .skip((page - 1) * limit)
  .limit(limit)
  .sort({...sortObject});
  //Đếm tổng số record hiện có của collection Product
const count = await orderModel.countDocuments(where);

return {
    orders,
  panigation:{
    totalRecord: count,
    page: +page,
    limit: +limit
  }
}};
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