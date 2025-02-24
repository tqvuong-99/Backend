import { Schema, model} from "mongoose";

const customerSchema = new Schema ({
    customer_name: { 
        type: String,
        maxLength: 50,
        required: true,
        unique: true,
    },
    description:{
        type: String,
        maxLength: 255,
        required: false,
    }

},{
    timestamps: true, // tự động thêm createdAt và updatedAt khi thêm mới và cập nhật record
    versionKey: false, // tắt versionKey để hủy bỏ key đặc biệt, giúp tránh trùng lặp giữa các record
})
export default model('Customer', customerSchema);