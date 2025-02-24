import { Schema, model } from "mongoose";
const staffSchema = new Schema({
    staff_name: {
        type: String,
        required: true, // NOT NULL
        unique: true, // duy nhấtất
        minLength: [4, "Tên thương hiệu phải từ 4 đến 50 kí tự"], // độ dài tối thiểuthiểu
        maxLength: 50, // độ dài tối đađa
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
        collection: "staffs"  // tùy chỉnh tên collection để tiện quản lýlý
    })

export default model("Staff", staffSchema);