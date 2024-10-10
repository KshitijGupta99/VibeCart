const express = require('express');
const router = express.Router();

const {CartController} = require('../controllers')

const cartController = new CartController();


router.post('/addProductToCart/:userId/add', cartController.addToCart)

router.post('/removeProductFromCart', cartController.removeFromCart)

router.post('/updateProductQuantity', cartController.updateCartItemQuantity)

router.get('/getcartdetails/:id', cartController.getCartItems)


module.exports = router