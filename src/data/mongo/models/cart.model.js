import { Schema, model, Types } from "mongoose";

const cartCollection = "carts";
const cartsSchema = new Schema(
  {
    user_id: { type: Types.ObjectId, required: true, ref: "users", index: true },
    product_id: { type: Types.ObjectId, required: true, ref: "products" },
    quantity: { type: Number, required: true },
    state: {
      type: String,
      enum: ["reserved", "paid", "delivered"],
      default: "reserved",
    },
  },
  { timestamps: true }
);

cartsSchema.pre(['find', 'findOne'], function() {
  this.populate("user_id", "-_id");
});

cartsSchema.pre(['find', 'findOne'], function() {
  this.populate("product_id", "-_id");
});

cartsSchema.pre(['find', 'findOne'], function() {
  this.lean();
});

const Cart = model(cartCollection, cartsSchema);

export default Cart;