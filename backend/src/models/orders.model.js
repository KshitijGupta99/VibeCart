const mongoose = require('mongoose');

const { Schema } = mongoose;

const ordersSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'user' },
    products: [{
        productId: { type: Schema.Types.ObjectId, ref: 'products' },
        quantity: Number
    }],
    total: Number,
    status: String,
    date: { type: Date, default: Date.now }
})

const Order = mongoose.model('Orders', ordersSchema);
module.exports = Order;