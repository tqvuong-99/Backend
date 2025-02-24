"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_controller_1 = __importDefault(require("../../controllers/products.controller"));
const router = express_1.default.Router();
// Get all products: GET api/v1/products
router.get('/products', products_controller_1.default.getAll);
// Get product by ID: GET api/v1/products/:id
router.get('/products/:id', products_controller_1.default.getById);
// Create new product: POST api/v1/products
router.post('/products', products_controller_1.default.create);
// Update product by ID: PUT api/v1/products/:id
router.put('/products/:id', products_controller_1.default.updateById);
// Delete product by ID: DELETE api/v1/products/:id
router.delete('/products/:id', products_controller_1.default.deleteById);
exports.default = router;
//# sourceMappingURL=products.route.js.map