const express = require('express');
const router = express.Router();
const Order = require('../models/orderSchema')
const Cart = require('../models/cartSchema')

require('dotenv').config();
var fetchData = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');


const url = process.env.ITEM_URL;
const fetch = require('node-fetch');// Assuming your Product schema is in models folder

// const storeFakeProduct = async (productId) => {
//   try {
//     const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
//     const productData = await response.json();

//     // Check if product already exists in DB
//     let product = await Product.findOne({ productId: productData.id });
//     if (!product) {
//         product = product.product;
//       // Save new product to MongoDB
//       product = new Product({
//         productId: productData.id,
//         title: productData.title,
//         price: productData.price,
//         description: productData.description,
//         image: productData.image,
//         category: productData.category,
//         rating: productData.rating
//       });
//       await product.save();
//     }
//     return product;
//   } catch (error) {
//     console.error("Error storing product:", error);
//   }
// };
//storeFakeProduct(1);


router.post("/addcart", fetchData, async (req, res) => {
    const { productId } = req.body;

    try {
        let item = await Cart.findOne({ id: productId, user: req.user.id });
        
        if (item) {
            // If the item exists, increment its quantity
            item.quantity = item.quantity + 1;
            await item.save();
            console.log("Item quantity incremented");
            res.json(item); // Send back the updated item
        } else {
            // If the item does not exist, create a new cart item
            const newItem = new Cart({
                id: productId,
                user: req.user.id,
                quantity: 1 // Initialize quantity to 1
            });
            const savedItem = await newItem.save();
            res.json(savedItem); // Send back the saved item
        }
        
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});


router.delete("/removeitem/:id", fetchData, async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ error: errors.array() });
    }
    try {
        console.log(req.params.id);
        let cartItem = await Cart.findById(req.params.id);

        if (!cartItem) { return res.status(403).send("NotFound") };           //checking note exsistance

        if (cartItem.user.toString() !== req.user.id) {                         //checking user exsistance
            return res.status(403).send("Forbidden");
        }
        const id = cartItem.id
        //updating the note
        cartItem = await Cart.findByIdAndDelete(req.params.id);
        res.json({ message: "Note deleted successfully" , id : id});
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
})

router.get("/getitems",fetchData, async(req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors)
        return res.status(400).json({ error: errors.array() });
    }
    try {
        const cartItem = await Cart.find({ user: req.user.id });
        if (cartItem.length == 0){ return res.send([])};
        res.json(cartItem);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
})

module.exports = router