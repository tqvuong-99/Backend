import { lchown } from "fs";
import { Schema, model } from "mongoose";

/**
 * Định nghĩa cấu trúc collection Category
 */
const categorySchema = new Schema({
    category_name: {
        type: String,
        maxLength: 50,
        required: true,
        unique: true
    },
    description: {
        type: String,
        maxLength: 255,
        required: false, //
    },
})

export default model('Category', categorySchema);