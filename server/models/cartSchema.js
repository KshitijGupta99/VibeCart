const mongoose = require('mongoose')
const { Schema } = mongoose;

const CartSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    quantity: { type: Number },


    prod_id: { type: Number },
    date: { type: Date, default: Date.now },


})
const Cart = mongoose.model('carts', CartSchema);
module.exports = Cart;