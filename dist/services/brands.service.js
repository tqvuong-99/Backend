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
const brand_model_1 = __importDefault(require("../models/brand.model"));
//Service
// - Nhận đầu vào từ ControllerController
//- Xử lý logic
//- Lấy dữ liệu return về controller
const brands = [
    { id: 1, name: 'Brand 1' },
    { id: 2, name: 'Brand 2' },
];
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const b = yield brand_model_1.default.find();
    return b;
});
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const brand = yield brand_model_1.default.findById(id);
    if (!brand) {
        throw (0, http_errors_1.default)(400, 'Brand not found');
    }
    return brand;
});
const create = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // brands.push(payload);
    const brand = new brand_model_1.default(payload);
    yield brand.save();
    // Trả về item vừa được tạo
    return brand;
});
const updateById = (id, payload) => {
    const brandIndex = brands.findIndex(c => c.id == Number(id));
    if (brandIndex === -1) {
        throw (0, http_errors_1.default)(400, 'Brand not found');
    }
    brands[brandIndex] = payload;
    //return payload;
    return payload;
};
const deleteById = (id) => {
    const brand = brands.findIndex(c => c.id == Number(id));
    if (!brand) {
        throw (0, http_errors_1.default)(400, 'Brand not found');
    }
    brands.splice(brand, 1);
    return brand;
};
exports.default = {
    getAll,
    getById,
    create,
    updateById,
    deleteById
};
//# sourceMappingURL=brands.service.js.map