import { Schema, model } from "mongoose";
const order_itemSchema = new Schema({
    order_item_name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    description: {
        type: String,
        maxLength: 500,
        trim: true, // xóa khoảng trắng ở đầu và cuối 
        default: "" // giá trị mặc định khi tạo mới
    },
}, 
    { 
        timestamps: true, // Tự động sinh ra 2 trường createAt và updatedAt
        versionKey: false,
        collection: "order_items"  // tùy chỉnh tên collection để tiện quản lýlý
    })

export default model("Order_item", order_itemSchema);