const mongoose = require("mongoose");

const { Schema } = mongoose;

const cartSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "user" },
  products: [
    {
      productId: { type: Schema.Types.ObjectId, ref: "products" },
      quantity: Number,
    },
  ],
  total: { type: Number, default: 0 },
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
