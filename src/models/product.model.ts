import { Schema, model } from "mongoose";
const productSchema = new Schema({
    product_name: {
        type: String,
        required: true, // NOT NULL
        unique: true, // duy nhất
        minLength: [4, "Tên thương hiệu phải từ 4 đến 50 kí tự"], // độ dài tối thiểu
        maxLength: 50, // độ dài tối đa
        trim: true,
        lowercase: true,
    },
    description: {
        type: String,
        maxLength: 500,
        trim: true, // xóa khoảng trắng ở đầu và cuối 
        default: "" // giá trị mặc định khi tạo mới
    },
}, 
    { 
        timestamps: true, // Tự động sinh ra 2 trường createAt và updatedAtupdatedAt
        versionKey: false,
        collection: "products"  // tùy chỉnh tên collection để tiện quản lý
    })

export default model("Product", productSchema);