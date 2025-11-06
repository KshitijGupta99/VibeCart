const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartProductSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    },
    price: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

const cartSchema = new Schema(
  {
    userId: { type: String, required: true, index: true },
    products: {
      type: [cartProductSchema],
      default: [],
    },
    total: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);