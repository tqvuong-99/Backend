import createError from "http-errors";
import brandModel from "../models/brand.model";
import { IBrandCreate } from "../types/model";
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
    if (query.brand_name && query.brand_name.length > 0) {
        where = { ...where, brand_name: { $regex: query.brand_name, $options: 'i' } };
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

  const brands = await brandModel
  .find(where)
  .skip((page - 1) * limit)
  .limit(limit)
  .sort({...sortObject});
  //Đếm tổng số record hiện có của collection Product
const count = await brandModel.countDocuments(where);

return {
  brands,
  panigation:{
    totalRecord: count,
    page: +page,
    limit: +limit
  }
};
}

const getById = async (id: mongoose.Types.ObjectId) => {
  const brand = await brandModel.findById(id);
  if (!brand) {
    throw createError(400, "Brand not found");
  }

  return brand;
};

const create = async (payload: IBrandCreate) => {
  //Kiểm tra xem có tồn tại sản phẩm có tên giống nhau không
  const brandExist = await brandModel.findOne({
    brand_name: payload.brand_name,
  });
  if (brandExist) {
    throw createError(400, "Brand already exists");
  }
  const brand = new brandModel(payload);
  await brand.save();
  // Trả về item vừa được tạo
  return brand;
};
const updateById = async (
  id: mongoose.Types.ObjectId,
  payload: IBrandCreate
) => {
  //Kiểm tra xem có tồn tại sản phẩm có id này không
  const brand = await getById(id);
  // Kiểm tra có tên giống nhau không
  const brandExist = await brandModel.findOne({
    brand_name: payload.brand_name,
  });
  if (brandExist && brandExist._id.toString() !== id.toString()) {
    throw createError(400, "Brand name already exists");
  }
  // Cập nhật lại tên sản phẩm
  Object.assign(brand, payload); //trộn dữ liệu cũ và mới
  await brand.save(); //lưu lại vào db
  return brand;
};

const deleteById = async (id: mongoose.Types.ObjectId) => {
  const brand = await getById(id);
  if (!brand) {
    throw createError(400, "Brand not found");
  }
  await brand.deleteOne({ _id: brand._id });
  return brand;
};
export default {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
