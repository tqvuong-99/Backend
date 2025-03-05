import { Schema, model } from "mongoose";
const brandSchema = new Schema({
    brand_name: {
        type: String,
        required: true, // NOT NULL
        unique: true, // duy nhấtất
        maxLength: 100, // độ dài tối đađa
    },
    description: {
        type: String,
        maxLength: 500,
        required: false,
        unique: false,
    },
}, 
    { 
        timestamps: true, // Tự động sinh ra 2 trường createAt và updatedAt
        versionKey: false,
        collection: "brands"  // tùy chỉnh tên collection để tiện quản lýlý
    })

export default model("Brand", brandSchema);