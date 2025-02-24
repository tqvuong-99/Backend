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
const orders = [
    { id: 1, name: 'Order_items 1' },
    { id: 2, name: 'Order_items 2' },
];
const getAll = () => {
    return orders;
};
const getById = (id) => {
    const order_items = orders.find(order_items => order_items.id == Number(id));
    // Nếu không tìm thấy thì hiển thị "Order_items not found"
    if (!order_items) {
        // throw new Error('Order_items not found');
        throw (0, http_errors_1.default)(400, 'Order_items not found');
    }
    return order_items;
};
const create = (payload) => {
    orders.push(payload);
    return payload;
};
const updateById = (id, payload) => {
    const order_itemsIndex = orders.findIndex(c => c.id == Number(id));
    if (order_itemsIndex === -1) {
        throw (0, http_errors_1.default)(400, 'Order_items not found');
    }
    orders[order_itemsIndex] = payload;
    //return payload;
    return payload;
};
const deleteById = (id) => {
    const order_items = orders.findIndex(c => c.id == Number(id));
    if (!order_items) {
        throw (0, http_errors_1.default)(400, 'Order_items not found');
    }
    orders.splice(order_items, 1);
    return order_items;
};
exports.default = {
    getAll,
    getById,
    create,
    updateById,
    deleteById
};
//# sourceMappingURL=order_items.service.js.map