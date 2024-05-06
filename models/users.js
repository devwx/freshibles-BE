import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      match: /^\S+@\S+\.\S+$/,
    },
    resetPasswordToken: { type: String },
    resetPasswordExpiry: { type: String },
    password: { type: String, required: true },
    mobileNumber: { type: Number, required: true },
    cartData: {
      items: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
          },
          quantity: { type: Number, default: 1 },
          name: { type: String, required: true },
          image: { type: String, required: true },
          category: { type: String, required: true },
          new_price: { type: Number, required: true },
        },
      ],
      totalPrice: { type: Number, default: 0 },
    },
    date: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
