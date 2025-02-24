"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orders_controller_1 = __importDefault(require("../../controllers/orders.controller"));
const router = express_1.default.Router();
// Get All Orders
router.get('/orders', orders_controller_1.default.getAll);
// Get Order by Id
router.get('/orders/:id', orders_controller_1.default.getById);
// Create Order
router.post('/orders', orders_controller_1.default.create);
// Update Order
router.put('/orders/:id', orders_controller_1.default.updateById);
// Delete Order 
router.delete('/orders/:id', orders_controller_1.default.deleteById);
exports.default = router;
//# sourceMappingURL=orders.route.js.map