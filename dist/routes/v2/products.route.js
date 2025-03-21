"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const router = express_1.default.Router();
const products = [
    { id: 1, name: 'product 1' },
    { id: 2, name: 'product 2' },
];
// Get all products: GET api/v1/products
router.get('/products', (req, res) => {
    res.status(200).json(products);
});
// Get product by ID: GET api/v1/products/:id
router.get('/products/:id', (req, res, next) => {
    const { id } = req.params;
    const product = products.find((p) => p.id === parseInt(id));
    if (!product) {
        return next((0, http_errors_1.default)(404, 'Product not found'));
    }
    res.status(200).json(product);
});
// Create new product: POST api/v1/products
router.post('/products', (req, res) => {
    const product = req.body;
    product.id = products.length + 1;
    products.push(product);
    res.status(201).json(product);
});
// Update product by ID: PUT api/v1/products/:id
router.put('/products/:id', (req, res, next) => {
    const { id } = req.params;
    const productIndex = products.findIndex((p) => p.id === parseInt(id));
    if (productIndex === -1) {
        return next((0, http_errors_1.default)(404, 'Product not found'));
    }
    const updatedProduct = Object.assign(Object.assign({}, products[productIndex]), req.body);
    products[productIndex] = updatedProduct;
    res.status(200).json(updatedProduct);
});
// Delete product by ID: DELETE api/v1/products/:id
router.delete('/products/:id', (req, res, next) => {
    const { id } = req.params;
    const productIndex = products.findIndex((p) => p.id === Number(id));
    if (productIndex === -1) {
        return next((0, http_errors_1.default)(404, 'Product not found'));
    }
    products.splice(productIndex, 1);
    res.status(200).json({ message: 'Product deleted successfully' });
});
exports.default = router;
//# sourceMappingURL=products.route.js.map