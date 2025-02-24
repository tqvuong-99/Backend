"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//Import routes
const categories_route_1 = __importDefault(require("./routes/v1/categories.route"));
const brands_route_1 = __importDefault(require("./routes/v1/brands.route"));
const products_route_1 = __importDefault(require("./routes/v1/products.route"));
const customers_route_1 = __importDefault(require("./routes/v1/customers.route"));
const staffs_route_1 = __importDefault(require("./routes/v1/staffs.route"));
const orders_route_1 = __importDefault(require("./routes/v1/orders.route"));
const http_errors_1 = __importDefault(require("http-errors"));
// -------------||INITIAL APP||----------------
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// -------------||BEGIN REGISTER ROUTES ||----------------
app.get('/', (req, res) => {
    res.send('Hello World');
});
// Đăng kí route từ file bên ngoài
app.use('/api/v1', categories_route_1.default); // router cho categories
app.use('/api/v1', brands_route_1.default); // router cho brands
app.use('/api/v1', products_route_1.default); // router cho products
app.use('/api/v1', customers_route_1.default); // router cho customers
app.use('/api/v1', staffs_route_1.default); // router cho staffs
app.use('/api/v1', orders_route_1.default); // router cho orders
// -------------||END REGISTER ROUTES ||----------------
// -------------||BEGIN HANDLE ERRORS ||----------------
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
//error handler, catch 5xx errors
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    const statusCode = err.status || 500;
    res.status(statusCode).json({
        statusCode: statusCode,
        message: err.message,
        data: null
    });
});
// -------------||END HANDLE ERRORS ||----------------
exports.default = app;
//# sourceMappingURL=app.js.map