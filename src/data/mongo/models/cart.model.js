import {Schema, model } from "mongoose";

const cartCollection = "carts";
const schema = new Schema(
  {
    user_id: { type: String, required: true },
    product_id: { type: String, required: true },
    quantity: { type: Number, required: true },
    state: {
      type: String,
      enum: ["reserved", "paid", "delivered"],
      default: "reserved",
    },
  },
  { timestamps: true }
);
const Cart = model(cartCollection, schema);
export default Cart;