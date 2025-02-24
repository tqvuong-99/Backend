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
const customer_model_1 = __importDefault(require("../models/customer.model"));
//Service
// - Nhận đầu vào từ ControllerController
//- Xử lý logic
//- Lấy dữ liệu return về controller
const customers = [
    { id: 1, name: 'Customer 1' },
    { id: 2, name: 'Customer 2' },
];
const getAll = () => __awaiter(void 0, void 0, void 0, function* () {
    const c = yield customer_model_1.default.find();
    return c;
});
const getById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // const customer = customers.find(customer => customer.id == Number(id));
    // Nếu không tìm thấy thì hiển thị "Customer not found"
    const customer = yield customer_model_1.default.findById(id);
    if (!customer) {
        throw (0, http_errors_1.default)(400, 'Customer not found');
    }
    return customer;
});
const create = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // /customers.push(payload);
    const customer = new customer_model_1.default(payload);
    yield customer.save();
    return payload;
});
const updateById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // const customerIndex = customers.findIndex(c => c.id == Number(id));
    //     if (customerIndex === -1) {
    //         throw createError(400, 'Customer not found');
    //     }
    //     customers[customerIndex] = payload;
    const customer = yield customer_model_1.default.findById(id);
    if (!customer) {
        throw (0, http_errors_1.default)(400, 'Customer not found');
    }
    return customer;
});
const deleteById = (id) => {
    const customer = customers.findIndex(c => c.id == Number(id));
    if (!customer) {
        throw (0, http_errors_1.default)(400, 'Customer not found');
    }
    customers.splice(customer, 1);
    return customer;
};
exports.default = {
    getAll,
    getById,
    create,
    updateById,
    deleteById
};
//# sourceMappingURL=customers.service.js.map