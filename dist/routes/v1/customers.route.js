"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const customers_controller_1 = __importDefault(require("../../controllers/customers.controller"));
const router = express_1.default.Router();
// GET /api/v1/customers
router.get('/customers', customers_controller_1.default.getAll);
// GET /api/v1/customers/:id
router.get('/customers/:id', customers_controller_1.default.getById);
// POST /api/v1/customers
router.post('/customers', customers_controller_1.default.create);
// PUT /api/v1/customers/:id
router.put('/customers/:id', customers_controller_1.default.updateById);
// DELETE /api/v1/customers/:id   
router.delete('/customers/:id', customers_controller_1.default.deleteById);
module.exports = router;
exports.default = router;
//# sourceMappingURL=customers.route.js.map