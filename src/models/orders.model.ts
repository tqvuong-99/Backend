import { Schema, model } from "mongoose";
const orderSchema = new Schema({
    order_item_id: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
}, 
    { 
        timestamps: true, // Tự động sinh ra 2 trường createAt và updatedAt
        versionKey: false,
        collection: "orders"  // tùy chỉnh tên collection để tiện quản lýlý
    })

export default model("Order", orderSchema);