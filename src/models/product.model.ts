import { Schema, model } from "mongoose";
const productSchema = new Schema({
    product_name: {
        type: String,
        required: true, // NOT NULL
        unique: true, // duy nhất
        maxLength: 255, // độ dài tối đa
    },
    price: {
        type: Number,
        min:0,
        required: false,
        trim: true, 
        default: 0, 
    },
    discount: {
        type: Number,
        min:0,
        max:70,
        required: false,
        default: 0, 
    },
    description: {
        type: String,
        minLength: 3,
        maxLength: 255,
        required: false,
        trim: true, // xóa khoảng trắng ở đầu và cuối
        default: "" // giá trị mặc định khi tạo mới
    },
    model_year:{
        type: Number,
        required: true,
    },
    thumbnail: {
        type: String,
        required: false,
        trim: true,
    },
    stock: {
        type: Number,
        min:0,
        default: 10,
    },
    slug: {
        type: String,
        maxLength: 255,
        required: true, // NOT NULL
        unique: true, // duy nhất
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "Category", // Tham chiếu tới _id model Category 
    },
    brand_id: {
        type: Schema.Types.ObjectId,
        ref: "Brand", // Tham chiếu tới _id model Brand 
    },
}, 
    { 
        timestamps: true, // Tự động sinh ra 2 trường createAt và updatedAtupdatedAt
        versionKey: false, // tắt versionKey để hủy bỏ key đặc biệt, giúp tránh trùng lặp giữa các record
        collection: "products"  // tùy chỉnh tên collection để tiện quản lý
    })

export default model("Product", productSchema);