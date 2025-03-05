import { Schema, model} from "mongoose";

const customerSchema = new Schema ({
    first_name: { 
        type: String,
        maxLength: 50,
        required: true,
    },
    last_name: { 
        type: String,
        maxLength: 50,
        required: true,
    },
    phone: { 
        type: String,
        maxLength: 50,
        required: true,
        unique: true, // duy nhất
    },
    email: { 
        type: String,
        maxLength: 150,
        required: true,
        unique: true, // duy nhất
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
    zip_code: { 
        type: String,
        maxLength: 5,
        required: true,
    },
    password: { 
        type: String,
        maxLength: 255,
        required: true,
    },
    description:{
        type: String,
        maxLength: 255,
        required: false,
    }
},{
    timestamps: true, // tự động thêm createdAt và updatedAt khi thêm mới và cập nhật record
    versionKey: false, // tắt versionKey để hủy bỏ key đặc biệt, giúp tránh trùng lặp giữa các record
    collection: "customers" // tùy chỉnh tên collection để tiện quản lý
})
export default model('Customer', customerSchema);