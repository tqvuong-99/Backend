"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_items_service_1 = __importDefault(require("../services/order_items.service"));
const order_items = [
    { id: 1, name: 'order-items 1' },
    { id: 2, name: 'order-items 2' },
];
const getAll = (req, res) => {
    const order_items = order_items_service_1.default.getAll();
    res.status(200).json(order_items);
};
const getById = (req, res, next) => {
    const { id } = req.params;
    const order_item = order_items_service_1.default.getById(Number(id));
    res.status(200).json(order_item);
};
const create = (req, res) => {
    const payload = req.body;
    const order_item = order_items_service_1.default.create(payload);
    res.status(201).json(order_item);
};
const updateById = (req, res, next) => {
    const { id } = req.params;
    const payload = req.body;
    const result = order_items_service_1.default.updateById(Number(id), payload);
    res.status(200).json(result);
};
const deleteById = (req, res, next) => {
    const { id } = req.params;
    const order_item = order_items_service_1.default.deleteById(Number(id));
    res.status(200).json(order_item);
};
exports.default = {
    getAll, getById, create, updateById, deleteById
};
//# sourceMappingURL=orders.controller.js.map