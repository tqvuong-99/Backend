"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
/**
 * Định nghĩa cấu trúc collection Category
 */
const categorySchema = new mongoose_1.Schema({
    category_name: {
        type: String,
        required: true, // NOT NULL
        unique: true, // duy nhấtất
        minLength: [4, "Tên thương hiệu phải từ 4 đến 50 kí tự"], // độ dài tối thiểuthiểu
        maxLength: 50, // độ dài tối đađa
        trim: true,
        lowercase: true,
    },
    description: {
        type: String,
        maxLength: 500,
        trim: true, // xóa khoảng trắng ở đầu và cuối 
        default: "" // giá trị mặc định khi tạo mới
    },
}, {
    timestamps: true, // thêm th��i gian tạo và cập nhật document
    versionKey: false, // ẩn cột _v của Mongoose
    collection: "categories"
});
exports.default = (0, mongoose_1.model)('Category', categorySchema);
//# sourceMappingURL=category.model.js.map