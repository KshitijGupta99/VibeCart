const mongoose = require('mongoose');

const { Schema } = mongoose;

const productSchema = new Schema({
    product_id: {type: Number},
    titel :String,
    description: String,
    price: Number,
    image: String,
    category: String,
    rating: {
        count: Number,
        rate: Number
    }
})

const Products = mongoose.model("Product",productSchema);
module.exports = Products;