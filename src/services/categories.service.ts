import createError from "http-errors";
import categoryModel from "../models/category.model";
import { ICategoryCreate } from "../types/model";
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
    if (query.category_name && query.category_name.length > 0) {
        where = { ...where, category_name: { $regex: query.category_name, $options: 'i' } };
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

  const categories = await categoryModel
  .find(where)
  .skip((page - 1) * limit)
  .limit(limit)
  .sort({...sortObject});
  //Đếm tổng số record hiện có của collection Product
const count = await categoryModel.countDocuments(where);

return {
  categories,
  panigation:{
    totalRecord: count,
    page: +page,
    limit: +limit
  }
}};

const getById = async (id: mongoose.Types.ObjectId) => {
  const category = await categoryModel.findById(id);
  if (!category) {
    throw createError(400, "Category not found");
  }

  return category;
};

const create = async (payload: ICategoryCreate) => {
  //Kiểm tra xem có tồn tại sản phẩm có tên giống nhau không
  const categoryExist = await categoryModel.findOne({
    category_name: payload.category_name,
  });
  if (categoryExist) {
    throw createError(400, "Category already exists");
  }
  const category = new categoryModel(payload);
  await category.save();
  // Trả về item vừa được tạo
  return category;
};
const updateById = async (
  id: mongoose.Types.ObjectId,
  payload: ICategoryCreate
) => {
  //Kiểm tra xem có tồn tại sản phẩm có id này không
  const category = await getById(id);
  // Kiểm tra có tên giống nhau không
  const categoryExist = await categoryModel.findOne({
    category_name: payload.category_name,
  });
  if (categoryExist && categoryExist._id.toString() !== id.toString()) {
    throw createError(400, "Category name already exists");
  }
  // Cập nhật lại tên sản phẩm
  Object.assign(category, payload); //trộn dữ liệu cũ và mới
  await category.save(); //lưu lại vào db
  return category;
};

const deleteById = async (id: mongoose.Types.ObjectId) => {
  const category = await getById(id);
  if (!category) {
    throw createError(400, "Category not found");
  }
  await category.deleteOne({ _id: category._id });
  return category;
};
export default {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
