import { Schema, model } from "mongoose";
// import bcrypt from "bcrypt";
// const saltRounds = 10;

const staffSchema = new Schema(
  {
    first_name: {
      type: String,
      maxLength: 50,
      minLength: 2,
      required: true,
    },
    last_name: {
      type: String,
      maxLength: 50,
      minLength: 2,
      required: true,
    },
    // phone: {
    //   type: String,
    //   maxLength: 50,
    //   required: true,
    //   unique: true, // duy nhất
    // },
    email: {
      type: String,
      maxLength: 150,
      required: true,
      unique: true,
      validate: {
        validator: function (v: string) {
          return /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          );
        },
        message: (props: { value: string }) =>
          `${props.value} is not a valid email!`,
      },
    },
    active: {
      type: Boolean,
      default: true,
      required: true,
      enum: ["true", "false"],
    },
    // store_id: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Store",
    //   required: true,
    // },
    // manage_id: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Staff",
    //   required: true,
    // },
    password: {
      type: String,
      maxLength: 255,
      required: true,
    },
  },
  {
    timestamps: true, // Tự động sinh ra 2 trường createAt và updatedAt
  }
);
//Middleware pre save ở lớp database
//trước khi data được lưu xuống --> mã hóa mật khẩu
// staffSchema.pre('save', async function (next) {
//   const staff = this;

//   const hash = bcrypt.hashSync(staff.password, saltRounds);

//   staff.password = hash;

//   next();
// });
export default model("Staff", staffSchema);
