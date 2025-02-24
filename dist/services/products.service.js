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
const product_model_1 = __importDefault(require("../models/product.model"));
//Service
// - Nhận đầu vào từ ControllerController
//- Xử lý logic
//- Lấy dữ liệu return về controller
const products = [
    { id: 1, name: 'Product 1' },
    { id: 2, name: 'Product 2' },
];
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    // return products;
    const product = yield product_model_1.default.find();
    return product;
    //   const products = await productModel.find({
    //       product_id: true,
    //       product_name: true,
    //       price: true,
    //     }
    //   );
});
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // const product = products.find(product => product.id == Number(id));
    //     // Nếu không tìm thấy thì hiển thị "Product not found"
    //     if (!product) {
    //         // throw new Error('Product not found');
    //         throw createError(400, 'Product not found');
    //     }
    //     return product;
    const product = yield product_model_1.default.findById(id);
    if (!product) {
        throw (0, http_errors_1.default)(400, 'Product not found');
    }
    return product;
    // return products.find(product => product.id == Number(id));
});
const create = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // brands.push(payload);
    const product = new product_model_1.default(payload);
    yield product.save();
    // Trả về item vừa được tạo
    return product;
});
const updateById = (id, payload) => {
    const productIndex = products.findIndex(c => c.id == Number(id));
    if (productIndex === -1) {
        throw (0, http_errors_1.default)(400, 'Product not found');
    }
    products[productIndex] = payload;
    //return payload;
    return payload;
};
const deleteById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    //Kiem tra tinh ton tai cua Id
    const product = yield getById(id);
    //xoa
    yield product.delete(id);
    return product;
});
exports.default = {
    getAll,
    getById,
    create,
    updateById,
    deleteById
};
//# sourceMappingURL=products.service.js.map