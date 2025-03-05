import { Schema, model } from "mongoose";
const order_itemSchema = new Schema({
    order_item_name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    item_id: {
        type: Number,
        required: true,
        trim: true,
    },
    product_id: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
        min:0,
    },
    price: {
        type: Number,
        required: true,
        min:0,
    },
    discount: {
        type: Number,
        required: true,
        min:0,
        max:70,
    },
}, 
    { 
        timestamps: true, // Tự động sinh ra 2 trường createAt và updatedAt
        versionKey: false,
        collection: "order_items"  // tùy chỉnh tên collection để tiện quản lýlý
    })

export default model("Order_item", order_itemSchema);