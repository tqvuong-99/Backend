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
const customers_service_1 = __importDefault(require("../services/customers.service"));
const response_helper_1 = require("../helpers/response.helper");
// Controller:
// - Nhận đầu vào từ router
// - Nhận kết quả từ service tương ứng với đầu vào
// - Response kết quả cho client
// - Không nên xử lý nghiệp vụ ở controller
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const customer = yield customers_service_1.default.getAll();
    (0, response_helper_1.sendJsonSuccess)(res, customer);
    // res.status(200).json(customer);
});
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const customer = yield customers_service_1.default.getById(id);
    //res.status(200).json(customer);
    (0, response_helper_1.sendJsonSuccess)(res, customer);
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const customer = yield customers_service_1.default.create(payload);
    (0, response_helper_1.sendJsonSuccess)(res, customer, response_helper_1.httpStatus.CREATED.statusCode, response_helper_1.httpStatus.CREATED.message);
    // res.status(201).json(customer);
});
const updateById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = req.params;
    const payload = req.body;
    const customer = yield customers_service_1.default.updateById(id, payload);
    // res.status(200).json(customer);
    (0, response_helper_1.sendJsonSuccess)(res, customer);
});
const deleteById = (req, res) => {
    const { id } = req.params;
    const customer = customers_service_1.default.deleteById(Number(id));
    res.status(200).json(customer);
};
exports.default = {
    getAll, getById, create, updateById, deleteById
};
//# sourceMappingURL=customers.controller.js.map