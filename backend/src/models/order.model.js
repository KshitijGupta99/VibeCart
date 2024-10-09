const mongoose = require('mongoose');

const { Schema } = mongoose;

const ordersSchema = new Schema({
    order_id: String,
    userId: { type: Schema.Types.String, ref: 'user' },
    products: [{
        productId: { type: Schema.Types.Number, ref: 'Product' },
        quantity: Number
    }],
    total: Number,
    status: String,
    date: { type: Date, default: Date.now }
})

const Order = mongoose.model('Order', ordersSchema);
module.exports = Order;