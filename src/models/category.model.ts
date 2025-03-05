import { Schema, model } from "mongoose";

/**
 * Định nghĩa cấu trúc collection Category
 */
const categorySchema = new Schema({
    category_name: {
        type: String,
        maxLength: 50,
        required: true, // NOT NULL
        unique: true, // duy nhất
    },
    description: {
        type: String,
        maxLength: 500,
        trim: true, // xóa khoảng trắng ở đầu và cuối 
        default: "" // giá trị mặc định khi tạo mới
    },
    
    
},{
    timestamps: true, // thêm thoi gian tạo và cập nhật document
    versionKey: false, // ẩn cột _v của Mongoose
    collection: "categories"
})

export default model('Category', categorySchema);