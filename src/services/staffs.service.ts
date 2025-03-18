import createError from "http-errors";
import staffModel from "../models/staff.model";
import { IStaffCreate } from "../types/model";
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
    if (query.staff_name && query.staff_name.length > 0) {
        where = { ...where, staff_name: { $regex: query.staff_name, $options: 'i' } };
    }
    //Nếu tìm kiếm theo danh mục
    if (query.category && query.category.length > 0) {
        where = { ...where, category: query.category };
    }
    //Nếu tìm kiếm theo thương hiệu
    if (query.staff_id && query.staff_id.length > 0) {
        where = { ...where, staff_id: query.staff_id };
    }

    //Thêm các điều kiện khác nếu cần

  const staffs = await staffModel
  .find(where)
  .skip((page - 1) * limit)
  .limit(limit)
  .sort({...sortObject});
  //Đếm tổng số record hiện có của collection Product
const count = await staffModel.countDocuments(where);

return {
  staffs,
  panigation:{
    totalRecord: count,
    page: +page,
    limit: +limit
  }
}};

const getById = async (id: mongoose.Types.ObjectId) => {
  const staff = await staffModel.findById(id);
  if (!staff) {
    throw createError(400, "Staff not found");
  }

  return staff;
};

const create = async (payload: IStaffCreate) => {
  //Kiểm tra email có tồn tại không
  const staffExist = await staffModel.findOne({
    email: payload.email
})
if (staffExist) {
    throw createError(400, 'Email already exists');
}

console.log('<<=== 🚀 payload ===>>',payload);
  const staff = new staffModel(payload);
  await staff.save();
  // Trả về item vừa được tạo
  return staff;
};
const updateById = async (
  id: mongoose.Types.ObjectId,
  payload: IStaffCreate
) => {
  //Kiểm tra xem có tồn tại sản phẩm có id này không
  const staff = await getById(id);
//kiểm tra email có tồn tại không
const staffExist = await staffModel.findOne({
  email: payload.email,
  _id: { $ne: id }
})
if (staffExist) {
  throw createError(400, 'Email already exists');
}


  // Cập nhật lại tên sản phẩm
  Object.assign(staff, payload); //trộn dữ liệu cũ và mới
  await staff.save(); //lưu lại vào db
  return staff;
};

const deleteById = async (id: mongoose.Types.ObjectId) => {
  const staff = await getById(id);
  if (!staff) {
    throw createError(400, "Staff not found");
  }
  await staff.deleteOne({ _id: staff._id });
  return staff;
};
export default {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};
