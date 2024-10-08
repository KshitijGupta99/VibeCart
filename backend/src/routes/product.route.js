const express = require('express');
const router = express.Router();
const { ProductController } = require("../controllers")

const productController = new ProductController();


router.get('/getAllProducts', productController.getAllProducts)
router.get('/getProductById', productController.getProductById)
router.post('/addProduct', productController.addProduct)
router.get('/updateProduct', productController.updateProduct)
router.get('/searchProduct', productController.searchProduct)

module.exports = router