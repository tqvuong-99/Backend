"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const router = express_1.default.Router();
const order_items = [
    { id: 1, name: 'order-items 1' },
    { id: 2, name: 'order-items 2' },
];
// Get All Orders
router.get('/orders', (req, res, next) => {
    res.status(200).json(order_items);
});
// Get Order by Id
router.get('/orders/:id', (req, res, next) => {
    const { id } = req.params;
    const order_item = order_items.find(item => item.id === parseInt(id));
    if (!order_item) {
        next((0, http_errors_1.default)(404, 'Order not found'));
    }
    res.status(200).json(order_item);
});
// Create Order
router.post('/orders', (req, res, next) => {
    const order_item = req.body;
    order_items.push(order_item);
    res.status(201).json(order_item);
});
// Update Order
router.put('/orders/:id', (req, res, next) => {
    const { id } = req.params;
    const index = order_items.findIndex(item => item.id === parseInt(id));
    if (index === -1) {
        next((0, http_errors_1.default)(404, 'Order not found'));
    }
    const updated_order_item = Object.assign(Object.assign({}, req.body), { id: parseInt(id) });
    order_items[index] = updated_order_item;
    res.status(200).json(updated_order_item);
});
// Delete Order 
router.delete('/orders/:id', (req, res, next) => {
    const { id } = req.params;
    const index = order_items.findIndex(item => item.id === parseInt(id));
    if (index === -1) {
        next((0, http_errors_1.default)(404, 'Order not found'));
    }
    order_items.splice(index, 1);
    res.status(200).send({ message: "Order_item deleted successfully" });
});
exports.default = router;
//# sourceMappingURL=orders.route.js.map