const mongoose = require('mongoose')
const { Schema } = mongoose;


const OderSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    orderId: {type : Number},
    prod_id : {type : Number},
    quantity: { type: Number },
    total: { type: Number },
    status: { type: String, default: 'pending' },
    deliveryStatus: { type: String, default: 'pending' },
    paymentStatus: { type: String, default: 'pending' },
    date: { type: Date, default: Date.now },
    

})
const Orders = mongoose.model('orders', OderSchema);
module.exports = Orders;