const express = require('express');
const router = express.Router();

require('dotenv').config();
var fetchData = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');
const Product = require('../models/productSchema')


router.get("/getitems",fetchData, async(req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors)
        return res.status(400).json({ error: errors.array() });
    }
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
})

module.exports = router