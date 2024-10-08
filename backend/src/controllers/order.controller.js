const {OrderService} = require('../services')
const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types; 

class OrderController{
    constructor() {
        this.orderServices = new OrderService()
    }
    
    // Get all orders  will not be used but for debugging purpose for now
    getAllOrders = async (req, res) => {
        try {
            const orders = await this.orderServices.getAllOrders()
            res.status(200).json(orders)
        } catch (error) {
            console.error(error)
            res.status(500).send('Server Error')
        }
    }
    
    // Get order by ID
    getOrderById = async (req, res) => {
        try {
            const order = await this.orderServices.getOrderById(req.params.id)
            if (!order) return res.status(404).send('Order not found')
            res.status(200).json(order)
        } catch (error) {
            console.error(error)
            res.status(500).send('Server Error')
        }
    }
    
    // Create a new order
    addOrder = async (req, res) => {
        try {

            const products = req.body.products.map(item => ({
                productId: item.productId, // Use directly as a number
                quantity: item.quantity
            }));
            
    
            const orderData = {
                order_id: req.body.order_id,
                userId: req.body.userId, // Use directly as it is
                // Use 'new' to instantiate ObjectId
                products: products,
                total: req.body.total,
                status: req.body.status
            };

            const order = await this.orderServices.addOrder(orderData)
            res.status(201).json(order)
        } catch (error) {
            console.error(error)
            res.status(500).send('Server Error')
        }
    }
    
    // Update an order
    updateOrder = async (req, res) => {
        try {
            const order = await this.orderServices.updateOrder(req.params.id, req.body)
            if (!order) return res.status(404).send('Order not found')
            res.status(200).json(order)
        } catch (error) {
            console.error(error)
            res.status(500).send('Server Error')
        }
    }
    
    // Delete an order
    deleteOrder = async (req, res) => {
        try {
            const order = await this.orderServices.deleteOrder(req.body.id)
            if (!order) return res.status(404).send('Order not found')
            res.status(200).json(order)
        } catch (error) {
            console.error(error)
            res.status(500).send('Server Error')
        }
    }

    // Get orders by user ID
    getOrdersByUserId = async (req, res) => {
        try {
            const orders = await this.orderServices.getOrdersByUserId(req.params.id)
            res.status(200).json(orders)
        } catch (error) {
            console.error(error)
            res.status(500).send('Server Error')
        }
    }

    // Get total orders by user ID
    getTotalOrdersByUserId = async (req, res) => {
        try {
            const totalOrders = await this.orderServices.getTotalOrdersByUserId(req.params.id)
            res.status(200).json(totalOrders)
        } catch (error) {
            console.error(error)
            res.status(500).send('Server Error')
        }
    }

    // Get total orders by product ID
    getTotalOrdersByProductId = async (req, res) => {
        try {
            const totalOrders = await this.orderServices.getTotalOrdersByProductId(req.params.id)
            res.status(200).json(totalOrders)
        } catch (error) {
            console.error(error)
            res.status(500).send('Server Error')
        }
    }

    // Get total orders by status
    getTotalOrdersByStatus = async (req, res) => {
        try {
            const totalOrders = await this.orderServices.getTotalOrdersByStatus(req.params.status)
            res.status(200).json(totalOrders)
        } catch (error) {
            console.error(error)
            res.status(500).send('Server Error')
        }
    }


}
module.exports = OrderController;