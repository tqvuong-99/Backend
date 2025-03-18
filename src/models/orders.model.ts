import { Schema, model } from "mongoose";
const orderSchema = new Schema({
    order_item_id: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    customer_id: {
        type: Schema.Types.ObjectId,
        ref: "Customer",
        required: true,
    },
    order_status: {
        type: String,
        required: true,
        trim: true,
    },
    order_date: {
        type: String,
        maxLength: 50,
        required: true,
    },
    require_date: {
        type: Date,
        required: false,
    },
    shipping_date: {
        type: Date,
        required: true,
    },
    staff_id: {
        type: Schema.Types.ObjectId,
        MaxLength: 20,
        ref: "Staff",
        required: true,
    },
    order_note: {
        type: String,
        required: false,
    },
    street: { 
        type: String,
        maxLength: 255,
        required: true,
    },
    city: { 
        type: String,
        maxLength: 50,
        required: true,
    },
    state: { 
        type: String,
        maxLength: 50,
        required: true,
    },
    payment_type: {
        type: String,
        required: true,
        trim: true,
    },
}, 
    { 
        timestamps: true, // Tự động sinh ra 2 trường createAt và updatedAt
        versionKey: false,
        collection: "orders"  // tùy chỉnh tên collection để tiện quản lýlý
    })

export default model("Order", orderSchema);