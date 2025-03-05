import { Schema, model } from "mongoose";
const staffSchema = new Schema({
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
    active:{
        type: Boolean,
        required: true,
    },
    store_id:{
        type: Schema.Types.ObjectId,
        ref: "Store",
        required: true,
    },
    manage_id: {
        type: Schema.Types.ObjectId,
        ref: "Staff",
        required: true,
    },
    password: { 
        type: String,
        maxLength: 255,
        required: true,
    },

}, 
    { 
        timestamps: true, // Tự động sinh ra 2 trường createAt và updatedAt
        versionKey: false,
        collection: "staffs"  // tùy chỉnh tên collection để tiện quản lýlý
    })

export default model("Staff", staffSchema);