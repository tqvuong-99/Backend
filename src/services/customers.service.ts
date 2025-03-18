import createError from "http-errors";
import customerModel from "../models/customer.model";
import { ICustomerCreate } from "../types/model";
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
    if (query.customer_name && query.customer_name.length > 0) {
        where = { ...where, customer_name: { $regex: query.customer_name, $options: 'i' } };
    }
    //Nếu tìm kiếm theo danh mục
    if (query.category && query.category.length > 0) {
        where = { ...where, category: query.category };
    }
    //Nếu tìm kiếm theo thương hiệu
    if (query.customer_id && query.customer_id.length > 0) {
        where = { ...where, customer_id: query.customer_id };
    }

    //Thêm các điều kiện khác nếu cần

  const customers = await customerModel
  .find(where)
  .skip((page - 1) * limit)
  .limit(limit)
  .sort({...sortObject});
  //Đếm tổng số record hiện có của collection Product
const count = await customerModel.countDocuments(where);

return {
  customers,
  panigation:{
    totalRecord: count,
    page: +page,
    limit: +limit
  }
}};

const getById = async (id: mongoose.Types.ObjectId) => {
  const customer = await customerModel.findById(id);
  if (!customer) {
    throw createError(400, "Customer not found");
  }

  return customer;
};

const create = async (payload: ICustomerCreate) => {
  //Kiểm tra xem có tồn tại sản phẩm có tên giống nhau không
  const customerExist = await customerModel.findOne({
    customer_name: payload.customer_name,
  });
  if (customerExist) {
    throw createError(400, "Customer already exists");
  }
  const customer = new customerModel(payload);
  await customer.save();
  // Trả về item vừa được tạo
  return customer;
};
const updateById = async (
  id: mongoose.Types.ObjectId,
  payload: ICustomerCreate
) => {
  //Kiểm tra xem có tồn tại sản phẩm có id này không
  const customer = await getById(id);
  // Kiểm tra có tên giống nhau không
  const customerExist = await customerModel.findOne({
    customer_name: payload.customer_name,
  });
  if (customerExist && customerExist._id.toString() !== id.toString()) {
    throw createError(400, "Customer name already exists");
  }
  // Cập nhật lại tên sản phẩm
  Object.assign(customer, payload); //trộn dữ liệu cũ và mới
  await customer.save(); //lưu lại vào db
  return customer;
};

const deleteById = async (id: mongoose.Types.ObjectId) => {
  const customer = await getById(id);
  if (!customer) {
    throw createError(400, "Customer not found");
  }
  await customer.deleteOne({ _id: customer._id });
  return customer;
};
export default {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
