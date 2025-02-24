"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = __importDefault(require("http-errors"));
//Service
// - Nhận đầu vào từ ControllerController
//- Xử lý logic
//- Lấy dữ liệu return về controller
const staffs = [
    { id: 1, name: 'Staff 1' },
    { id: 2, name: 'Staff 2' },
];
const getAll = () => {
    return staffs;
};
const getById = (id) => {
    const staff = staffs.find(staff => staff.id == Number(id));
    // Nếu không tìm thấy thì hiển thị "Staff not found"
    if (!staff) {
        // throw new Error('Staff not found');
        throw (0, http_errors_1.default)(400, 'Staff not found');
    }
    return staff;
};
const create = (payload) => {
    staffs.push(payload);
    return payload;
};
const updateById = (id, payload) => {
    const staffIndex = staffs.findIndex(c => c.id == Number(id));
    if (staffIndex === -1) {
        throw (0, http_errors_1.default)(400, 'Staff not found');
    }
    staffs[staffIndex] = payload;
    //return payload;
    return payload;
};
const deleteById = (id) => {
    const staff = staffs.findIndex(c => c.id == Number(id));
    if (!staff) {
        throw (0, http_errors_1.default)(400, 'Staff not found');
    }
    staffs.splice(staff, 1);
    return staff;
};
exports.default = {
    getAll,
    getById,
    create,
    updateById,
    deleteById
};
//# sourceMappingURL=staffs.service.js.map