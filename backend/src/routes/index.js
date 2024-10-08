const express = require('express');

// router
const router = express.Router();

// routes
const userRoutes = require('./user.routes');
const productRoutes = require('./product.route');
const orderRoutes = require('./order.route')
const cartRoutes = require('./cart.route');

router.use('/user', userRoutes);
router.use('/product', productRoutes);
router.use('/order', orderRoutes);
//router.use('/cart', cartRoutes);

module.exports = router;