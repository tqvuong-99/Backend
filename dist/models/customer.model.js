"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const customerSchema = new mongoose_1.Schema({
    customer_name: {
        type: String,
        maxLength: 50,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        maxLength: 255,
        required: false,
    }
}, {
    timestamps: true, // tự động thêm createdAt và updatedAt khi thêm mới và cập nhật record
    versionKey: false, // tắt versionKey để hủy bỏ key đặc biệt, giúp tránh trùng lặp giữa các record
});
exports.default = (0, mongoose_1.model)('Customer', customerSchema);
//# sourceMappingURL=customer.model.js.map