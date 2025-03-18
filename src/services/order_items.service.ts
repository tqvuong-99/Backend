import createError from "http-errors";
import order_itemModel from "../models/order_item.model";
import { IOrder_itemCreate } from "../types/model";
import mongoose from "mongoose";

const getAll = async (query: any) => {
    //Lấy ra các tham số truyền vào
    //page = query.page, nếu page không tồn tại thì mặc định là 1
  const { page = 1, limit = 10, sort_type = 'desc', sort_by='createdAt' } = query;

  //Nếu tồn tại sortType và sortBy thì sẽ sắp xếp theo sortType và sortBy
    //Nếu không tồn tại thì sẽ sắp xếp theo createdAt
    let sortObject = {};
    sortObject = { ...sortObject, [sort_by]: sort_type === 'desc' ? -1 : 1 };

    console.log('<<=== 🚀sortObject  ===>>',sortObject);

    //Tìm kiếm theo điều kiện
    let where = {};
    //Nếu có tìm kiếm theo tên sản phẩm
    if (query.order_item_name && query.order_item_name.length > 0) {
        where = { ...where, order_item_name: { $regex: query.order_item_name, $options: 'i' } };
    }
    //Nếu tìm kiếm theo danh mục
    if (query.category && query.category.length > 0) {
        where = { ...where, category: query.category };
    }
    //Nếu tìm kiếm theo thương hiệu
    if (query.order_item_id && query.order_item_id.length > 0) {
        where = { ...where, order_item_id: query.order_item_id };
    }

    //Thêm các điều kiện khác nếu cần

  const order_items = await order_itemModel
  .find(where)
  .skip((page - 1) * limit)
  .limit(limit)
  .sort({...sortObject});
  //Đếm tổng số record hiện có của collection Product
const count = await order_itemModel.countDocuments(where);

return {
  order_items,
  panigation:{
    totalRecord: count,
    page: +page,
    limit: +limit
  }
}};

const getById = async (id: mongoose.Types.ObjectId) => {
  const order_item = await order_itemModel.findById(id);
  if (!order_item) {
    throw createError(400, "Order_item not found");
  }

  return order_item;
};

const create = async (payload: IOrder_itemCreate) => {
  //Kiểm tra xem có tồn tại sản phẩm có tên giống nhau không
  const order_itemExist = await order_itemModel.findOne({
    order_item_name: payload.order_item_name,
  });
  if (order_itemExist) {
    throw createError(400, "Order_item already exists");
  }
  const order_item = new order_itemModel(payload);
  await order_item.save();
  // Trả về item vừa được tạo
  return order_item;
};
const updateById = async (
  id: mongoose.Types.ObjectId,
  payload: IOrder_itemCreate
) => {
  //Kiểm tra xem có tồn tại sản phẩm có id này không
  const order_item = await getById(id);
  // Kiểm tra có tên giống nhau không
  const order_itemExist = await order_itemModel.findOne({
    order_item_name: payload.order_item_name,
  });
  if (order_itemExist && order_itemExist._id.toString() !== id.toString()) {
    throw createError(400, "Order_item name already exists");
  }
  // Cập nhật lại tên sản phẩm
  Object.assign(order_item, payload); //trộn dữ liệu cũ và mới
  await order_item.save(); //lưu lại vào db
  return order_item;
};

const deleteById = async (id: mongoose.Types.ObjectId) => {
  const order_item = await getById(id);
  if (!order_item) {
    throw createError(400, "Order_item not found");
  }
  await order_item.deleteOne({ _id: order_item._id });
  return order_item;
};
export default {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
