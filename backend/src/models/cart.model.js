const mongoose = require('mongoose');

const { Schema } = mongoose;

const cartSchema = new Schema({
    userId: { type: Schema.Types.String, ref: 'user' },
    products: [{
        productId: { type: Schema.Types.Number, ref: 'products' },
        quantity: Number
    }],
    total: { type: Number, default: 0 },
})

const Cart = mongoose.model("Cart",cartSchema);
module.exports = Cart;