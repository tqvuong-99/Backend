import createError from "http-errors";
import productModel from "../models/product.model";
import { IProductCreate } from "../types/model";
import mongoose from "mongoose";

const getAll = async (query: any) => {
    //Lấy ra các tham số truyền vào
    //page = query.page, nếu page không tồn tại thì mặc định là 1
  const { page = 1, limit = 10, sort_type = 'desc', sort_by='createdAt' } = query;

  //Nếu tồn tại sortType và sortBy thì sẽ sắp xếp theo sortType và sortBy
    //Nếu không tồn tại thì sẽ sắp xếp theo createdAt
    let sortObject = {};
    sortObject = { ...sortObject, [sort_by]: sort_type === 'desc' ? -1 : 1 };
    
    //Tìm kiếm theo điều kiện
    let where = {};
    //Nếu có tìm kiếm theo tên sản phẩm
    if (query.product_name && query.product_name.length > 0) {
        where = { ...where, product_name: { $regex: query.product_name, $options: 'i' } };
    }
    //Nếu tìm kiếm theo danh mục
    if (query.category && query.category.length > 0) {
        where = { ...where, category: query.category };
    }
    //Nếu tìm kiếm theo thương hiệu
    if (query.brand_id && query.brand_id.length > 0) {
        where = { ...where, brand_id: query.brand_id };
    }

    //Thêm các điều kiện khác nếu cần

  const products = await productModel
  .find(where)
  .populate('category', 'category_name')
  .populate('brand_id', 'brand_name')
  .skip((page - 1) * limit)
  .limit(limit)
  .sort({...sortObject});
  //Đếm tổng số record hiện có của collection Product
const count = await productModel.countDocuments(where);

  return {
    products,
    panigation:{
      totalRecord: count,
      page: +page,
      limit: +limit
    }
  };
}





const getById = async (id: mongoose.Types.ObjectId) => {
  const product = await productModel.findById(id);
  if (!product) {
    throw createError(400, "Product not found");
  }

  return product;
};

const create = async (payload: IProductCreate) => {
  //Kiểm tra xem có tồn tại sản phẩm có tên giống nhau không
  const productExist = await productModel.findOne({
    product_name: payload.product_name,
  });
  if (productExist) {
    throw createError(400, "Product already exists");
  }
  const product = new productModel(payload);
  await product.save();
  // Trả về item vừa được tạo
  return product;
};
const updateById = async (
  id: mongoose.Types.ObjectId,
  payload: IProductCreate
) => {
  //Kiểm tra xem có tồn tại sản phẩm có id này không
  const product = await getById(id);
  // Kiểm tra có tên giống nhau không
  const productExist = await productModel.findOne({
    product_name: payload.product_name,
  });
  if (productExist && productExist._id.toString() !== id.toString()) {
    throw createError(400, "Product name already exists");
  }
  // Cập nhật lại tên sản phẩm
  Object.assign(product, payload); //trộn dữ liệu cũ và mới
  await product.save(); //lưu lại vào db
  return product;
};

const deleteById = async (id: mongoose.Types.ObjectId) => {
  const product = await getById(id);
  if (!product) {
    throw createError(400, "Product not found");
  }
  await product.deleteOne({ _id: product._id });
  return product;
};
export default {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
