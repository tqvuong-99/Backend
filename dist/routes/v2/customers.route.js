"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const router = express_1.default.Router();
const customers = [
    { id: 1, name: 'Customer 1' },
    { id: 2, name: 'Customer 2' },
];
// GET /api/v1/customers
router.get('/customers', (req, res) => {
    res.json(customers);
});
// GET /api/v1/customers/:id
router.get('/customers/:id', (req, res) => {
    const { id } = req.params;
    const customerFound = customers.find((c) => c.id === parseInt(id));
    if (!customerFound) {
        throw (0, http_errors_1.default)(404, 'Customer not found');
    }
    res.json(customerFound);
});
// POST /api/v1/customers
router.post('/customers', (req, res) => {
    const newCustomer = req.body;
    customers.push(newCustomer);
    res.status(201).json(newCustomer);
});
// PUT /api/v1/customers/:id
router.put('/customers/:id', (req, res) => {
    const { id } = req.params;
    const customerIndex = customers.findIndex((c) => c.id === parseInt(id));
    if (customerIndex === -1) {
        throw (0, http_errors_1.default)(404, 'Customer not found');
    }
    customers[customerIndex] = Object.assign(Object.assign({}, customers[customerIndex]), req.body);
    res.status(200).json(customers[customerIndex]);
});
// DELETE /api/v1/customers/:id   
router.delete('/customers/:id', (req, res) => {
    const { id } = req.params;
    const customerIndex = customers.findIndex((c) => c.id === parseInt(id));
    if (customerIndex === -1) {
        throw (0, http_errors_1.default)(404, 'Customer not found');
    }
    customers.splice(customerIndex, 1);
    res.status(200).send({ message: 'Customer deleted successfully' });
});
module.exports = router;
exports.default = router;
//# sourceMappingURL=customers.route.js.map