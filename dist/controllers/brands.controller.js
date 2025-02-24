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
const brands_service_1 = __importDefault(require("../services/brands.service"));
const response_helper_1 = require("../helpers/response.helper");
// Controller:
// - Nhận đầu vào từ router
// - Nhận kết quả từ service tương ứng với đầu vào
// - Response kết quả cho client
// - Không nên xử lý nghiệp vụ ở controller
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const brand = yield brands_service_1.default.getAll();
    //res.status(200).json(brand);
    (0, response_helper_1.sendJsonSuccess)(res, brand);
});
const getById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // const category = await brandsService.getById(parseInt(id))
        const category = yield brands_service_1.default.getById(id);
        res.status(200).json({
            data: category
        });
    }
    catch (error) {
        next(error);
    }
});
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        const brand = yield brands_service_1.default.create(payload);
        (0, response_helper_1.sendJsonSuccess)(res, brand, response_helper_1.httpStatus.CREATED.statusCode, response_helper_1.httpStatus.CREATED.message);
    }
    catch (error) {
        next(error);
    }
});
const updateById = (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    const result = brands_service_1.default.updateById(Number(id), payload);
    res.status(200).json(result);
};
const deleteById = (req, res) => {
    const { id } = req.params;
    const brand = brands_service_1.default.deleteById(Number(id));
    res.status(200).json(brand);
};
exports.default = {
    getAll,
    getById,
    create,
    updateById,
    deleteById
};
//# sourceMappingURL=brands.controller.js.map