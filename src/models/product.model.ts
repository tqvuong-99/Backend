import { Schema, model } from "mongoose";
const mongoose = require("mongoose");

const productSchema = new Schema({
    product_name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minLength: [3, "Tên sản phẩm phải từ 3 đến 255 kí tự"],
        maxLength: [255, "Tối đa 255 kí tự"], // Tên sản phẩm
    },
    price: {
        type: Number,
        required: false, // Sửa lỗi chính tả từ "require" thành "required"
        min: 0,
        default: 0
    },
    discount: {
        type: Number,
        required: false, // Sửa lỗi chính tả từ "require" thành "required"
        min: 0,
        max: 70,
        default: 0
    },
    description: {
        type: String,
        maxLength: 255,
        required: false, //
        trim: true
    },
    model_year: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        min: 0,
        default: 10
    },
    slug: {
        type: String,
        minLength: 3,
        maxLength: 255,
        required: true,
        unique: true,
        lowercase: true,
    },
    thumbnail: {
        type: String,
        required: false,
        trim: true
    },
    //Tham chiếu
    category: {
        type: mongoose.Schema.Types.ObjectId,
        //tham chiếu tới _id model Category
        ref: 'Category', 
        required: true,
    },
    brand_id: {
        type: mongoose.Schema.Types.ObjectId,
        //tham chiếu tới _id model Category
        ref: 'Brand',
        required: true,
    }

},{
    timestamps: true,
    versionKey: false
})

export default model("Product", productSchema);