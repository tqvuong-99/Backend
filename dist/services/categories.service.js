"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
const category_model_1 = __importDefault(require("../models/category.model"));
//Service
// - Nhận đầu vào từ ControllerController
//- Xử lý logic
//- Lấy dữ liệu return về controller
const categories = [
    { id: 1, name: 'Category 1' },
    { id: 2, name: 'Category 2' },
];
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const categories = yield category_model_1.default.find();
    console.log('<<=== �� c ===>>', categories);
    return categories;
});
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    //const category = categories.find(category => category.id == Number(id));
    const category = yield category_model_1.default.findById(id);
    //Nếu không tìm thấy category thì trả về lỗi 404
    if (!category) {
        //throw new Error('Category not found');
        throw (0, http_errors_1.default)(400, 'Category not found');
    }
    return category;
});
const create = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //Tạo category mới
    const category = new category_model_1.default(payload);
    //Lưu vào database
    yield category.save();
    //Trả về item vừa được tạo
    return payload;
});
const updateById = (id, payload) => {
    const categoryIndex = categories.findIndex(c => c.id == Number(id));
    if (categoryIndex === -1) {
        throw (0, http_errors_1.default)(400, 'Category not found');
    }
    categories[categoryIndex] = payload;
    //return payload;
    return payload;
};
const deleteById = (id) => {
    const category = categories.findIndex(c => c.id == Number(id));
    if (!category) {
        throw (0, http_errors_1.default)(400, 'Category not found');
    }
    categories.splice(category, 1);
    return category;
};
exports.default = {
    getAll,
    getById,
    create,
    updateById,
    deleteById
};
//# sourceMappingURL=categories.service.js.map