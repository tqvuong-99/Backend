"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const staffs_service_1 = __importDefault(require("../services/staffs.service"));
const staffs = [
    { id: 1, name: 'staff 1' },
    { id: 2, name: 'staff 2' },
];
// Controller:
// - Nhận đầu vào từ router
// - Nhận kết quả từ service tương ứng với đầu vào
// - Response kết quả cho client
// - Không nên xử lý nghiệp vụ ở controller
const getAll = (req, res) => {
    const staff = staffs_service_1.default.getAll();
    res.status(200).json(staff);
};
const getById = (req, res) => {
    const { id } = req.params;
    const staff = staffs_service_1.default.getById(Number(id));
    res.status(200).json(staff);
};
const create = (req, res) => {
    const payload = req.body;
    const staff = staffs_service_1.default.create(payload);
    res.status(201).json(staff);
};
const updateById = (req, res) => {
    const { id } = req.params;
    const payload = req.body;
    const result = staffs_service_1.default.updateById(Number(id), payload);
    res.status(200).json(result);
};
const deleteById = (req, res) => {
    const { id } = req.params;
    const staff = staffs_service_1.default.deleteById(Number(id));
    res.status(200).json(staff);
};
exports.default = {
    getAll, getById, create, updateById, deleteById
};
//# sourceMappingURL=staffs.controller.js.map