"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const brandSchema = new mongoose_1.Schema({
    brand_name: {
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
    timestamps: true, // Tự động sinh ra 2 trường createAt và updatedAt
    versionKey: false,
    collection: "brands" // tùy chỉnh tên collection để tiện quản lýlý
});
exports.default = (0, mongoose_1.model)("Brand", brandSchema);
//# sourceMappingURL=brand.model.js.map