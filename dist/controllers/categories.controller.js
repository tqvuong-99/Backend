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
const categories_service_1 = __importDefault(require("../services/categories.service"));
const response_helper_1 = require("../helpers/response.helper");
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield categories_service_1.default.getAll();
    //res.status(200).json(category);
    (0, response_helper_1.sendJsonSuccess)(res, category);
});
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const category = yield categories_service_1.default.getById(id);
    //res.status(200).json(category);
    (0, response_helper_1.sendJsonSuccess)(res, category);
});
const create = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payload = req.body;
        const category = yield categories_service_1.default.create(payload);
        (0, response_helper_1.sendJsonSuccess)(res, category, response_helper_1.httpStatus.CREATED.statusCode, response_helper_1.httpStatus.CREATED.message);
    }
    catch (error) {
        next(error);
    }
});
const updateById = (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    const result = categories_service_1.default.updateById(Number(id), payload);
    res.status(200).json(result);
};
const deleteById = (req, res) => {
    const { id } = req.params;
    const category = categories_service_1.default.deleteById(Number(id));
    res.status(200).json(category);
};
exports.default = {
    getAll,
    getById,
    create,
    updateById,
    deleteById
};
//# sourceMappingURL=categories.controller.js.map