import { lchown } from "fs";
import { Schema, model } from "mongoose";

/**
 * Định nghĩa cấu trúc collection Category
 */
const categorySchema = new Schema({
    category_name: {
        type: String,
        maxLength: 50,
        minLength: 3,
        required: true,
        unique: true
    },
    description: {
        type: String,
        maxLength: 255,
        required: false, //
    },
    slug: {
        type: String,
        maxLength: 50,
        minLength: 3,
        required: true,
        unique: true,
        lowercase: true,
    },
}, 
    { 
        timestamps: true, // Tự động sinh ra 2 trường createAt và updatedAt
        versionKey: false,
        collection: "categories"  // tùy chỉnh tên collection để tiện quản lýlý
    })

export default model('Category', categorySchema);