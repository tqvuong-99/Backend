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
const products_service_1 = __importDefault(require("../services/products.service"));
const response_helper_1 = require("../helpers/response.helper");
const products = [
    { id: 1, name: 'product 1' },
    { id: 2, name: 'product 2' },
];
// Controller:
// - Nhận đầu vào từ router
// - Nhận kết quả từ service tương ứng với đầu vào
// - Response kết quả cho client
// - Không nên xử lý nghiệp vụ ở controller
const getAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield products_service_1.default.getAll();
    (0, response_helper_1.sendJsonSuccess)(res, product);
});
const getById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // const { id } = req.params;
    // const product = productsService.getById(Number(id));
    // res.status(200).json(product);
    try {
        const { id } = req.params;
        const product = yield products_service_1.default.getById(parseInt(id));
        (0, response_helper_1.sendJsonSuccess)(res, product);
    }
    catch (error) {
        next(error);
    }
});
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        const product = yield products_service_1.default.create(payload);
        (0, response_helper_1.sendJsonSuccess)(res, product, response_helper_1.httpStatus.CREATED.statusCode, response_helper_1.httpStatus.CREATED.message);
    }
    catch (error) {
        next(error);
    }
});
const updateById = (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    const result = products_service_1.default.updateById(Number(id), payload);
    res.status(200).json(result);
};
const deleteById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const product = yield products_service_1.default.deleteById(parseInt(id));
        (0, response_helper_1.sendJsonSuccess)(res, product);
    }
    catch (error) {
        next(error);
    }
});
exports.default = {
    getAll, getById, create, updateById, deleteById
};
//# sourceMappingURL=products.controller.js.map