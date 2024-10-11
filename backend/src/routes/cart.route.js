const express = require('express');
const router = express.Router();

const {CartController} = require('../controllers')

const cartController = new CartController();


router.post('/addProductToCart', cartController.addToCart)

router.post('/removeProductFromCart', cartController.removeFromCart)

router.post('/updateProductQuantity', cartController.updateCartItemQuantity)

router.get('/getcartdetails', cartController.getCartItems)


module.exports = router