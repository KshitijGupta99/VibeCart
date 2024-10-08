const express = require('express');
const router = express.Router();
const { OrderController } = require("../controllers")

const orderController = new OrderController();


router.post('/addOrder', orderController.addOrder)
router.post('/updateOrder', orderController.updateOrder)
router.get('/getAllOrders', orderController.getAllOrders)
router.get('/getOrderById', orderController.getOrderById)
router.get('/getTotalOrdersByStatus', orderController.getTotalOrdersByStatus)
router.get('/getOrdersByUserId', orderController.getOrdersByUserId)
router.post('/deleteOrder', orderController.deleteOrder)

module.exports = router